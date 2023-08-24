/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useRef, useState, useTransition } from 'react';

import {
  AccountCircle,
  Contacts,
  PendingActions,
  Redo,
  Save,
  Settings,
} from '@mui/icons-material';
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
import { isEqual, pickBy } from 'lodash';
import { matchIsValidTel } from 'mui-tel-input';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import { MoButton } from '@/components/MoButton';
import { MotionParent } from '@/components/MotionItems';
import {
  MeDocument,
  useUpdateProfileMutation,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import CvExperience from '@/scenes/Applicant/Profile/components/CvExperience';
import ProfileInfo from '@/scenes/Applicant/Profile/components/ProfileInfo';
import ContactInfo from 'src/scenes/Applicant/Profile/components/ContactInfo';

import {
  initialValues,
  type NestedOnSubmit,
  type SettingFormValuesType,
} from './data';
import s from './profile.module.scss';

// s

const formSteps = [
  {
    name: 'Profile',
    component: (props: any) => <ProfileInfo {...props} />,
    schema: '',
    Icon: AccountCircle,
  },
  {
    name: 'Contact Info',
    component: (props: any) => <ContactInfo {...props} />,
    schema: '',
    Icon: Contacts,
  },
  {
    name: 'CV & Experience',
    component: (props: any) => <CvExperience {...props} />,
    schema: '',
    Icon: PendingActions,
  },
  {
    name: 'Account Setting',
    component: (props: any) => <CvExperience {...props} />,
    Icon: Settings,
    disabled: true,
  } /* {
    name: 'Done',
    component: (props: any) => <h1>congradulation </h1>,
  }, */,
];

interface ProfileSettingContextType {
  formik: ReturnType<typeof useFormik<SettingFormValuesType>>;
}

// create a context for the formik form
const ProfileSettingContext = React.createContext<ProfileSettingContextType>(
  {} as any,
);
export const useProfileSettingFormContext = () =>
  React.useContext(ProfileSettingContext);

const Profile = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isChanged, setIsChanged] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [settingTogo, setSettingTogo] = useState<number | null>(null);
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState<typeof formSteps[number]>({
    ...formSteps[activeStep],
  });

  const [updateProfile, payload] = useUpdateProfileMutation();
  const me = useMe();

  const stepUtil = useRef<{
    onSubmit: NestedOnSubmit;
  }>({
    async onSubmit() {
      return formik.values;
    },
  });

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

      const accountInput = pickBy(values.account, (value, key) => {
        return (
          Boolean(value) &&
          (formik.initialValues.account as Record<string, any>)[key] !== value
        );
      });

      const applicant = pickBy(values.applicant, (value, key) => {
        return (
          Boolean(value) &&
          (formik.initialValues.applicant as Record<string, any>)[key] !== value
        );
      });

      console.log('accountInput : ', accountInput, 'app', applicant);

      try {
        const profilePayload = await updateProfile({
          variables: {
            input: {
              accountId: session?.user?.id ?? '',
              account: {
                ...accountInput,
              },
              applicant: {
                ...applicant,
              },
            },
          },
          refetchQueries: [MeDocument],
        });

        if (profilePayload.errors && profilePayload.errors?.length > 0) {
          toast.error(profilePayload.errors.map((e) => e.message).join(', '));
        }

        if (
          profilePayload.data?.updateProfile.errors &&
          profilePayload.data?.updateProfile.errors.length > 0
        ) {
          toast.error(
            profilePayload.data?.updateProfile.errors
              .map((e) => e.message)
              .join(', '),
          );
        }

        if (profilePayload.data?.updateProfile.account?.id) {
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
    if (me.me?.applicant === null || me.me?.applicant === undefined) return;
    const applicant = me.me.applicant;

    console.log('me : ', me);

    const initial: SettingFormValuesType = {
      account: {
        image: me.me.image ?? '',
        phone: me.me.phone ?? '',
        firstName: me.me.firstName ?? '',
        lastName: me.me.lastName ?? '',
        email: me.me.email ?? '',
      },
      applicant: {
        about: applicant.about ?? '',
        accomplishment: applicant.accomplishment ?? '',
        englishLevel: applicant.englishLevel ?? ('' as any),
        skillLevel: applicant.skillLevel ?? ('' as any),
        experienceYear: applicant.experienceYear ?? 0,
        jobPosition: applicant.jobPosition ?? '',
        location: applicant.location ?? '',
        salaryExpectation: applicant.salaryExpectation ?? ('' as any),
        skills: applicant.skills ?? [],
        resume: applicant.resume ?? '',
        github: applicant.github ?? '',
        linkedin: applicant.linkedin ?? '',
        portfolio: applicant.portfolio ?? '',
      },
    };

    console.log('initial : ', initial);

    formik.resetForm({
      values: {
        ...formik.values,
        ...initial,
      },
    });
  };

  useEffect(() => {
    if (
      me.me?.applicant === null ||
      me.me?.applicant === undefined ||
      me.loading ||
      me.error
    )
      return;
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
                  {`${me.me?.firstName ?? '-'}  ${me.me?.lastName ?? '-'}`}
                </Typography>
                <Typography variant="body2" textAlign="center" color="gray">
                  {me.me?.applicant?.jobPosition ?? '-'}
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
                  disabled={item.disabled}
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
                  >
                    Undo Changes
                  </MoButton>

                  <MoButton
                    // onClick={handleNext}
                    loading={formik.isSubmitting}
                    disabled={!isChanged}
                    type="submit"
                    endIcon={<Save />}
                    onClick={async () => {
                      /* await formik.validateForm();
                      if (
                        formik.errors &&
                        Object.keys(formik.errors).length > 0
                      ) {
                        console.log('formik errror : ', formik.errors);
                        toast.error('Please fill all required fields');
                        return;
                      }

                      formik.setSubmitting(true);
                      const nestedFormSubmitResult =
                        await stepUtil.current.onSubmit();

                      console.log(
                        'nestedFormSubmitResult : ',
                        nestedFormSubmitResult,
                      );

                      if (!nestedFormSubmitResult) {
                        formik.setSubmitting(false);
                        return;
                      }
                      await formik.submitForm(); */
                    }}
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

export default Profile;
