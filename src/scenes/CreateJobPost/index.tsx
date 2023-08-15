import React, { useEffect, useState } from 'react';

import {
  ArrowCircleLeftTwoTone,
  ArrowCircleRightTwoTone,
} from '@mui/icons-material';
import {
  Button,
  Divider,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { AnimatePresence, motion, transform } from 'framer-motion';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { MoButton } from '@/components/MoButton';
import { type CreateJobPostInput } from '@/graphql/client/gql/schema';
import InterviewQuestions, {
  schema as InterviewSchema,
} from '@/scenes/CreateJobPost/InterviewQuestions';
import JobDetails, {
  schema as JobDetailsSchema,
} from '@/scenes/CreateJobPost/JobDetails';
import JobRequirement, {
  schema as JobReqSchema,
} from '@/scenes/CreateJobPost/JobRequirement';
import Review from '@/scenes/CreateJobPost/Review';
import {
  transition,
  wrapperVariants,
} from '@/scenes/CreateJobPost/util/variants';

import s from './postjob.module.scss';

const stepNames = {
  Details: 'Job Details',
  Requirements: 'Job Requirements',
  Interview: 'Interview Questions',
  Post: 'Review & Post',
  Done: 'Done',
} as const;

type FormStepName = typeof stepNames[keyof typeof stepNames];

interface FormStepType {
  name: FormStepName;
  component: (props: any) => any;
  schema?: any;
}

const formSteps: FormStepType[] = [
  {
    name: stepNames.Details, // components: (props: any) => <Review {...props} />,
    component: (props: any) => <JobDetails {...props} />,
    schema: JobDetailsSchema,
  },
  {
    name: stepNames.Requirements,
    component: (props: any) => <JobRequirement {...props} />,
    schema: JobReqSchema,
  },
  {
    name: stepNames.Interview,
    component: (props: any) => <InterviewQuestions {...props} />,
    schema: InterviewSchema,
  },
  {
    name: stepNames.Post,
    component: (props: any) => <Review {...props} />,
  } /* {
    name: 'Done',
    component: (props: any) => <h1>congradulation </h1>,
  }, */,
];

const initialValues = {
  title: 'Dawit' as string,
  description: 'jhlkjhlkjh' as string,
  type: {
    label: 'Internship',
  } satisfies { label: string },
  category: [
    {
      label: 'IT',
    },
  ] as Array<{ label: string }>,
  vacancy: 88 as number,
  deadline: undefined,
  compensation: {
    label: 'Hourly',
  },
  salary: [30] as unknown as [number, number] | [number],
  location: {
    label: 'Remote',
  },
  email: 'henokgetachew500@gmail.com',

  // requirements
  experience: 3,
  skill: [
    {
      label: 'Vue.js',
    },
  ],
  englishLevel: '' as string,
  otherLanguages: [] as unknown as [{ language: string; level: string }],
  qualifications: [] as string[],
  interviewQuestions: [] as string[],
};

export type FormValuesType = typeof initialValues;

const PostJob = () => {
  const router = useRouter();

  const user = useSelector((state: any) => state.User.userData);

  const [dir, setDir] = useState<'RIGHT' | 'LEFT'>();
  const [activeStep, setActiveStep] = React.useState(0);
  const [currentStep, setCurrentStep] = useState<typeof formSteps[number]>({
    ...formSteps[activeStep],
  });

  // const [createPost, response] = useCreateJobPostMutation();

  const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setActiveStep((activeStep) => Math.min(formSteps.length, activeStep + 1));
    setDir('LEFT');
  };

  const handleBack = () => {
    setActiveStep((activeStep) => Math.max(0, activeStep - 1));
    setDir('RIGHT');
  };

  useEffect(() => {
    setCurrentStep({ ...formSteps[activeStep] });
  }, [activeStep]);

  const postNow = currentStep.name === stepNames.Post;

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <header>
          <Typography variant="h3" className={s.title} gutterBottom>
            Create A Job Post
          </Typography>

          <Divider
            variant="fullWidth"
            orientation="horizontal"
            className={s.divider}
          />
        </header>

        <Stepper activeStep={activeStep} className={s.stepper}>
          {formSteps.map(({ name }, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={name} {...stepProps}>
                <StepLabel {...labelProps}>{name}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div className={s.content}>
          {/* <form onSubmit={formik.handleSubmit}> */}
          <Formik
            validateOnMount={false}
            validateOnChange={false}
            validateOnBlur={true}
            enableReinitialize
            validationSchema={currentStep?.schema}
            onSubmit={async (values: any, { setSubmitting }) => {
              console.log('onSubmit values :', values);

              switch (currentStep.name) {
                case stepNames.Details:
                  handleNext();
                  break;
                case stepNames.Requirements:
                  handleNext();
                  break;
                case stepNames.Interview:
                  handleNext();
                  break;
                case stepNames.Post: {
                  /* const job: CreateJobPostInput = {
                    title: values.title,
                    description: values.description,
                    salary: values.salary,
                    jobType: values.type.label,
                    jobCategory: values.category.map((c: any) => c.label),
                    jobExperience: values.experience,
                    jobVacancy: values.vacancy,
                    jobDeadline: values.deadline,
                    compensation: values.compensation.label.toLowerCase(),
                    jobSkills: values.skill.map((c: any) => c.label),
                    isVisible: true,
                    companyId: '-',
                    company: '-',
                    otherLanguages: [],
                    email: values.email,
                  }; */

                  return;

                  handleNext();
                  break;
                }
                case 'Done':
                  handleNext();
                  break;
                default:
                  break;
              }
            }}
            initialValues={initialValues}
          >
            {(props) => {
              return (
                <Form>
                  <div className={s.form_content}>
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        className={s.animator}
                        key={currentStep.name}
                        variants={wrapperVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={transition}
                        custom={{ direction: dir }}
                      >
                        {currentStep?.component({})}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className={s.controll}>
                    <div className={s.progress}>
                      <LinearProgress
                        variant="determinate"
                        value={transform(
                          [0, formSteps.length],
                          [0, 100],
                        )(activeStep)}
                      />
                    </div>

                    <Button variant="text">Exit</Button>

                    <div className={s.controlle_right} id="sticky">
                      <MoButton
                        onClick={handleBack}
                        startIcon={<ArrowCircleLeftTwoTone />}
                        disabled={activeStep === 0}
                      >
                        Back
                      </MoButton>

                      <MoButton
                        // onClick={handleNext}
                        type="submit"
                        endIcon={<ArrowCircleRightTwoTone />}
                      >
                        {postNow ? 'Post Job' : 'Next'}
                      </MoButton>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>

          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default PostJob;
