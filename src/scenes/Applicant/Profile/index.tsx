/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useRef, useState, useTransition } from 'react';

import {
  AccountCircle,
  Contacts,
  PendingActions,
  Redo,
  Save,
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
import CvExperience from '@/scenes/Applicant/Profile/components/CvExperience';
import ProfileInfo from '@/scenes/Applicant/Profile/components/ProfileInfo';
import ContactInfo from 'src/scenes/Applicant/Profile/components/ContactInfo';

import {
  initialValues,
  type NestedOnSubmit,
  type SettingFormValuesType,
} from './data';
import s from './profile.module.scss';

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
  } /* {
    name: 'Account Setting',
    component: (props: any) => <CvExperience {...props} />,
    Icon: Settings,
    disabled: true,
  }  */,
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
  const { me, loading: meLoading } = useMe();
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
    const value = mapValues(obj, (value) => {
      if (value === '') return null;
      return value;
    });
    return value;
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

      if (values.applicant.introVideo) {
        // check the introVideo is a youtube link
        const youtubeRegex =
          /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/g;
        if (!youtubeRegex.test(values.applicant.introVideo))
          error.applicant = {
            ...error.applicant,
            introVideo: 'invalid intro video link, please check again',
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
        keyof typeof values.applicant,
        string
      > = getChangedFields(
        values.applicant,
        formik.initialValues.applicant,
      ) as any;
      const applicantInput = nullify(changedApplicantValues);

      console.log('accountInput : ', accountInput, 'applicant', applicantInput);

      try {
        const profilePayload = await updateProfile({
          variables: {
            input: {
              accountId: me?.id ?? '',
              account: {
                ...accountInput,
              },
              applicant: {
                ...(applicantInput as any),
              },
            },
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
    if (me?.applicant === null || me?.applicant === undefined) return;
    const applicant = me.applicant;

    console.log('me : ', me);

    const initial: SettingFormValuesType = {
      account: {
        image: me.image ?? '',
        phone: me.phone ?? '',
        firstName: me.firstName ?? '',
        lastName: me.lastName ?? '',
        email: me.email ?? '',
      },
      applicant: {
        about: applicant.about ?? '',
        accomplishment: applicant.accomplishment ?? '',
        englishLevel: applicant.englishLevel ?? '',
        skillLevel: applicant.skillLevel ?? '',
        experienceYear: applicant.experienceYear ?? 0,
        jobPosition: applicant.jobPosition ?? '',
        location: applicant.location ?? '',
        salaryExpectation: applicant.salaryExpectation ?? ('' as any),
        skills: applicant.skills ?? [],
        resume: applicant.resume ?? '',
        introVideo: applicant.introVideo ?? '',
        github: applicant.github ?? '',
        linkedin: applicant.linkedin ?? '',
        portfolio: applicant.portfolio ?? '',

        /*
        // filter out the __typename from the workExperience
        workExperience: applicant.workExperience.map((item) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { __typename, ...rest } = item;

          return rest;
        }),
        */
        workExperience: applicant.workExperience,
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
    if (me?.applicant === null || me?.applicant === undefined || meLoading) {
      return;
    }
    reset();
  }, [me?.applicant]);

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
                <Image src={me?.image ?? ''} alt="profile pic" fill />
              </div>
              <div>
                {isPending && (
                  <CircularProgress sx={{ position: 'absolute' }} />
                )}
                <Typography variant="h6">
                  {`${me?.firstName ?? '-'}  ${me?.lastName ?? '-'}`}
                </Typography>
                <Typography variant="body2" textAlign="center" color="gray">
                  {me?.applicant?.jobPosition ?? '-'}
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

export default Profile;
