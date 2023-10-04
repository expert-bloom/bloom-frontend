import React, { useEffect, useState, useTransition } from 'react';

import {
  ArrowCircleLeftTwoTone,
  ArrowCircleRightTwoTone,
  Save,
  Update,
} from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { AnimatePresence, motion, transform } from 'framer-motion';
import { isEqual } from 'lodash';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import { MoButton } from '@/components/MoButton';
import {
  type CreateJobPostInput,
  type EnglishLevel,
  type ExperienceLevel,
  type JobPost,
  type JobSite,
  type JobType,
  type SalaryType,
  useCreateJobPostMutation,
  useGetJobPostsQuery,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { SettingFormValuesType } from '@/scenes/Applicant/Profile/data';
import InterviewQuestions, {
  schema as InterviewSchema,
} from '@/scenes/Company/EditJobPost/InterviewQuestions';
import JobDetails, {
  schema as JobDetailsSchema,
} from '@/scenes/Company/EditJobPost/JobDetails';
import JobRequirement, {
  schema as JobReqSchema,
} from '@/scenes/Company/EditJobPost/JobRequirement';
import Review from '@/scenes/Company/EditJobPost/Review';
import {
  transition,
  wrapperVariants,
} from '@/scenes/Company/EditJobPost/util/variants';

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

const initialValuesShape = {
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
  skillLevel: '' as ExperienceLevel,
  skill: [
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

interface EditJobPostContextType {
  formik: ReturnType<typeof useFormik<EditJoPostValuesType>>;
}

// create a context for the formik form
const EditJobPostContext = React.createContext<EditJobPostContextType>(
  {} as any,
);
export const useProfileSettingFormContext = () =>
  React.useContext(EditJobPostContext);

const PostJob = () => {
  const [dir, setDir] = useState<'RIGHT' | 'LEFT'>();
  const [isChanged, setIsChanged] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [activeStep, setActiveStep] = React.useState(0);
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { me } = useMe();

  const [initialValues, setInitialValues] =
    useState<EditJoPostValuesType>(initialValuesShape);

  const [selectedJobPost, setSelectedJobPost] =
    React.useState<JobPost | null>();

  const [currentStep, setCurrentStep] = useState<typeof formSteps[number]>({
    ...formSteps[activeStep],
  });

  const [createPost, response] = useCreateJobPostMutation();
  const jobPostPayloads = useGetJobPostsQuery();

  const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setActiveStep((activeStep) => Math.min(formSteps.length, activeStep + 1));
    setDir('LEFT');
  };

  const handleBack = () => {
    setActiveStep((activeStep) => Math.max(0, activeStep - 1));
    setDir('RIGHT');
  };

  const checkForChange = () => {
    return !isEqual(formik.initialValues, formik.values);
  };

  const reset = () => {
    if (!jobPostPayloads.data || jobPostPayloads.loading) return;
    const findSelectedJobPost = jobPostPayloads.data.getJobPosts.find(
      (jp) => jp.id === id,
    );

    console.log('findSelectedJobPost : ', findSelectedJobPost, 'Id : ', id);

    if (!findSelectedJobPost) {
      toast.error('Invalid Job Post Id provided');
      setSelectedJobPost(null);
      return;
    }

    setSelectedJobPost(findSelectedJobPost);

    console.log('me : ', me);

    const initial: EditJoPostValuesType = {
      ...initialValues,
      ...findSelectedJobPost,
      category: findSelectedJobPost.category.map((c) => ({ label: c })),
      otherLanguages: findSelectedJobPost.otherLanguages.map((lang) => ({
        language: lang.split('-')[0].trim(),
        level: lang.split('-')[1].trim(),
      })),
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
      jobPostPayloads.loading ||
      !jobPostPayloads.data ||
      !jobPostPayloads.data.getJobPosts
    ) {
      return;
    }

    reset();
  }, [jobPostPayloads]);

  const formik = useFormik<EditJoPostValuesType>({
    initialValues,
    enableReinitialize: true,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: currentStep?.schema,
    async onSubmit(values) {
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
            skills: values.skill.map((c: any) => c.label),
            englishLevel: values.englishLevel,
            otherLanguages: values.otherLanguages.map(
              (lang) => `${lang.language} - ${lang.level}`,
            ),
            qualifications: values.qualifications,
            interviewQuestions: values.interviewQuestions,
            experienceLevel: values.skillLevel,

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
    },
  });

  useEffect(() => {
    setCurrentStep({ ...formSteps[activeStep] });
  }, [activeStep]);

  useEffect(() => {
    startTransition(() => {
      setIsChanged(checkForChange());
    });
  }, [formik.values]);

  const postNow = currentStep.name === stepNames.Post;

  if (selectedJobPost === null) return <div className={s.container} />;

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <header>
          <Typography variant="h4" className={s.title} gutterBottom>
            Edit A Job Post
          </Typography>
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
          <EditJobPostContext.Provider value={{ formik }}>
            <form onSubmit={formik.handleSubmit}>
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

                {isPending && (
                  <CircularProgress sx={{ position: 'absolute' }} />
                )}

                <Button variant="text">Exit</Button>

                <MoButton
                  // onClick={handleNext}
                  loading={formik.isSubmitting}
                  disabled={!isChanged}
                  type="submit"
                  endIcon={<Update />}
                >
                  Update Job Post
                </MoButton>

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
                    loading={formik.isSubmitting}
                    type="submit"
                    endIcon={<ArrowCircleRightTwoTone />}
                  >
                    {postNow ? 'Post Job' : 'Next'}
                  </MoButton>
                </div>
              </div>
            </form>
          </EditJobPostContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
