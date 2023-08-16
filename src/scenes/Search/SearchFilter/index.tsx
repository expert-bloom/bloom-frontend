import React, { useMemo } from 'react';

import { FilterAltOutlined } from '@mui/icons-material';
import {
  Autocomplete,
  Card,
  FormLabel,
  Icon,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import countryList from 'react-select-country-list';

import s from './filter.module.scss';

const Filter = () => {
  const cl = useMemo(() => countryList().getData(), []);

  const countryListOptions = cl.map((option) => {
    // const firstLetter = option.title[0].toUpperCase();
    return {
      type: 'sub-region',
      ...option,
    };
  });

  return (
    <Card elevation={0} className={s.left}>
      <header>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h5" color="gray">
            Filter By
          </Typography>

          <Icon>
            <FilterAltOutlined />
          </Icon>
        </Stack>
      </header>

      <div className={s.filters}>
        <FormLabel htmlFor="indestry">Industry ( category )</FormLabel>
        <Autocomplete
          id="indestry"
          disablePortal
          fullWidth
          options={countryListOptions}
          // getOptionLabel={(option) => option.label}
          // groupBy={(option) => option.type}
          // sx={{ width: 300 }}
          // value={values.type}
          onChange={(event, newValue) => {
            // formik.setFieldValue('type', newValue).then();
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              /* InputProps={{
                startAdornment: (
                  <InputAdornment position='end'>
                    <Search />
                  </InputAdornment>
                ),
              }} */
              name="type"
              label="Search industry"
              fullWidth
              required
            />
          )}
        />

        <Autocomplete
          disablePortal
          fullWidth
          options={['Fixed-Price', 'Hourly']}
          // sx={{ width: 300 }}
          // value={values.type}
          onChange={(event, newValue) => {
            // formik.setFieldValue('type', newValue).then();
          }}
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
        <Autocomplete
          disablePortal
          fullWidth
          options={['Fixed-Price', 'Hourly']}
          // sx={{ width: 300 }}
          // value={values.type}
          onChange={(event, newValue) => {
            // formik.setFieldValue('type', newValue).then();
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name="type"
              label="Salary"
              fullWidth
              required
            />
          )}
        />
        <Autocomplete
          disablePortal
          fullWidth
          options={['Fixed-Price', 'Hourly']}
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
      </div>
    </Card>
  );
};

export default Filter;
