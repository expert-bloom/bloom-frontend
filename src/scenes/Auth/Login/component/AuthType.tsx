import React from 'react';

import {
  AccountCircleTwoTone,
  ContentPasteSearchTwoTone,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import clsx from 'clsx';
import { useFormikContext } from 'formik';

import { type RegisterFormValuesType } from 'src/scenes/Auth/Register';

import s from '../signin.module.scss';

const aType = [
  {
    label: "I'm a client, hiring for a project",
    value: 'client',
    checked: false,
    Icon: AccountCircleTwoTone,
  },
  {
    label: "I'm a freelancer, looking for work",
    value: 'freelancer',
    checked: false,
    Icon: ContentPasteSearchTwoTone,
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
              <Typography variant="body1" className={s.label}>
                {type.label}
              </Typography>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default AuthType;
