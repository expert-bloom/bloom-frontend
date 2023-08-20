import React from 'react';

import {
  Autocomplete,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { EnglishLevel } from '@/graphql/client/gql/schema';
import { useCountries } from '@/scenes/Search/SearchFilter/country-list';
import { useIndustry } from '@/scenes/Search/SearchFilter/industry-list';
import { capitalize } from '@/utils';

import s from './profileinfo.module.scss';

const ProfileInfo = () => {
  const countryListOptions = useCountries();
  const industry = useIndustry();

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Stack>
          <fieldset className={s.wrap}>
            <legend>
              <Typography variant="h6">Profile</Typography>
            </legend>

            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>About</FormLabel>
              <TextField
                name="about"
                required
                fullWidth
                // label="Job Description"
                multiline
                rows={2}
                // onChange={handleChange}
                // value={values.description}
                // error={Boolean(formik.errors.description)}
                // helperText={formik.errors.description as string}
              />
            </Stack>

            <Stack>
              <FormLabel>Job Position</FormLabel>
              <TextField
                name="description"
                // disabled
                required
                fullWidth
                // label="Job Description"
                // onChange={handleChange}
                // value={values.description}
                // error={Boolean(formik.errors.description)}
                // helperText={formik.errors.description as string}
              />
            </Stack>

            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>Salary Expectation</FormLabel>
              <TextField
                name="description"
                type="number"
                required
                fullWidth
                label="Job Description"
                // onChange={handleChange}
                // value={values.description}
                // error={Boolean(formik.errors.description)}
                // helperText={formik.errors.description as string}
              />
            </Stack>

            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>Work Experience</FormLabel>
              <Slider
                valueLabelDisplay="auto"
                defaultValue={0}
                step={1}
                min={0}
                max={10}
                marks={true}
                // getAriaValueText={valuetext}
              />
              <FormLabel>6 Years</FormLabel>
            </Stack>

            <Autocomplete
              disablePortal
              fullWidth
              options={countryListOptions}
              getOptionLabel={(option) => option.label}
              groupBy={(option) => option.type}
              // sx={{ width: 300 }}
              // value={values.type}
              onChange={(event, newValue) => {
                // formik.setFieldValue('type', newValue).then();
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="type"
                  label="Location"
                  fullWidth
                  required
                />
              )}
            />

            <FormControl>
              <FormLabel htmlFor="indestry">Skills</FormLabel>
              <Autocomplete
                id="indestry"
                disablePortal
                // readOnly
                fullWidth
                multiple
                disableCloseOnSelect
                options={industry}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  // formik.setFieldValue('type', newValue).then();
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // disabled
                    name="type"
                    // label="Search industry"
                    placeholder="type ..."
                    fullWidth
                    required
                  />
                )}
              />
            </FormControl>

            <Stack gap={0.5} flex="1">
              <FormLabel htmlFor="eng-level">
                Level of English fluency
              </FormLabel>

              <Select
                id="eng-level"
                name="englishLevel"
                // onChange={formik.handleChange}
                // value={formik.values.englishLevel}
              >
                {Object.values(EnglishLevel).map((value, idx) => (
                  <MenuItem value={value} key={idx}>
                    {capitalize(value.toLowerCase()).replace('_', '-')}
                  </MenuItem>
                ))}
              </Select>
            </Stack>

            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>Accomplishment</FormLabel>
              <TextField
                name="description"
                required
                fullWidth
                // label="Job Description"
                multiline
                rows={4}
                // onChange={handleChange}
                // value={values.description}
                // error={Boolean(formik.errors.description)}
                // helperText={formik.errors.description as string}
              />
            </Stack>
          </fieldset>
        </Stack>
      </div>
    </div>
  );
};

export default ProfileInfo;
