import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';

import { AccountCircle, Contacts, Redo, Save } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { isEqual, mapValues, pickBy } from 'lodash';
import { matchIsValidTel } from 'mui-tel-input';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

import { MoButton } from '@/components/MoButton';
import { MotionParent } from '@/components/MotionItems';
import {
  MeDocument,
  useUpdateProfileMutation,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import CompanyInfo from '@/scenes/Company/CompanyProfile/Components/CompanyInfo';
import ContactInfo from '@/scenes/Company/CompanyProfile/Components/ContactInfo';

import s from './companyprofile.module.scss';
import {
  initialValues,
  type NestedOnSubmit,
  type SettingFormValuesType,
} from './data';

const formSteps = [
  {
    name: 'Company Info',
    component: (props: any) => <CompanyInfo {...props} />,
    schema: '',
    Icon: Contacts,
  },

  {
    name: 'Profile',
    component: (props: any) => <ContactInfo {...props} />,
    schema: '',
    Icon: AccountCircle,
  },
];

interface CompanyProfileSettingContextType {
  formik: ReturnType<typeof useFormik<SettingFormValuesType>>;
}

// create a context for the formik form
const ProfileSettingContext = createContext<CompanyProfileSettingContextType>(
  {} as any,
);
export const useCompanyProfileSettingFormContext = () =>
  React.useContext(ProfileSettingContext);

const CompanyProfile = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isChanged, setIsChanged] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [settingTogo, setSettingTogo] = useState<number | null>(null);
  const me = useMe();
  const [currentStep, setCurrentStep] = useState<typeof formSteps[number]>({
    ...formSteps[activeStep],
  });

  const [updateProfile, payload] = useUpdateProfileMutation();

  const stepUtil = useRef<{
    onSubmit: NestedOnSubmit;
  }>({
    async onSubmit() {
      return formik.values;
    },
  });

  const nullify = <T extends Record<string, any>>(obj: T) => {
    return mapValues(obj, (value) => {
      if (value === '') return null;
      return value;
    });
  };
  const getChangedFields = (
    from: Record<string, any>,
    target: Record<string, any>,
  ) => {
    return pickBy(from, (value, key) => {
      const equal = isEqual(target[key], value);
      return !equal;
    });
  };

  const formik = useFormik<SettingFormValuesType>({
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: true,
    enableReinitialize: true,
    initialValues,
    validationSchema: currentStep?.schema,
    validate: (values) => {
      const error = {} as any;
      if (values.account.phone && !matchIsValidTel(values.account.phone)) {
        error.account = {
          ...error.account,
          phone: 'invalid phone number',
        };
      }
      return error;
    },
    onSubmit: async (values, helpers) => {
      const nestedSubmits = await stepUtil.current.onSubmit(values, helpers);
      if (nestedSubmits === null) {
        return;
      }

      values = nestedSubmits;

      // filter out only the changed values
      const changedValues: Record<keyof typeof values.account, string> =
        getChangedFields(values.account, formik.initialValues.account) as any;
      const accountInput = nullify(changedValues);

      const changedApplicantValues: Record<
        keyof typeof values.company,
        string
      > = getChangedFields(values.company, formik.initialValues.company) as any;
      const applicantInput = nullify(changedApplicantValues);

      console.log('accountInput : ', accountInput, 'applicant', applicantInput);

      try {
        const profilePayload = await updateProfile({
          variables: {
            input: {
              accountId: me?.me?.id ?? '',
            } as any,
          },
          refetchQueries: [MeDocument],
        });

        if (profilePayload.errors && profilePayload.errors?.length > 0) {
          toast.error(profilePayload.errors.map((e) => e.message).join(', '));
        }

        if (
          profilePayload.data?.profileUpdate.errors &&
          profilePayload.data?.profileUpdate.errors.length > 0
        ) {
          toast.error(
            profilePayload.data?.profileUpdate.errors
              .map((e) => e.message)
              .join(', '),
          );
        }

        if (profilePayload.data?.profileUpdate.account?.id) {
          toast.success('Profile Updated!');
        }

        console.log('profile payload : ', profilePayload);
      } catch (err) {
        console.log('error ---->  : ', err);
        toast.error('Error updating profile');
      }
    },
  });

  const checkForChange = () => {
    return !isEqual(formik.initialValues, formik.values);
  };
  const handleSettingChange = (idx: number) => {
    if (isChanged) {
      // show modal to confirm
      setOpen(true);
      setSettingTogo(idx);
    } else {
      setActiveStep(idx);
    }

    // setValue(item.value);
    // setActiveStep(idx);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const reset = () => {
    if (!me.me?.company) return;
    const company = me.me.company;

    console.log('me : ', me);

    const initial: SettingFormValuesType = {
      account: {
        image: me.me.image ?? '',
        phone: me.me.phone ?? '',
        firstName: me.me.firstName ?? '',
        lastName: me.me.lastName ?? '',
        email: me.me.email ?? '',
      },
      company: {
        about: '',

        // location: company.location ?? '',
        // skills: company.skills ?? [],
        // github: company.github ?? '',
        // linkedin: company.linkedin ?? '',
        // portfolio: company.portfolio ?? '',
        companyName: company?.companyName ?? '',
      } as any,
    };

    console.log('initial : ', initial);

    formik.resetForm({
      values: {
        ...formik.values,
        ...initial,
        company: {
          ...formik.values.company,
          ...initial.company,
        },
      },
    });
  };

  useEffect(() => {
    if (me.loading || me.error) return;
    reset();
  }, [me.me?.applicant]);

  useEffect(() => {
    setCurrentStep({ ...formSteps[activeStep] });
  }, [activeStep]);

  useEffect(() => {
    startTransition(() => {
      setIsChanged(checkForChange());
    });
  }, [formik.values]);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Typography variant="h3" align="center">
          Profile Settings
        </Typography>

        <div className={s.flex}>
          <div className={s.nav}>
            <Stack gap="2rem">
              <div className={s.pp}>
                <Image src={me.me?.image ?? ''} alt="profile pic" fill />
              </div>
              <div>
                {isPending && (
                  <CircularProgress sx={{ position: 'absolute' }} />
                )}
                <Typography variant="h6">
                  {`${me.me?.company?.companyName ?? 'no-company name'}`}
                </Typography>
              </div>
            </Stack>
            <motion.div layoutId="tab_nav" className={s.tab_list}>
              {formSteps.map((item, idx) => (
                <Button
                  // variant="outlined"
                  startIcon={<item.Icon />}
                  color="secondary"
                  key={idx}
                  // disabled={item.disabled}
                  className={clsx([
                    s.tab,
                    currentStep.name === item.name && s.active,
                  ])}
                  onClick={() => {
                    handleSettingChange(idx);
                  }}
                >
                  {item.name}

                  {currentStep.name === item.name && (
                    <motion.div
                      layoutId="active"
                      className={s.active_indicator}
                    />
                  )}
                </Button>
              ))}
            </motion.div>
          </div>

          <motion.div className={s.content}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
              <ProfileSettingContext.Provider value={{ formik }}>
                <div className={s.form_content}>
                  <AnimatePresence mode="wait">
                    <MotionParent className={s.animator} key={currentStep.name}>
                      {currentStep?.component({ stepUtil })}
                    </MotionParent>
                  </AnimatePresence>
                </div>

                <motion.div className={s.controll}>
                  <MoButton
                    // onClick={handleBack}
                    startIcon={<Redo />}
                    disabled={formik.isSubmitting || !isChanged}
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setOpen(true);
                      formik.resetForm();
                      setSettingTogo(activeStep);
                    }}
                  >
                    Undo Changes
                  </MoButton>

                  <MoButton
                    // onClick={handleNext}
                    loading={formik.isSubmitting}
                    disabled={!isChanged}
                    type="submit"
                    endIcon={<Save />}
                  >
                    Update Setting
                  </MoButton>
                </motion.div>
              </ProfileSettingContext.Provider>
            </form>
          </motion.div>
          <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>
              <Typography variant="h6">Confirm</Typography>
            </DialogTitle>
            <DialogContent>
              <Box
                component="form"
                sx={{ display: 'flex', flexWrap: 'wrap', width: '25rem' }}
              >
                <Typography>
                  Changes you made may not be saved. Do you want to continue?
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                variant="contained"
                onClick={() => {
                  // add it to formik
                  if (settingTogo === null) return;
                  setActiveStep(settingTogo);
                  handleClose();
                  reset();
                }}
              >
                Continue
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
