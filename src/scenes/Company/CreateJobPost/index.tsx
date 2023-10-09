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
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import { MoButton } from '@/components/MoButton';
import {
  type CreateJobPostInput,
  type EnglishLevel,
  type ExperienceLevel,
  type JobSite,
  type JobType,
  type SalaryType,
  useCreateJobPostMutation,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import InterviewQuestions, {
  schema as InterviewSchema,
} from '@/scenes/Company/CreateJobPost/InterviewQuestions';
import JobDetails, {
  schema as JobDetailsSchema,
} from '@/scenes/Company/CreateJobPost/JobDetails';
import JobRequirement, {
  schema as JobReqSchema,
} from '@/scenes/Company/CreateJobPost/JobRequirement';
import Review from '@/scenes/Company/CreateJobPost/Review';
import {
  transition,
  wrapperVariants,
} from '@/scenes/Company/CreateJobPost/util/variants';

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

const initialValuesWithValue = {
  title: 'Dawit' as string,
  description: 'jhlkjhlkjh' as string,
  jobType: 'INTERNSHIP' as JobType,
  category: [
    {
      label: 'IT',
    },
  ] as Array<{ label: string }>,
  vacancy: 88 as number,
  deadline: new Date(),
  salaryType: 'HOURLY' as SalaryType,
  salary: [30] as unknown as [number, number] | [number],
  jobSite: 'REMOTE' as JobSite,
  email: 'henokgetachew500@gmail.com',
  location: 'Ethiopia' as string,

  // requirements
  experience: 3,
  experienceLevel: 'Beginner' as ExperienceLevel,
  skill: [
    {
      label: 'Vue.js',
    },
  ],
  englishLevel: 'FLUENT' as EnglishLevel,
  otherLanguages: [] as unknown as Array<{ language: string; level: string }>,
  qualifications: ['ambitious and passionate'] as string[],
  interviewQuestions: ['what is your name?', 'how old are you'] as string[],

  companyId: '' as unknown as string,
};

export const initialValuesShape = {
  title: '' as string,
  description: '' as string,
  jobType: '' as JobType,
  category: [
    {
      label: '',
    },
  ] as Array<{ label: string }>,
  vacancy: 88 as number,
  deadline: new Date(),
  salaryType: '' as SalaryType,
  salary: [30] as unknown as [number, number] | number[],
  jobSite: '' as JobSite,
  email: '',
  location: '' as string,

  // requirements
  experience: 3,
  experienceLevel: '' as ExperienceLevel,
  skills: [
    {
      label: '',
    },
  ],
  englishLevel: 'FLUENT' as EnglishLevel,
  otherLanguages: [] as unknown as Array<{ language: string; level: string }>,
  qualifications: ['ambitious and passionate'] as string[],
  interviewQuestions: ['what is your name?', 'how old are you'] as string[],

  companyId: '' as unknown as string,
};

export type EditJoPostValuesType = typeof initialValuesShape;

const PostJob = () => {
  const [dir, setDir] = useState<'RIGHT' | 'LEFT'>();
  const [activeStep, setActiveStep] = React.useState(0);
  const { data: session } = useSession();
  const { me } = useMe();

  const [currentStep, setCurrentStep] = useState<typeof formSteps[number]>({
    ...formSteps[activeStep],
  });

  const router = useRouter();

  const [createPost, response] = useCreateJobPostMutation();

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
            onSubmit={async (values, { setSubmitting }) => {
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
                  const job: CreateJobPostInput = {
                    title: values.title,
                    description: values.description,
                    jobType: values.jobType,
                    category: values.category.map((c: any) => c.label),
                    vacancy: values.vacancy,
                    applicationDeadline: values.deadline,
                    salaryType: values.salaryType,
                    salary: values.salary,
                    jobSite: values.jobSite,
                    email: values.email,
                    location: values.location,

                    jobExperience: values.experience,
                    skills: values.skills.map((c: any) => c.label),
                    englishLevel: values.englishLevel,
                    otherLanguages: values.otherLanguages.map(
                      (lang) => `${lang.language} - ${lang.level}`,
                    ),
                    qualifications: values.qualifications,
                    interviewQuestions: values.interviewQuestions,
                    experienceLevel: values.experienceLevel,

                    isVisible: true,

                    postedBy: session?.user?.id ?? '',
                    affiliateId: me?.affiliate?.id ?? null,
                    companyId:
                      session?.user?.accountType === 'COMPANY'
                        ? (me?.company?.id as string)
                        : values.companyId,
                  };

                  const createPostPayload = await createPost({
                    variables: {
                      input: {
                        ...job,
                      },
                    },
                  });

                  if (
                    createPostPayload?.errors &&
                    createPostPayload.errors?.length > 0
                  ) {
                    toast.success(createPostPayload.errors?.join(', '));
                  }

                  if (
                    createPostPayload.data?.createJobPost &&
                    createPostPayload.data?.createJobPost.errors.length > 0
                  ) {
                    toast.success(
                      createPostPayload.data?.createJobPost.errors
                        ?.map((err) => err.message)
                        .join(', '),
                    );
                  }

                  if (createPostPayload.data?.createJobPost.jobPost?.id) {
                    toast.success('Successfully created your Job-post');
                    void router.push('/company/dashboard');
                  }

                  console.log('response : ', createPostPayload);
                  break;
                }
                case 'Done':
                  handleNext();
                  break;
                default:
                  break;
              }
            }}
            initialValues={initialValuesShape}
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
                        loading={props.isSubmitting}
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
