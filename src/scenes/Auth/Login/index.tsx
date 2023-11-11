import React, { useEffect, useState } from 'react';

import { GitHub, Login } from '@mui/icons-material';
import { Alert, Button, Stack, Typography } from '@mui/material';
import { Form, Formik, type FormikProps } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import GoogleIcon from '@/components/Icons/Google';
import { MoButton } from '@/components/MoButton';
import {
  useLoginMutation,
  useLogOutMutation,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import LogInDetails from '@/scenes/Auth/Login/component/LogInDetails';
import useSocialAuth from '@/scenes/Auth/useSocialAuth';

import s from './login.module.scss';

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
    Step: (props: any) => <LogInDetails {...props} />,
  },
];

const LoginScene = () => {
  const router = useRouter();
  const { me, mePayload } = useMe();
  const { withSocial } = useSocialAuth();

  const [login, loginPayload] = useLoginMutation();
  const [logout] = useLogOutMutation();

  const [btnAttribute, setBtnAttribute] = useState({
    disabled: false,
    loading: false,
    label: 'Login',
  });

  const [activeStep, setActiveStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [currentStep, setCurrentStep] = useState<typeof formSteps[number]>({
    ...formSteps[activeStep],
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-token`, {
      credentials: 'include',
      mode: 'no-cors',
    })
      .then(async (res) => {
        console.log('headers : ', res.headers);

        return await res.json();
      })
      .then((res) => {
        console.log('res : ', res);
      })
      .catch((err) => {
        console.log('err : ', err);
      });
  }, []);

  useEffect(() => {
    window.onmessage = (event) => {
      if (event.data.type === 'auth') {
        // console.log('onmessage event : --- ', event.data);
        if (event.data.status === 'success') {
          // close the small window
          // window.close();
          void mePayload
            .refetch()
            .then((res) => {
              if (res.data.me?.id) {
                toast.success('Login success');
                // router.reload();
              }
            })
            .catch((err) => {
              console.log('err : ', err);
            });
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
    setCurrentStep({ ...formSteps[activeStep] });
  }, [activeStep]);

  let lToast = '';

  if (me?.id) {
    void router.replace('/');
    return null;
  }

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
                if (btnAttribute.loading) {
                  return;
                }

                setBtnAttribute((prev) => ({
                  ...prev,
                  loading: true,
                  label: 'Signing In...',
                }));
                setErrorMsg(undefined);
                lToast = toast.loading('Signing in...');

                await login({
                  variables: {
                    input: {
                      email: values.email,
                      password: values.password,
                    },
                  },
                })
                  .then(async (res) => {
                    const { data, errors } = res;
                    console.log('res : ', res);

                    toast.dismiss(lToast);

                    // apollo error
                    if (errors !== undefined && errors.length > 0) {
                      toast.error(
                        errors.map((e: any) => e.message).join(', ') ??
                          'something went wrong',
                      );
                      setBtnAttribute((prev) => ({
                        ...prev,
                        loading: false,
                        label: 'Login',
                      }));
                      return;
                    }

                    // user error
                    if (data?.logIn && data.logIn.errors.length > 0) {
                      toast.error(
                        data.logIn.errors
                          .map((e: any) => e.message)
                          .join(', ') ?? 'something went wrong',
                      );
                      setErrorMsg(
                        data.logIn.errors
                          .map((e: any) => e.message)
                          .join(', ') ?? 'something went wrong',
                      );
                      setBtnAttribute((prev) => ({
                        ...prev,
                        loading: false,
                        label: 'Login',
                      }));
                      return;
                    }

                    if (data?.logIn.account?.id) {
                      await mePayload
                        .refetch()
                        .then((res) => {
                          if (res.data.me?.id) {
                            toast.dismiss(lToast);
                            toast.success('Successfully logged in');
                          }
                        })
                        .catch((err) => {
                          console.log('err : ', err);
                          toast.dismiss(lToast);
                          toast.error('Something went wrong');
                        });
                    }
                  })
                  .catch((err) => {
                    console.log('error : ', err);

                    setBtnAttribute((prev) => ({
                      ...prev,
                      loading: false,
                      label: 'Login',
                    }));
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
            // const btnTxt = getBtnTxt(props);

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
                    disabled={btnAttribute.disabled || props.isSubmitting}
                    loading={btnAttribute.loading || props.isSubmitting}
                    type="submit"
                    endIcon={!props.isSubmitting && <Login />}
                    loadingPosition="start"
                    fullWidth
                  >
                    {btnAttribute.label}
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

export default LoginScene;
