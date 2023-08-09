/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react';
import { Form, Formik, type FormikProps } from 'formik';
import { MoButton } from '@/components/MoButton';
import { GitHub, Login } from '@mui/icons-material';
import { Alert, Button, Stack, Typography } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import SignInDetails from '@/scenes/Auth/SignIn/component/SignInDetails';
import s from './signin.module.scss';
import GoogleIcon from '@/components/Icons/Google';
import Link from 'next/link';
import { AuthTypeKeys } from '@/constants';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import useSocialAuth from '@/scenes/Auth/useSocialAuth';

const initialValues = {
  email: '',
  password: '',
};

type FormStepName = 'Sign In' | 'Auth Details';

interface FormStepType {
  name: FormStepName;
  Step: (props: { onReturn: () => void }) => any;
  schema?: any;
}

export type AuthSignInFormValuesType = typeof initialValues;

const formSteps: FormStepType[] = [
  {
    name: 'Sign In',
    Step: (props: any) => <SignInDetails {...props} />,
  },
];

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { withSocial } = useSocialAuth();

  if (session) {
    void router.push('/');
  }

  const [btnAttribute, setBtnAttribute] = useState({
    disabled: true,
    loading: false,
    text: 'Create Account',
  });

  const [activeStep, setActiveStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [currentStep, setCurrentStep] = useState<typeof formSteps[number]>({
    ...formSteps[activeStep],
  });

  useEffect(() => {
    if (session) {
      void router.push('/');
    }

    window.onmessage = (event) => {
      console.log('onmessage event : --- ', event.data);
      if (event.data.type === 'auth') {
        if (event.data.status === 'success') {
          // window.close();
          toast.success('Login success');
        } else if (event.data.status === 'error') {
          setErrorMsg(event.data.message);
        }
      }
    };

    return () => {
      window.onmessage = null;
    };
  }, []);

  const handleNext = () => {
    setActiveStep((activeStep) => Math.min(formSteps.length, activeStep + 1));
  };

  const handleBack = () => {
    setActiveStep((activeStep) => Math.max(0, activeStep - 1));
  };

  const getBtnTxt = (props: FormikProps<AuthSignInFormValuesType>) => {
    return {
      disabled: false,
      label: 'Login',
    };
  };

  useEffect(() => {
    console.log('session : --- ', session);
  }, [session]);

  useEffect(() => {
    setCurrentStep({ ...formSteps[activeStep] });
  }, [activeStep]);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Formik
          validateOnMount={false}
          validateOnChange={false}
          validateOnBlur={true}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={currentStep?.schema}
          onSubmit={async (
            values: AuthSignInFormValuesType,
            { setSubmitting, setFieldError },
          ) => {
            setErrorMsg(undefined);
            switch (currentStep.name) {
              case 'Sign In':
                console.log('onSubmit values :', values);

                // return;

                signIn(AuthTypeKeys.LOGIN, {
                  email: values.email,
                  password: values.password,
                  redirect: false,
                })
                  .then((res) => {
                    console.log('res : ', res);

                    if (
                      res !== undefined &&
                      !res?.ok &&
                      res?.error !== undefined
                    ) {
                      toast.error(res.error ?? 'something went wrong');
                      setErrorMsg(res.error ?? 'something went wrong');
                      return;
                    }

                    toast.success('successfully logged in');
                    void router.push('/');
                  })
                  .catch((err) => {
                    console.log('error : ', err);

                    setErrorMsg(err.message ?? 'something went wrong');
                    toast.error(err.message ?? 'something went wrong');
                  });

                break;
              default:
                break;
            }
          }}
        >
          {(props) => {
            const btnTxt = getBtnTxt(props);

            return (
              <Form>
                <div className={s.form_content}>
                  <currentStep.Step onReturn={handleBack} />

                  {Boolean(errorMsg) && (
                    <Alert
                      severity="error"
                      variant="outlined"
                      className={s.alert}
                    >
                      <Typography variant="body1">{errorMsg}</Typography>
                    </Alert>
                  )}
                </div>

                <div className={s.controll}>
                  <MoButton
                    // onClick={handleNext}
                    motionProps={{
                      whileHover: {
                        scale: 1.01,
                      },
                      whileTap: {},
                    }}
                    disabled={btnTxt.disabled}
                    loading={btnAttribute.loading}
                    type="submit"
                    endIcon={<Login />}
                    fullWidth
                  >
                    {btnTxt.label}
                  </MoButton>

                  <div className={s.or}>
                    <Typography variant="body1">or</Typography>
                  </div>

                  <Stack gap={2}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={() => {
                        withSocial('login', 'google', null);
                        setErrorMsg(undefined);
                      }}
                    >
                      Continue with Google
                    </Button>

                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<GitHub />}
                      onClick={() => {
                        withSocial('login', 'github', null);
                        setErrorMsg(undefined);
                      }}
                    >
                      Continue with Github
                    </Button>
                  </Stack>

                  <Typography color="gray" fontWeight={300}>
                    Already have an account? &nbsp;&nbsp;
                    <Link href="/auth/register">
                      <Button variant="outlined">Register</Button>
                    </Link>
                  </Typography>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;