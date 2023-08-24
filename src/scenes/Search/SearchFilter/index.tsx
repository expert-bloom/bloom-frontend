import React from 'react';

import {
  FilterAltOutlined,
  LocationOn,
  SettingsApplications,
  Work,
} from '@mui/icons-material';
import {
  Autocomplete,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Icon,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { darken, lighten, styled } from '@mui/material/styles';

import { JobType } from '@/graphql/client/gql/schema';
import { useCountriesWithRegion } from '@/scenes/Search/SearchFilter/country-list';
import { useIndustry } from '@/scenes/Search/SearchFilter/industry-list';
import { capitalize } from '@/utils';

import s from './filter.module.scss';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '8px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.35)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

const Filter = () => {
  const industry = useIndustry();
  const countryListOptions = useCountriesWithRegion();

  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

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
        <FormControl>
          <FormLabel htmlFor="indestry">Industry ( category )</FormLabel>
          <Autocomplete
            id="indestry"
            disablePortal
            fullWidth
            multiple
            disableCloseOnSelect
            options={industry}
            getOptionLabel={(option) => option.label}
            groupBy={(option) => option.title}
            onChange={(event, newValue) => {
              // formik.setFieldValue('type', newValue).then();
            }}
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                name="type"
                label="Search industry"
                placeholder="type ..."
                fullWidth
                required
              />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Experience level</FormLabel>
          <FormGroup>
            {['Beginner', 'Intermediate', 'Expert'].map((label, idx) => (
              <FormControlLabel
                key={idx}
                control={
                  <Checkbox
                    checked={gilad}
                    onChange={handleChange}
                    name={label.toLowerCase()}
                  />
                }
                label={label}
              />
            ))}
          </FormGroup>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="job-type">Job type</FormLabel>

          <Autocomplete
            id="job-type"
            disablePortal
            fullWidth
            multiple
            disableCloseOnSelect
            options={Object.values(JobType).map((jt) => ({
              label: jt,
            }))}
            getOptionLabel={(option) =>
              capitalize(option.label.toLowerCase()).replace('_', '-')
            }
            onChange={(event, newValue) => {
              // formik.setFieldValue('type', newValue).then();
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="type"
                placeholder="type ..."
                fullWidth
                required
              />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="location">Location</FormLabel>

          <Autocomplete
            id="location"
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
        </FormControl>
      </div>
    </Card>
  );
};

export default Filter;
