import React, { useEffect } from 'react';

import { Alert, AlertTitle, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import Loader from '@/components/Loader';
import {
  MeDocument,
  useVerifyAccountMutation,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';

import s from './adminactivation.module.scss';

const AccountActivation = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { me, mePayload, loading: meLoading } = useMe();

  const [verify, verifyPayload] = useVerifyAccountMutation();

  console.log('verifyPayload : ', verifyPayload);

  useEffect(() => {
    if (!me && !meLoading) {
      return;
    }

    if (verifyPayload.loading || !slug || me?.emailVerified) return;

    verify({
      refetchQueries: [MeDocument],
      awaitRefetchQueries: true,
      variables: {
        input: {
          token: slug as string,
        },
      },
    })
      .then(async (res) => {
        if (res.errors?.length) {
          toast.error(res.errors.join(', '));
          return;
        }

        if (res.data?.verifyAccount.errors?.length) {
          toast.error(
            res.data.verifyAccount.errors.map((e) => e.message).join(', '),
          );
          return;
        }

        if (res.data?.verifyAccount?.account?.emailVerified) {
          toast.success('Account verified successfully!');
          void router.replace('/');
          return;
        }

        toast.success('Something went wrong!');
      })
      .catch((err) => {
        toast.error(err.message ?? 'Something went wrong!');
      });
  }, [slug, me]);

  if (me?.emailVerified && !verifyPayload.called) {
    void router.replace('/404');
    return null;
  }

  if (verifyPayload.loading || mePayload.loading) {
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <Loader />
        </div>
      </div>
    );
  }

  if (!verifyPayload.data?.verifyAccount) {
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <Alert severity="error" variant="filled" className={s.alert}>
            <AlertTitle>Error</AlertTitle>
            <Typography variant="h6" fontWeight={300} align="center">
              Something went wrong!
            </Typography>
          </Alert>
        </div>
      </div>
    );
  }

  if (
    verifyPayload.data?.verifyAccount?.errors &&
    verifyPayload.data.verifyAccount?.errors?.length > 0
  ) {
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <Alert severity="error" variant="filled" className={s.alert}>
            <AlertTitle>Error</AlertTitle>
            <Typography variant="h6" fontWeight={300} align="center">
              {verifyPayload.data.verifyAccount?.errors
                ?.map((e) => e.message)
                .join(', ')}
            </Typography>
          </Alert>
        </div>
      </div>
    );
  }

  if (verifyPayload.data?.verifyAccount.account?.emailVerified) {
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <Typography variant="h3" align="center">
            Account Verification
          </Typography>
        </div>
      </div>
    );
  }

  return null;
};

export default AccountActivation;
