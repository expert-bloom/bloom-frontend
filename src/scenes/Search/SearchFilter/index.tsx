import React from 'react';

import { FilterAltOutlined } from '@mui/icons-material';
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

import { ExperienceLevel, JobType } from '@/graphql/client/gql/schema';
import { useFilterContext } from '@/scenes/Search';
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

  const { filter } = useFilterContext();

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
          <FormLabel htmlFor="industry">Industry ( category )</FormLabel>
          <Autocomplete
            id="industry"
            disablePortal
            fullWidth
            multiple
            disableCloseOnSelect
            options={industry}
            getOptionLabel={(option) => option.label}
            groupBy={(option) => option.title}
            value={filter.values.industry.map((v) => ({
              label: v,
              title: v,
            }))}
            isOptionEqualToValue={(option, value) => {
              return option.label === value.label;
            }}
            onChange={(event, newValue) => {
              void filter.setFieldValue(
                'industry',
                newValue.map((v) => v.label),
              );
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
                name="industry"
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
          <FormGroup row>
            {Object.values(ExperienceLevel).map((label, idx) => (
              <FormControlLabel
                key={idx}
                name="experienceLevel"
                value={label}
                label={label}
                control={
                  <Checkbox
                    checked={filter.values.experienceLevel.includes(label)}
                    onChange={filter.handleChange}
                    name="experienceLevel"
                  />
                }
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
            value={filter.values.jobType.map((v) => ({
              label: v,
            }))}
            isOptionEqualToValue={(option, value) => {
              return option.label === value.label;
            }}
            onChange={(event, newValue) => {
              void filter.setFieldValue(
                'jobType',
                newValue.map((j) => j.label),
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="jobType"
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
            multiple
            options={countryListOptions}
            getOptionLabel={(option) => option.label}
            groupBy={(option) => option.type}
            disableCloseOnSelect
            value={filter.values.location.map((v) => ({
              label: v,
              type: v,
              value: v,
            }))}
            isOptionEqualToValue={(option, value) => {
              return option.label === value.label;
            }}
            onChange={(event, newValue) => {
              void filter.setFieldValue(
                'location',
                newValue.map((j) => j.label),
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="location"
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
