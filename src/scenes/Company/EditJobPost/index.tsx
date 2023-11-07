/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState, useTransition } from 'react';

import {
  ArrowCircleLeftTwoTone,
  ArrowCircleRightTwoTone,
  Update,
} from '@mui/icons-material';
import {
  CircularProgress,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { AnimatePresence, motion, transform } from 'framer-motion';
import { isEqual, mapValues, pickBy } from 'lodash';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import { MoButton } from '@/components/MoButton';
import {
  GetJobPostDocument,
  GetJobPostsDocument,
  type JobPost,
  useEditJobPostMutation,
  useGetJobPostsQuery,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import {
  type EditJoPostValuesType,
  initialValuesShape,
} from '@/scenes/Company/CreateJobPost';
import InterviewQuestions, {
  schema as InterviewSchema,
} from '@/scenes/Company/EditJobPost/InterviewQuestions';
import JobDetails, {
  schema as JobDetailsSchema,
} from '@/scenes/Company/EditJobPost/JobDetails';
import JobRequirement, {
  schema as JobReqSchema,
} from '@/scenes/Company/EditJobPost/JobRequirement';
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
];

// export type EditJoPostValuesType = typeof initialValuesShape;

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

  const [editJobPost, editJobPostResponse] = useEditJobPostMutation();

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
      skills: findSelectedJobPost.category.map((c) => ({ label: c })),
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
    setInitialValues(initial);
  };

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

  const onEditJobPost = () => {
    if (!isChanged) {
      return;
    }
    // filter out only the changed values
    const changedValues: Partial<EditJoPostValuesType> = getChangedFields(
      formik.values,
      formik.initialValues,
    ) as any;
    const editInput: any =
      nullify<Partial<EditJoPostValuesType>>(changedValues);

    if (editInput?.category) {
      editInput.category = editInput?.category?.map((c: any) => c.label);
    }

    if (editInput?.skills) {
      editInput.skills = editInput?.skills.map((c: any) => c.label);
    }

    if (editInput?.otherLanguages) {
      editInput.otherLanguages = editInput?.otherLanguages.map(
        (lang: any) => `${lang.language} - ${lang.level}`,
      );
    }

    console.log('edit job post input : ', editInput);

    editJobPost({
      refetchQueries: [GetJobPostsDocument, GetJobPostDocument],
      variables: {
        input: {
          editedData: editInput,
          filter: {
            jobPostId: id as string,
            companyId: me?.company?.id as string,
          },
        },
      },
    })
      .then((res) => {
        if (res.data?.editJobPost.jobPost?.id) {
          toast.success('Job Post Updated Successfully');
        }
      })
      .catch((err) => {
        toast.error('Error Updating Job Post');
        console.log('err : ', err);
      });
  };

  useEffect(() => {
    if (
      jobPostPayloads.loading ||
      !jobPostPayloads.data ||
      !jobPostPayloads.data.getJobPosts ||
      !id
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

                <MoButton
                  // onClick={handleNext}
                  loading={editJobPostResponse.loading}
                  disabled={!isChanged}
                  // type="submit"
                  endIcon={<Update />}
                  onClick={onEditJobPost}
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
                    disabled={
                      activeStep === formSteps.length - 1 ||
                      editJobPostResponse.loading
                    }
                  >
                    Next
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
