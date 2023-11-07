import React, { useEffect, useState } from 'react';

import { ArrowCircleRightTwoTone } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { type Country } from 'countries-list';
import { Form, Formik, type FormikProps } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import { MoButton } from '@/components/MoButton';
import { AccountType, useSignUpMutation } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import AuthType from '@/scenes/Auth/Register/component/AuthType';
import RegisterDetails from '@/scenes/Auth/Register/component/RegisterDetails';

import s from './signup.module.scss';

const initialValues = {
  type: '' as AccountType,
  email: '',
  password: '',
  confirmPassword: '',
  country: '' as unknown as Country,
  firstName: '',
  lastName: '',
  companyName: '',
  agree: '',
};

type FormStepName = 'Auth Type' | 'Auth Details';

interface FormStepType {
  name: FormStepName;
  Step: (props: { onReturn: () => void }) => any;
  schema?: any;
}

export type RegisterFormValuesType = typeof initialValues;

const formSteps: FormStepType[] = [
  {
    name: 'Auth Type',
    Step: (props: any) => <AuthType {...props} />,
  },
  {
    name: 'Auth Details',
    Step: (props: any) => <RegisterDetails {...props} />, // schema: JobDetailsSchema,
  },
];

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { me, mePayload } = useMe();
  const [currentStep, setCurrentStep] = useState<typeof formSteps[number]>({
    ...formSteps[activeStep],
  });
  const [btnAttribute, setBtnAttribute] = useState({
    disabled: true,
    loading: false,
    text: 'Create Account',
  });

  const router = useRouter();

  const [signIn, signInPayload] = useSignUpMutation();

  const handleNext = () => {
    setActiveStep((activeStep) => Math.min(formSteps.length, activeStep + 1));
  };

  const handleBack = () => {
    setActiveStep((activeStep) => Math.max(0, activeStep - 1));
  };

  const getBtnTxt = (props: FormikProps<RegisterFormValuesType>) => {
    if (currentStep.name === 'Auth Type') {
      if (props.values.type === AccountType.Applicant) {
        return {
          disabled: false,
          label: 'Apply as a Freelancer',
        };
      } else if (props.values.type === AccountType.Company) {
        return {
          disabled: false,
          label: 'Join as a Client',
        };
      } else if (props.values.type === AccountType.Affiliate) {
        return {
          disabled: true,
          label: '( Coming Soon )',
        };
      } else {
        return {
          disabled: true,
          label: 'Select an option',
        };
      }
    }

    return {
      disabled: false,
      label: 'Create My Account',
    };
  };

  useEffect(() => {
    setCurrentStep({ ...formSteps[activeStep] });
  }, [activeStep]);

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
          initialValues={initialValues}
          // enableReinitialize
          validationSchema={currentStep?.schema}
          onSubmit={async (
            values: RegisterFormValuesType,
            { setSubmitting, setFieldError },
          ) => {
            switch (currentStep.name) {
              case 'Auth Type':
                console.log('onSubmit values :', values);

                if (!values.type || values.type === 'AFFILIATE') return null;

                handleNext();
                break;

              case 'Auth Details':
                if (values.password !== values.confirmPassword) {
                  setFieldError('confirmPassword', 'Password does not match');
                  return null;
                }

                console.log('onSubmit values :', values);

                setBtnAttribute((attr) => ({ ...attr, loading: true }));

                // return ;
                await signIn({
                  variables: {
                    input: {
                      email: values.email,
                      password: values.password,
                      firstName: values.firstName,
                      lastName: values.lastName,
                      accountType: values.type,
                      companyName: values.companyName,
                      country: values.country.name,
                    },
                  },
                })
                  .then(async (res) => {
                    const { data, errors } = res;

                    setBtnAttribute((attr) => ({ ...attr, loading: false }));

                    if (errors !== undefined) {
                      toast.error(errors.map((e: any) => e.message).join(', '));
                      return;
                    }

                    if (!data?.signUp) {
                      toast.error('Something Wrong!');
                      return;
                    }

                    if (data.signUp.errors.length > 0) {
                      toast.error(
                        data.signUp.errors
                          .map((e: any) => e.message)
                          .join(', '),
                      );
                      return;
                    }

                    if (data?.signUp?.account?.id) {
                      await mePayload
                        .refetch()
                        .then((res) => {
                          if (res.data.me?.id) {
                            toast.success('Successfully logged in');
                          }
                        })
                        .catch((err) => {
                          console.log('err : ', err);
                          toast.error('Something went wrong');
                        });
                    }

                    return null;
                  })
                  .catch((err) => {
                    setBtnAttribute((attr) => ({ ...attr, loading: false }));
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
                  {/* {currentStep?.component({})} */}
                  <currentStep.Step onReturn={handleBack} />
                </div>

                <div className={s.controll}>
                  <MoButton
                    // onClick={handleNext}
                    motionProps={{
                      className: s.mo,
                      whileHover: {
                        scale: 1.01,
                      },
                    }}
                    disabled={btnTxt.disabled}
                    loading={btnAttribute.loading || props.isSubmitting}
                    type="submit"
                    endIcon={<ArrowCircleRightTwoTone />}
                    fullWidth
                  >
                    {btnTxt.label}
                  </MoButton>

                  <Typography color="gray" fontWeight={300}>
                    Already have an account? &nbsp;&nbsp;
                    <Link href="/auth/login">
                      <Button variant="outlined">Login</Button>
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

export default SignUp;
