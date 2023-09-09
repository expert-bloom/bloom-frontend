/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react';

import { ArrowCircleRightTwoTone } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { type Country } from 'countries-list';
import { Form, Formik, type FormikProps } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { type SignInOptions } from 'next-auth/src/react/types';
import { toast } from 'react-hot-toast';

import { MoButton } from '@/components/MoButton';
import { AuthTypeKeys } from '@/constants';
import { AccountType, type SignUpInput } from '@/graphql/client/gql/schema';
import AuthDetails from '@/scenes/Auth/SignUp/component/AuthDetails';
import AuthType from '@/scenes/Auth/SignUp/component/AuthType';

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
    Step: (props: any) => <AuthDetails {...props} />, // schema: JobDetailsSchema,
  },
];

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [currentStep, setCurrentStep] = useState<typeof formSteps[number]>({
    ...formSteps[activeStep],
  });
  const [btnAttribute, setBtnAttribute] = useState({
    disabled: true,
    loading: false,
    text: 'Create Account',
  });

  const router = useRouter();

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
          disabled: false,
          label: 'Join as a Affiliate',
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

                if (!values.type) return null;

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
                signIn(AuthTypeKeys.SIGNUP, {
                  email: values.email,
                  password: values.password,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  accountType: values.type,
                  country: values.country.name,
                  redirect: false,
                } satisfies SignUpInput & SignInOptions)
                  .then((res) => {
                    if (
                      res !== undefined &&
                      !res.ok &&
                      res.error !== undefined
                    ) {
                      setBtnAttribute((attr) => ({ ...attr, loading: false }));
                      toast.error(res.error ?? 'something went wrong');
                      return;
                    }

                    // redirect the user to the dashboard
                    toast.success('Account created successfully, welcome!');
                    void router.push('/');
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
