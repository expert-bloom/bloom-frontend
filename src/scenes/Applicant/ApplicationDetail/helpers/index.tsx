import React from 'react';

import { AlertTitle } from '@mui/lab';
import { Alert } from '@mui/material';

type ColorType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

export enum EachInvestmentPermitStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  REAPPLIED = 'REAPPLIED',
  VERIFIED = 'VERIFIED',
  REVIEWED = 'REVIEWED',
  APPROVED = 'APPROVED',
  NOT_SENT = 'NOT_SENT',
}

const Congratulation = () => {
  return (
    <div>
      <Alert
        severity="success"
        style={{
          width: '80%',
          margin: '5rem auto 0 auto',
          border: '1px solid #4caf50',
        }}
      >
        <AlertTitle>Congratulation</AlertTitle>
        You have Successfully completed all the step required.
      </Alert>
    </div>
  );
};

export const stepsData = [
  {
    title: 'Your Application',
    desc: `and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if`,
    valueEnum: 'company_registration_form',
    key: 'SENT_COMPANY_NAME',
    expand: false,
    form: {
      props: {
        valueEnum: 'company_registration_form',
        title: 'Upload your company registration form',
        handleSubmit: () => null,
      },
      actionComponent: (props: any) => <h1>alskdjfa;skldfja;skldfj</h1>,
    },
  },
  {
    title: 'Interview',
    desc: `and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if`,
    valueEnum: 'memorandum_of_association',
    value: '',
    key: 'SENT_MEMORANDUM_OF_ARTICLES',
    expand: false,
    form: {
      props: {
        title: "Upload Edited Company Name's Memorandum of Association",
        handleSubmit: () => null,
      },
      actionComponent: (props: any) => <h1>alskdjfa;skldfja;skldfj</h1>,
    },
  },

  {
    title: 'Congratulation',
    desc: `and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if`,
    valueEnum: 'service_fee_bank_slip_form',
    key: 'FINISHED',
    expand: true,
    form: {
      props: {
        title: 'Upload your Service Fee Bank Slip',
        handleSubmit: () => null,
      },
      actionComponent: (props: any) => <Congratulation />,
    },
  },
];

export function getStatusTextAndColor(statusData: any) {
  const statusLabel = { label: 'not sent', color: 'secondary' };

  if (!statusData) return statusLabel;

  const { reapplied, status } = statusData;

  // console.log('status --- : ,', status);

  let color: ColorType = 'secondary';

  switch (status) {
    case EachInvestmentPermitStatus.APPROVED:
      color = 'success';
      break;
    case EachInvestmentPermitStatus.PENDING:
    case EachInvestmentPermitStatus.REVIEWED:
    case EachInvestmentPermitStatus.VERIFIED:
      color = 'warning';
      break;
    case EachInvestmentPermitStatus.DECLINED:
      if (reapplied) {
        color = 'info';
      } else color = 'error';
      break;

    case 'FINISHED':
      color = 'info';
      break;
  }

  return statusLabel;
}
