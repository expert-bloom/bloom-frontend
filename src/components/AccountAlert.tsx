import React from 'react';

import { Alert, Button } from '@mui/material';

import useMe from '@/hooks/useMe';

import s from './components.module.scss';

const AccountAlert = () => {
  const { me } = useMe();

  if (me?.emailVerified) return null;

  return (
    <Alert severity="warning" className={s.account_alert}>
      Please verify your email address by sending a verification link to{' '}
      <b>{me?.email}</b>.{' '}
      <Button variant="text" sx={{ padding: 0, pl: '1rem' }}>
        ReSend Verification Email
      </Button>
    </Alert>
  );
};

export default AccountAlert;
