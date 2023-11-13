import React, { createContext, useEffect, useRef, useState } from 'react';

import { Subject } from '@mui/icons-material';
import {
  Alert,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { type FormikHelpers } from 'formik/dist/types';
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input';
import { useRouter } from 'next/router';
import { type FilePond } from 'react-filepond';
import { toast } from 'react-hot-toast';

import Loader from '@/components/Loader';
import { MoButton } from '@/components/MoButton';
import {
  GetJobApplicationsDocument,
  type JobPost,
  useCreateJobApplicationMutation,
  useGetJobPostsQuery,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { useResponseErrorHandler } from '@/hooks/useResponseErrorHandler';
import ApplicationJobPostDetail from '@/scenes/Applicant/Apply/Components/ApplicationJobPostDetail';
import Attachment from '@/scenes/Applicant/Apply/Components/Attachment';
import ResumeFile from '@/scenes/Applicant/Apply/Components/Resumefile';

import s from './apply.module.scss';

const ITEM_HEIGHT = 88;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ApplyProps {
  phone: string;
  email: string;
  coverLetter: string;
  resume: string;
  attachment?: string;
}

interface JobPostApplicationContextType {
  formik: ReturnType<typeof useFormik<ApplyProps>>;
  resumeFilePond: React.RefObject<FilePond>;
  attachmentFilePond: React.RefObject<FilePond>;
}

// create a context for the formik form
const JobApplicationFormContext = createContext<JobPostApplicationContextType>(
  {} as any,
);
export const useJobPostApplicationContext = () =>
  React.useContext(JobApplicationFormContext);

const Apply = () => {
  // access the id from the url
  const router = useRouter();
  const { id: jobPostId } = router.query;

  const jopPostsPayload = useGetJobPostsQuery();

  const [selectedJobPost, setSelectedJobPost] = useState<JobPost>();

  const resumeFilePond = useRef<FilePond>(null);
  const attachmentFilePond = useRef<FilePond>(null);
  const [createApplication] = useCreateJobApplicationMutation();

  const { me, loading: meLoading } = useMe();

  const [initialValues, setInitialValues] = React.useState<ApplyProps>({
    phone: '',
    email: '',
    coverLetter: '',
    resume: '',
    attachment: '',
  });

  const formik = useFormik<ApplyProps>({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values, formikHelpers) => {
      if (!selectedJobPost || meLoading) return null;

      if (!me?.emailVerified) {
        toast.error('Verify your Email to start applying for job-posts');
        return;
      }

      let newValue = await onResumeSubmit(values, formikHelpers);

      console.log('submit value : ', newValue);
      if (!newValue?.resume) {
        // toast.error('Resume file is required');
        return null;
      }

      newValue = await onAdditionalAttachmentUpload(values, formikHelpers);

      if (!newValue) {
        return null;
      }

      console.log('new values : ', newValue);

      try {
        const createApplicationRes = await createApplication({
          refetchQueries: [GetJobApplicationsDocument],
          awaitRefetchQueries: true,
          variables: {
            input: {
              applicantId: me?.applicant?.id ?? '',
              companyId: selectedJobPost.companyId,
              attachment: newValue.attachment,
              coverLetter: newValue.coverLetter,
              email: newValue.email,
              phone: newValue.phone,
              resume: newValue.resume,
              jobPostId: jobPostId as string,
            },
          },
        });

        if (createApplicationRes.data?.createApplication.application?.id) {
          await router.replace(
            `/applicant/my-interviews/application/${createApplicationRes.data?.createApplication.application?.id}`,
          );
        }
      } catch (err: any) {
        console.log('error applying : ', err);
        toast.error('Something went wrong creating application');
        return null;
      }
    },
  });
  const { values, handleChange } = formik;

  const onResumeSubmit = async (
    values: typeof formik.values,
    formikHelpers: FormikHelpers<ApplyProps>,
  ) => {
    if (!resumeFilePond.current) {
      toast.error('Resume file is required');
      return null;
    }
    // check if the default is changed
    const pond = resumeFilePond.current;
    let loadingToast = '';

    if (!pond.getFile()) {
      toast.error('Resume file is required');
      return values;
    }

    console.log('nested submit : ', values, pond.getFile());

    try {
      // formikHelpers.setSubmitting(true);
      if (
        typeof values.resume === 'string' &&
        values.resume === pond.getFile().source
      ) {
        return values;
      }

      let url = {
        serverId: pond.getFile()?.serverId,
      };

      if (!url.serverId && pond.getFile().source instanceof File) {
        // upload thumbnail to s3
        loadingToast = toast.loading('uploading resume ... ');

        url = await pond.processFile();
      }

      console.log('url : ', url);

      await formik.setFieldValue('applicant.resume', url.serverId);
      toast.dismiss(loadingToast);

      return {
        ...values,
        resume: url.serverId,
      };
    } catch (err: any) {
      console.log(' err : ', err);
      toast.dismiss(loadingToast);

      if (err?.error?.body === 'Item not found') {
        console.log('filepond err : ', err);
        toast.error('Resume file is required');
        return null;
      }

      toast.error(err?.message ?? 'Error uploading resume.');
      return null;
    }
  };

  const onAdditionalAttachmentUpload = async (
    values: typeof formik.values,
    formikHelpers: FormikHelpers<ApplyProps>,
  ) => {
    if (!attachmentFilePond.current) {
      return values;
    }
    // check if the default is changed
    const pond = attachmentFilePond.current;
    let loadingToast = '';

    if (!pond.getFile()) {
      return values;
    }

    try {
      // formikHelpers.setSubmitting(true);
      if (
        typeof values.attachment === 'string' &&
        values.attachment === pond.getFile().source
      ) {
        return values;
      }

      let url = {
        serverId: pond.getFile()?.serverId,
      };

      if (!url.serverId && pond.getFile().source instanceof File) {
        // upload thumbnail to s3
        loadingToast = toast.loading('uploading attachment ... ');
        url = await pond.processFile();
      }

      await formik.setFieldValue('applicant.attachment', url.serverId);
      toast.dismiss(loadingToast);

      return {
        ...values,
        attachment: url.serverId,
      };
    } catch (err: any) {
      console.log(' err : ', err);
      toast.dismiss(loadingToast);
      toast.error(err?.message ?? 'Error uploading attachment.');
      return null;
    }
  };

  useResponseErrorHandler(
    jopPostsPayload.error,
    'Something wrong showing job-posts',
  );

  useEffect(() => {
    if (!me || meLoading) {
      return;
    }

    setInitialValues({
      ...initialValues,
      email: me?.email ?? '',
      phone: me?.phone ?? '',
      resume: me?.applicant?.resume ?? '',
    });
  }, [me]);

  useEffect(() => {
    if (jopPostsPayload.loading || meLoading || selectedJobPost?.id) {
      return;
    }

    const selected = jopPostsPayload.data?.getJobPosts?.find(
      (post) => post.id === jobPostId,
    );

    if (!selected) {
      toast.error('Selected JobPost not found');
      return;
    }

    setSelectedJobPost(selected as JobPost);
  }, [jobPostId, jopPostsPayload, meLoading, selectedJobPost?.id]);

  if (meLoading || jopPostsPayload.loading) {
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.loader}>
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (!me?.emailVerified) {
    void router.replace('/404');
    return null;
  }

  if (!selectedJobPost) {
    return null;
  }

  return (
    <JobApplicationFormContext.Provider
      value={{ formik, resumeFilePond, attachmentFilePond }}
    >
      <div className={s.container}>
        <div className={s.wrapper}>
          <Typography variant="h4">Submit a Job Proposal</Typography>

          <ApplicationJobPostDetail post={selectedJobPost} />

          <form onSubmit={formik.handleSubmit} className={s.your_info}>
            <Typography variant="h4">Your Info</Typography>

            <Stack direction="row" gap="1rem">
              <Stack flex="1">
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  // disabled
                  fullWidth
                  required
                  onChange={handleChange}
                  value={values.email}
                  error={Boolean(formik.errors?.email)}
                  helperText={formik.errors?.email as string}
                />
              </Stack>

              <Stack flex="1">
                <FormLabel htmlFor="fullname">Phone number</FormLabel>

                <MuiTelInput
                  // label="phone no"
                  name="phone"
                  placeholder={Array(15).fill('_').join(' ')}
                  value={values.phone}
                  fullWidth
                  required
                  forceCallingCode
                  focusOnSelectCountry
                  MenuProps={MenuProps}
                  onChange={(value, info) => {
                    console.log('value: ', info);
                    void formik.setFieldValue('phone', value);
                  }}
                  error={Boolean(
                    values.phone && !matchIsValidTel(values.phone),
                  )}
                  helperText={
                    values.phone && !matchIsValidTel(values.phone)
                      ? 'phone number is invalid'
                      : ''
                  }
                />
              </Stack>
            </Stack>

            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>Cover Letter</FormLabel>
              <TextField
                name="coverLetter"
                type="text"
                rows={4}
                required
                multiline
                fullWidth
                onChange={handleChange}
                value={values.coverLetter}
                error={Boolean(formik.errors?.coverLetter)}
                helperText={formik.errors?.coverLetter as string}
              />
            </Stack>

            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>Resume</FormLabel>
              <Stack gap="0rem">
                <ResumeFile resume={me?.applicant?.resume ?? undefined} />
                <FormControlLabel
                  control={<Checkbox />}
                  id="resume"
                  label={
                    <Typography variant="body2" color="gray">
                      Set as default resume for all job applications{' '}
                      <small>
                        ( you can change this later in the profile setting )
                      </small>
                    </Typography>
                  }
                />
              </Stack>
            </Stack>

            <Stack spacing={0.5} flex="1" sx={{ width: '100%', mt: '1rem' }}>
              <FormLabel>Other related attachments :</FormLabel>
              <Attachment attachment={formik.values.attachment ?? undefined} />
            </Stack>

            <Alert severity="info">
              <Typography variant="body2" fontWeight={300}>
                All your Account information will be shared with the job poster.
              </Typography>
            </Alert>

            <div className={s.submit}>
              <MoButton
                type="submit"
                startIcon={<Subject />}
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
              >
                Submit
              </MoButton>
            </div>
          </form>
        </div>
      </div>
    </JobApplicationFormContext.Provider>
  );
};

export default Apply;
