import React from 'react';

import { Edit } from '@mui/icons-material';
import {
  Alert,
  Chip,
  FormLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import { useFormikContext } from 'formik';

import { type FormValuesType } from '@/scenes/Company/CreateJobPost';

import s from './review.module.scss';

const Review = () => {
  const formik = useFormikContext<FormValuesType>();
  const { values, handleChange } = formik;

  return (
    <div className={s.container}>
      <Typography className={s.step_title} gutterBottom>
        Review Job Post
      </Typography>

      <Alert severity="info">
        <Typography className={s.alert}>
          The job post will be visible to agents for 20 days, and they can apply
          for the position. You can update your job post’s visibility at any
          time.
        </Typography>
      </Alert>

      <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
        <FormLabel sx={{ ml: '1rem' }}>Job Post Title</FormLabel>
        <TextField
          name="title"
          required
          fullWidth
          label="Job Title"
          value={values.title}
          placeholder="not provided"
          onChange={handleChange}
        />
      </Stack>

      <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
        <FormLabel sx={{ ml: '1rem' }}>Job Post Description</FormLabel>
        <TextField
          name="title"
          required
          fullWidth
          label="Job Title"
          value={values.description}
          placeholder="not provided"
          onChange={handleChange}
          multiline={true}
          rows={2}
        />
      </Stack>

      <div className={s.column}>
        <div className={s.row}>
          <div className={s.item}>
            <header>
              <Typography>Job Type</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              {values.jobType ?? 'Not selected (required)'}
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Number of Hires Needed</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              {values.vacancy ?? 'Not selected (required)'}
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Skills Required</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              {values.skill.length > 0 ? (
                values.skill.map((s) => s.label).join(', ')
              ) : (
                <Typography variant="body1" className={s.value}>
                  Not selected (required)
                </Typography>
              )}
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>English Fluency Level</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              {values.englishLevel ?? 'Not selected (required)'}
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Other Languages Required </Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <div className={clsx([s.value, s.other_lang])}>
              {formik.values.otherLanguages.map((otherLang, index) => (
                <Chip
                  key={index}
                  label={otherLang.language + ' - ' + otherLang.level}
                  className={s.chip}
                  variant="outlined"
                />
              ))}
            </div>
          </div>
        </div>

        <div className={s.row}>
          <div className={s.item}>
            <header>
              <Typography>Email</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              {values.email ?? 'Not selected (required)'}
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Application Deadline</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              {(Boolean(values.deadline) &&
                new Date(values.deadline as any).toDateString()) ??
                'Not selected (required)'}
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Salary Amount (Range)</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              {values.salary.length > 0
                ? values.salary.join(' - ')
                : 'Not selected (required)'}
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Salary Compensation</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              {values.salaryType ?? 'Not selected (required)'}
            </Typography>
          </div>

          <div className={s.item}>
            <header>
              <Typography>Experience (year)</Typography>
              <IconButton className={s.edit_btn} size="small">
                <Edit fontSize="small" />
              </IconButton>
            </header>
            <Typography variant="body1" className={s.value}>
              {values.experience ?? 'Not selected (required)'}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
