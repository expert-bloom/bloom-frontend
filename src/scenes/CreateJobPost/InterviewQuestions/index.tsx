import React from 'react';

import { Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { type FormValuesType } from 'src/scenes/CreateJobPost';

import s from './interview_q.module.scss';

export const schema = toFormikValidationSchema(z.object({}));

const InterviewQuestions = () => {
  const formik = useFormikContext<FormValuesType>();

  return (
    <div className={s.container}>
      <Typography className={s.step_title} gutterBottom>
        Interview Questions
      </Typography>
    </div>
  );
};

export default InterviewQuestions;
