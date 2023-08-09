import React, { useEffect, useState } from 'react';
import s from './jobdetails.module.scss';
import {
  Autocomplete,
  FormLabel,
  InputAdornment,
  Slider,
  type SliderProps,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment/moment';
import { DateRangeSharp } from '@mui/icons-material';
import { useFormikContext } from 'formik';
import { motion } from 'framer-motion';
import { type FormValuesType } from 'src/scenes/CreateJobPost';
import debounce from '@mui/utils/debounce';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const jobTypeOptions = [
  { label: 'Full-time' },
  {
    label: 'Part-time',
  },
  { label: 'Internship' },
  { label: 'Contract' },
];

const jobCategoryOptions = [
  { label: 'Sales' },
  {
    label: 'Marketing',
  },
  { label: 'IT' },
  { label: 'Frontend' },
  { label: 'Backend' },
  { label: 'Fullstack' },
];

const minDistance = 10;

export const schema = toFormikValidationSchema(
  z.object({
    vacancy: z.number().min(1).max(100),
    description: z
      .string()
      .nonempty()
      .min(10, 'Too short description')
      .max(500, 'Too long description'),
  }),
);

const JobDetails = () => {
  const formik = useFormikContext<FormValuesType>();
  const { values, handleChange } = formik;

  const [priceRange, setPriceRange] = React.useState<number[]>([20, 37]);
  const [labelDisplay, setValueLabelDisplay] =
    useState<SliderProps['valueLabelDisplay']>('auto');

  useEffect(() => {
    // console.log('formik: ', formik);
  }, [values]);

  const priceRangeOnChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      void formik
        .setFieldValue('salary', [
          Math.min(newValue[0], priceRange[1] - minDistance),
          priceRange[1],
        ])
        .then();
    } else {
      void formik
        .setFieldValue('salary', [
          priceRange[0],
          Math.max(newValue[1], priceRange[0] + minDistance),
        ])
        .then();
    }
  };

  // debounce the price range slider by 300ms
  const debouncedPriceRangeOnChange = React.useCallback(
    debounce(priceRangeOnChange, 300),
    [],
  );

  return (
    <div className={s.container}>
      <Typography className={s.step_title} gutterBottom>
        Job Details
      </Typography>

      <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
        <FormLabel>
          Job Title <span>(this will be the public view of your job post)</span>
        </FormLabel>
        <TextField
          name="title"
          required
          fullWidth
          label="Job Title"
          value={values.title}
          onChange={handleChange}
        />
      </Stack>

      <Stack spacing={3} direction="row">
        <Stack spacing={0.5} flex="1">
          <FormLabel>What type of Job is this?</FormLabel>

          <Autocomplete
            disablePortal
            fullWidth
            options={jobTypeOptions}
            sx={{ width: 300 }}
            value={values.type}
            onChange={(event, newValue) => {
              void formik.setFieldValue('type', newValue).then();
            }}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            renderInput={(params) => (
              <TextField
                {...params}
                name="type"
                label="Job Type"
                fullWidth
                required
              />
            )}
          />
        </Stack>

        <Stack spacing={0.5} flex="1" justifyContent="space-between">
          <FormLabel>What Category are you looking for? (max 5)</FormLabel>

          <Autocomplete
            disablePortal
            fullWidth
            sx={{ width: 300 }}
            multiple
            options={jobCategoryOptions}
            isOptionEqualToValue={(option, value) => {
              // console.log('option: ', option, 'value: ', value);
              return option.label === value.label;
            }}
            // getOptionLabel={(option) => option.label}
            value={values.category}
            onChange={(event, newValue) => {
              void formik.setFieldValue('category', newValue).then();
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="category"
                label="Job Category"
                fullWidth
                // required
              />
            )}
          />
        </Stack>
      </Stack>

      <Stack spacing={3} direction="row">
        <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
          <FormLabel>How many people are you looking to hire?</FormLabel>
          <TextField
            name="vacancy"
            label="Vacancies"
            type="number"
            required
            fullWidth
            onChange={handleChange}
            value={values.vacancy}
            error={Boolean(formik.errors.vacancy)}
            helperText={formik.errors.vacancy as string}
          />
        </Stack>

        <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
          <FormLabel>Enter applications deadline (optional)</FormLabel>
          <DatePicker
            disablePast
            value={values.deadline ?? null}
            // minDate={moment()}
            defaultValue={moment()}
            maxDate={moment().add(15, 'days').toDate() as any}
            label="Deadline Date"
            // inputFormat="dd-m-yyyy"
            onChange={(date) => {
              // console.log( 'date: ', moment( date ).format( 'YYYY-MM-DD' ) );
              void formik.setFieldValue(
                'deadline',
                date, // moment(date).format('YYYY-MM-DD'),
              );
            }}
            slotProps={{
              textField: {
                name: 'Deadline',
                required: true,
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="start">
                      <DateRangeSharp />
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
        </Stack>
      </Stack>

      <Stack spacing={3} direction="row">
        <motion.div
          className={s.ver}
          onHoverStart={() => {
            setValueLabelDisplay('on');
          }}
          onHoverEnd={() => {
            setValueLabelDisplay('auto');
          }}
        >
          <FormLabel>What is the salary range?</FormLabel>

          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={values.salary}
            onChange={debouncedPriceRangeOnChange}
            valueLabelDisplay={labelDisplay}
            valueLabelFormat={(x) => `$ ${x}`}
            disableSwap
          />
        </motion.div>

        <Stack spacing={0.5} flex="1" justifyContent="space-between">
          <FormLabel>Contact Email Address</FormLabel>

          <TextField
            name="email"
            required
            fullWidth
            label="Email"
            type="email"
            onChange={handleChange}
            value={values.email}
          />
        </Stack>
      </Stack>

      <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
        <FormLabel>Job Description</FormLabel>
        <TextField
          name="description"
          required
          fullWidth
          label="Job Description"
          multiline
          rows={4}
          onChange={handleChange}
          value={values.description}
          error={Boolean(formik.errors.description)}
          helperText={formik.errors.description as string}
        />
      </Stack>
    </div>
  );
};

export default JobDetails;
