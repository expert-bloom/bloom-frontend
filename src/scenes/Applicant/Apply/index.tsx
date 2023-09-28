import React from 'react';

import { Subject } from '@mui/icons-material';
import { Alert, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input';
import { useRouter } from 'next/router';

import { MoButton } from '@/components/MoButton';
import { useGetJobPostsQuery } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { useResponseErrorHandler } from '@/hooks/useResponseErrorHandler';
import ApplicationJobPostDetail from '@/scenes/Applicant/Apply/Components/ApplicationJobPostDetail';
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

const Apply = () => {
  // access the id from the url
  const router = useRouter();
  const { me } = useMe();
  const formik = useFormik({
    initialValues: {
      phone: '',
    },
    onSubmit: (values) => {
      console.log('submit value : ', values);
    },
  });
  const { values } = formik;

  const jopPostsPayload = useGetJobPostsQuery();
  const { data: posts, loading } = jopPostsPayload;

  useResponseErrorHandler(
    jopPostsPayload.error,
    'Something wrong showing job-posts',
  );

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Typography variant="h4">Submit a Job Proposal</Typography>

        <ApplicationJobPostDetail
          post={
            posts?.getJobPosts?.find(
              (post) => post.id === router.query.id,
            ) as any
          }
        />

        <div className={s.your_info}>
          <Typography variant="h4">Your Info</Typography>

          <Stack direction="row" gap="1rem">
            <Stack flex="1">
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="account.email"
                name="email"
                // disabled
                fullWidth
                // onChange={handleChange}
                // value={values.account.email}
                // error={Boolean(formik.errors.account?.email)}
                // helperText={formik.errors.account?.email as string}
              />
            </Stack>

            <Stack flex="1">
              <FormLabel htmlFor="fullname">Phone number</FormLabel>

              <MuiTelInput
                // label="phone no"
                name="account.phone"
                placeholder={Array(15).fill('_').join(' ')}
                // value={values.account.phone}
                // onlyCountries={['ET']}
                defaultCountry="US"
                fullWidth
                forceCallingCode
                focusOnSelectCountry
                MenuProps={MenuProps}
                onChange={(value, info) => {
                  console.log('value: ', info);
                  void formik.setFieldValue('account.phone', value);
                }}
                error={Boolean(values.phone && !matchIsValidTel(values.phone))}
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
              name="cover_letter"
              type="text"
              rows={4}
              required
              multiline
              fullWidth
              // onChange={handleChange}
              // value={values.applicant.github}
              // error={Boolean(formik.errors.applicant?.github)}
              // helperText={formik.errors.applicant?.github as string}
            />
          </Stack>

          <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
            <FormLabel>Resume</FormLabel>
            <ResumeFile resume={me?.applicant?.resume ?? undefined} />
          </Stack>

          <Alert severity="info">
            <Typography variant="body2" fontWeight={300}>
              All your Account information will be shared with the job poster.
            </Typography>
          </Alert>
        </div>

        <div className={s.submit}>
          <MoButton startIcon={<Subject />}>Submit</MoButton>
        </div>
      </div>
    </div>
  );
};

export default Apply;
