import React from 'react';

import {
  AccountCircleTwoTone,
  Badge,
  ContentPasteSearchTwoTone,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { Button, Chip, Typography } from '@mui/material';
import clsx from 'clsx';
import { useFormikContext } from 'formik';

import { AccountType } from '@/graphql/client/gql/schema';
import { type RegisterFormValuesType } from '@/scenes/Auth/SignUp';

import s from '../signup.module.scss';

const aType = [
  {
    label: "I'm a client, hiring for a project",
    value: AccountType.Company,
    checked: false,
    Icon: AccountCircleTwoTone,
  },
  {
    label: "I'm an applicant, looking for work",
    value: AccountType.Applicant,
    checked: false,
    Icon: ContentPasteSearchTwoTone,
  },
  {
    label: "I'm a recruiter, looking for applicants",
    value: AccountType.Affiliate,
    checked: false,
    Icon: Badge,
  },
];

const AuthType = () => {
  const formik = useFormikContext<RegisterFormValuesType>();

  // console.log('formik : ', formik);

  return (
    <div className={s.auth_type}>
      <header>
        <Typography variant="h4" className={s.title}>
          Join as a Client or Freelancer
        </Typography>
      </header>

      <div className={s.auth_type__buttons}>
        {aType.map((type) => {
          const selected = type.value === formik.values.type;
          return (
            <Button
              color={selected ? 'primary' : 'inherit'}
              className={clsx([s.item, selected && s.selected])}
              key={type.label}
              onClick={() => {
                void formik.setFieldValue('type', type.value).then();
                formik.setFieldTouched('type', true);
              }}
            >
              {selected ? (
                <RadioButtonChecked color="primary" className={s.radio} />
              ) : (
                <RadioButtonUnchecked className={s.radio} />
              )}

              <type.Icon className={s.icon} fontSize="large" />
              <Typography
                variant="body1"
                className={s.label}
                color={selected ? 'red' : 'gray'}
              >
                {type.label}
              </Typography>

              <Chip
                className={s.chip}
                label={type.value}
                size="small"
                variant={selected ? 'filled' : 'outlined'}
                color={selected ? 'primary' : 'default'}
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default AuthType;
