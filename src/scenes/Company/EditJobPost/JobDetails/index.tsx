import React, { useEffect, useState } from 'react';

import { DateRangeSharp } from '@mui/icons-material';
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useFormikContext } from 'formik';
import moment from 'moment/moment';
import { useSession } from 'next-auth/react';
import invariant from 'ts-invariant';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import {
  JobSite,
  JobType,
  SalaryType,
  useGetCompaniesQuery,
} from '@/graphql/client/gql/schema';
import { type FormValuesType } from '@/scenes/Company/CreateJobPost';
import { useProfileSettingFormContext } from '@/scenes/Company/EditJobPost';
import { capitalize } from '@/utils';

import s from './jobdetails.module.scss';

const jobTypeOptions = Object.keys(JobType).map((key) => ({
  label: key,
}));

const jobCategoryOptions = [
  { label: 'Sales' },
  {
    label: 'Marketing',
  },
  { label: 'IT' },
];

const jobSalaryType = [
  {
    label: 'Monthly',
  },
  { label: 'Hourly' },
  { label: 'Contractual' },
];

const workLocation = [
  {
    label: 'Remote',
  },
  { label: 'Onsite' },
  { label: 'Hybrid' },
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

    // salary: z.union([z.tuple([z.number(), z.number()]), z.number()]),
  }),

  // salary type, monthly, hourly, contractual
);

const JobDetails = () => {
  const { formik } = useProfileSettingFormContext();
  const { values, handleChange } = formik;
  const [isFixed, setIsFixed] = useState(true);
  const { data: session } = useSession();
  const { data: companies } = useGetCompaniesQuery();

  useEffect(() => {
    // console.log('formik: ', formik.values);
  }, [values]);

  const inputProps = {
    InputProps: {
      endAdornment: <InputAdornment position="start">$</InputAdornment>,
    },
  };

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

      {session?.user?.accountType === 'AFFILIATE' && (
        <Stack spacing={0.5} flex="1">
          <FormControl fullWidth>
            <InputLabel id="company">Affiliate Company</InputLabel>

            {/* todo: change this to async field */}
            <Select
              id="company"
              value={formik.values.companyId}
              onChange={formik.handleChange}
              required
              name="companyId"
              placeholder="Select Your Affiliate Company"
            >
              {companies?.getCompanies.map((company, idx) => (
                <MenuItem value={company.id} key={idx}>
                  {company.companyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      )}

      <Stack spacing={3} direction="row">
        <Stack spacing={0.5} flex="1">
          <FormLabel>What type of Job is this?</FormLabel>

          <Select
            required
            value={formik.values.jobType}
            onChange={formik.handleChange}
            name="jobType"
          >
            {Object.values(JobType).map((lang, idx) => (
              <MenuItem value={lang} key={idx}>
                {capitalize(lang.toLowerCase()).replace('_', '-')}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        <Stack spacing={0.5} flex="1" justifyContent="space-between">
          <FormLabel>Category</FormLabel>
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
                // value={values.category}
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
        <Stack spacing={0.5} flex="1" justifyContent="space-between">
          <FormLabel>Salary Type</FormLabel>

          <Select
            value={formik.values.salaryType}
            onChange={formik.handleChange}
            name="salaryType"
          >
            {Object.values(SalaryType).map((value, idx) => (
              <MenuItem value={value} key={idx}>
                {capitalize(value.toLowerCase()).replace('_', '-')}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        <Stack spacing={0.5} flex="1" justifyContent="space-between">
          <FormLabel>Work Location</FormLabel>

          <Select
            value={formik.values.jobSite}
            onChange={formik.handleChange}
            name="jobSite"
          >
            {Object.values(JobSite).map((value, idx) => (
              <MenuItem value={value} key={idx}>
                {capitalize(value.toLowerCase()).replace('_', '-')}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      <Stack spacing={3} direction="row" alignItems="center">
        <Stack spacing={0.5} flex="1">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormLabel>Salary</FormLabel>
            <FormControlLabel
              sx={{ mr: '.6rem' }}
              control={<Switch size="small" checked={isFixed} />}
              label={<Typography variant="body2">Fixed</Typography>}
              labelPlacement="start"
              onChange={(event, checked) => {
                setIsFixed(checked);
                console.log('event: ', event);
              }}
            />
          </Stack>

          {isFixed ? (
            <TextField
              name="salary"
              required
              fullWidth
              label="Salary"
              type="number"
              onChange={(value) => {
                void formik.setFieldValue('salary', [value.target.value]);
              }}
              value={values.salary[0]}
              {...inputProps}
            />
          ) : (
            <Stack direction="row" gap={1}>
              <TextField
                name="salary"
                required
                fullWidth
                label="From"
                type="number"
                onChange={(value) => {
                  void formik.setFieldValue('salary', [
                    value.target.value,
                    values.salary[1],
                  ]);
                }}
                value={values.salary[0]}
                {...inputProps}
              />
              <TextField
                name="salary"
                required
                fullWidth
                label="To"
                type="number"
                onChange={(value) => {
                  void formik.setFieldValue('salary', [
                    values.salary[0],
                    value.target.value,
                  ]);
                }}
                value={values.salary[1]}
                {...inputProps}
              />
            </Stack>
          )}
        </Stack>

        <Stack spacing={0.5} flex="1" justifyContent="flex-start">
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
    </div>
  );
};

export default JobDetails;
