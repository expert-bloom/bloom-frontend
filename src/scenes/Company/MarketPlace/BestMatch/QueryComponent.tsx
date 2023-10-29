/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React from 'react';

import { type OperationVariables } from '@apollo/client/core';
import { type useQuery } from '@apollo/client/react/hooks/useQuery';
import { Alert, AlertTitle, Typography } from '@mui/material';

import Loader from '@/components/Loader';
import s from '@/scenes/Company/MarketPlace/marketplace.module.scss';

interface Props<
  TData = any,
  QVariables extends OperationVariables = OperationVariables,
> {
  // data: ReturnType<typeof useQuery<TData, QVariables>>;
  data: ReturnType<typeof useQuery<TData, QVariables>>;
  children: (data: Props['data']) => React.ReactNode;
  errorMessage?: string;
  error?: boolean;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
}

const QueryComponent = ({
  children,
  data,
  errorMessage,
  error,
  loading,
  loadingComponent,
}: Props<any>) => {
  if (data.loading || loading) {
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.loading}>{loadingComponent ?? <Loader />}</div>
        </div>
      </div>
    );
  }

  if (data.error || error) {
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.loading}>
            <Alert severity="error" className={s.alert}>
              <AlertTitle>
                <Typography variant="h5">Unexpected error.</Typography>
              </AlertTitle>
              <Typography>{errorMessage ?? data?.error?.message}</Typography>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  return <div>{children(data)}</div>;
};

export default QueryComponent;
