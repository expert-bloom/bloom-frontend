import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Alert, Stack } from '@mui/material';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

import { useSendEmailMutation } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';

import s from './components.module.scss';

const AccountAlert = () => {
  const { me } = useMe();

  const [sendEmail, sendEmailPayload] = useSendEmailMutation();

  return (
    <div className={s.account_alert_container}>
      {!me?.emailVerified && (
        <Alert severity="warning" className={s.account_alert}>
          Please verify your email address by sending a verification link to{' '}
          <b>{me?.email}</b>.{' '}
          <LoadingButton
            loading={sendEmailPayload.loading}
            variant="text"
            sx={{ padding: 0, pl: '1rem' }}
            onClick={() => {
              const tLoading = toast.loading('Sending verification email...');

              void sendEmail({}).then((res) => {
                toast.dismiss(tLoading);
                if (res.data?.sendEmail) {
                  toast.success(
                    'Verification email sent. Please check your inbox.',
                  );
                } else {
                  toast.error('Error sending verification email!');
                }
              });
            }}
          >
            {sendEmailPayload.called ? 'Resend' : 'Send'} Verification Email
          </LoadingButton>
        </Alert>
      )}

      {!me?.profileCompleteness && me?.applicant?.id && (
        <Alert severity="warning" className={s.account_alert}>
          <Stack direction="row" alignItems="center">
            Please Complete your profile to start applying for Job Post.
            <Link href="/applicant/profile">
              <LoadingButton variant="text" sx={{ padding: 0, pl: '1.5rem' }}>
                Complete Profile
              </LoadingButton>
            </Link>
          </Stack>
        </Alert>
      )}

      {!me?.profileCompleteness && me?.company?.id && (
        <Link href="/company/profile">
          <Alert severity="warning" className={s.account_alert}>
            <Stack direction="row" alignItems="center">
              Please Complete your profile to start receiving resumes.
              <Link href="/company/profile">
                <LoadingButton variant="text">Complete Profile</LoadingButton>
              </Link>
            </Stack>
          </Alert>
        </Link>
      )}
    </div>
  );
};

export default AccountAlert;
