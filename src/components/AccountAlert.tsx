import React from 'react';

import { Alert, Button } from '@mui/material';
import { useSession } from 'next-auth/react';

import useMe from '@/hooks/useMe';

import s from './components.module.scss';

const AccountAlert = () => {
  const { data: session } = useSession();

  const { me } = useMe();

  if (!session?.user || me?.emailVerified) return null;

  return (
    <Alert severity="warning" className={s.account_alert}>
      Please verify your email address by sending a verification link to{' '}
      <b>{me?.email}</b>.{' '}
      <Button variant="text">Send Verification Email</Button>
    </Alert>
  );
};

export default AccountAlert;
