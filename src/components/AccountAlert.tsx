import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Alert } from '@mui/material';
import { toast } from 'react-hot-toast';

import { useSendEmailMutation } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';

import s from './components.module.scss';

const AccountAlert = () => {
  const { me } = useMe();

  const [sendEmail, sendEmailPayload] = useSendEmailMutation();

  if (me?.emailVerified) return null;

  return (
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
  );
};

export default AccountAlert;
