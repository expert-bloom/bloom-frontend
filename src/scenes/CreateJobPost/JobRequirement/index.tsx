import React, { useEffect, useState } from 'react';
import s from './jobrequirment.module.scss';
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { type FormValuesType } from 'src/scenes/CreateJobPost';

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

const jobExperience = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const skillOption = [
  {
    label: 'React.js',
  },
  { label: 'Vue.js' },
  { label: 'php' },
  { label: 'Wordpress' },
  { label: 'C++' },
];

const JobRequirement = () => {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const { gilad, jason, antoine } = state;

  const [languageLevel, setLanguageLevel] = useState([
    { label: 'Fluent', checked: false },
    {
      label: 'Conversational',
      checked: false,
    },
    {
      label: 'Basic',
      checked: false,
    },
  ]);

  const formik = useFormikContext<FormValuesType>();
  const { values, handleChange } = formik;

  useEffect(() => {
    // console.log('job-req formik: ', formik.values);
  }, [values]);

  return (
    <div className={s.container}>
      <Typography className={s.step_title} gutterBottom>
        Job Requirements
      </Typography>

      <Stack spacing={3} direction="row">
        <Stack spacing={0.5} flex="1" justifyContent="space-between">
          <FormLabel>Salary compensation</FormLabel>

          <Autocomplete
            disablePortal
            fullWidth
            options={jobSalaryType}
            sx={{ width: 300 }}
            value={values.compensation}
            onChange={(event, newValue) => {
              void formik.setFieldValue('compensation', newValue).then();
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="compensation"
                label="Compensation"
                fullWidth
                required
              />
            )}
          />
        </Stack>

        <Stack spacing={0.5} flex="1" justifyContent="space-between">
          <FormLabel>Work Location</FormLabel>

          <Autocomplete
            disablePortal
            fullWidth
            options={workLocation}
            sx={{ width: 300 }}
            value={values.location}
            onChange={(event, newValue) => {
              void formik.setFieldValue('location', newValue).then();
            }}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            renderInput={(params) => (
              <TextField
                {...params}
                name="location"
                label="Work Location"
                fullWidth
                required
              />
            )}
          />
        </Stack>
      </Stack>

      <Stack spacing={3} direction="row">
        <Stack spacing={0.5} flex="1" justifyContent="space-between">
          <FormLabel>List of Skills required</FormLabel>

          <Autocomplete
            multiple
            limitTags={3}
            options={skillOption}
            disableCloseOnSelect
            sx={{ width: 500 }}
            // getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            value={values.skill}
            onChange={(event, newValue) => {
              void formik.setFieldValue('skill', newValue);
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                name="skill"
                label="job skills"
                placeholder="Skills"
              />
            )}
          />
        </Stack>

        <Stack spacing={0.5} flex="1" justifyContent="space-between">
          <FormLabel>Job Experience</FormLabel>

          <Autocomplete
            disablePortal
            fullWidth
            options={jobExperience}
            getOptionLabel={(option) => option.toString()}
            // sx={{ width: 300 }}
            value={values.experience}
            onChange={(event, newValue) => {
              void formik.setFieldValue('experience', newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="experience"
                label="Experience"
                fullWidth
                required
              />
            )}
          />
        </Stack>
      </Stack>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">
          What level of English fluency is required?
        </FormLabel>
        <FormGroup>
          {languageLevel.map((item, idx) => (
            <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={item.checked}
                  onChange={(event, checked) => {
                    // uncheck all other options
                    const newLanguageLevel = [...languageLevel];
                    newLanguageLevel[idx].checked = checked;
                    setLanguageLevel(newLanguageLevel);
                  }}
                  name="languageLevel"
                />
              }
              label={item.label}
            />
          ))}
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">
          What other languages are required? (optional)
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={gilad} name="gilad" />}
            label="Spanish"
          />
          <FormControlLabel
            control={<Checkbox checked={jason} name="jason" />}
            label="French"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={antoine}
                onChange={handleChange}
                name="antoine"
              />
            }
            label="Other"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default JobRequirement;
