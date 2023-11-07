import React, { useEffect } from 'react';

import {
  Autocomplete,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input';

import {
  type NestedOnSubmit,
  type StepProps,
} from '@/scenes/Applicant/Profile/data';
import { useCompanyProfileSettingFormContext } from '@/scenes/Company/CompanyProfile';
import { useCountries } from '@/scenes/JobList/SearchFilter/usecountries';

import s from './contact_info.module.scss';

const ITEM_HEIGHT = 88;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProfileInfo = ({ stepUtil }: StepProps) => {
  const countryListOptions = useCountries();
  const { formik } = useCompanyProfileSettingFormContext();
  const { values, handleChange } = formik;

  const onSubmit: NestedOnSubmit = async (values) => {
    return values;
  };

  useEffect(() => {
    stepUtil.current = {
      onSubmit,
    };

    return () => {
      stepUtil.current = {
        onSubmit: () => false,
      } as any;
    };
  }, []);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Stack>
          <fieldset className={s.wrap}>
            <legend>
              <Typography variant="h6">Contact Information</Typography>
            </legend>
            <Stack direction="row" gap=".5rem">
              <Stack flex="1">
                <FormLabel htmlFor="first">First Name</FormLabel>
                <TextField
                  id="first"
                  name="account.firstName"
                  // disabled
                  fullWidth
                  onChange={handleChange}
                  value={values.account.firstName}
                  error={Boolean(formik.errors.account?.firstName)}
                  helperText={formik.errors.account?.firstName}
                />
              </Stack>

              <Stack flex="1">
                <FormLabel htmlFor="fullname">Last Name</FormLabel>
                <TextField
                  name="account.lastName"
                  fullWidth
                  onChange={handleChange}
                  value={values.account.lastName}
                  error={Boolean(formik.errors.account?.lastName)}
                  helperText={formik.errors.account?.lastName}
                />
              </Stack>
            </Stack>

            <Stack flex="1">
              <FormLabel htmlFor="fullname">Phone number</FormLabel>

              <MuiTelInput
                // label="phone no"
                name="account.phone"
                placeholder={Array(15).fill('_').join(' ')}
                value={values.account.phone}
                // onlyCountries={['ET']}
                defaultCountry="US"
                fullWidth
                forceCallingCode
                focusOnSelectCountry
                MenuProps={MenuProps}
                onChange={(value, info) => {
                  console.log('value: ', info);
                  void formik.setFieldValue('account.phone', value);
                }}
                error={Boolean(
                  values.account.phone &&
                    !matchIsValidTel(values.account.phone),
                )}
                helperText={
                  values.account.phone && !matchIsValidTel(values.account.phone)
                    ? 'phone number is invalid'
                    : ''
                }
              />
            </Stack>

            <Stack direction="row" gap=".5rem">
              <Stack flex="1">
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="account.email"
                  name="email"
                  // disabled
                  fullWidth
                  onChange={handleChange}
                  value={values.account.email}
                  error={Boolean(formik.errors.account?.email)}
                  helperText={formik.errors.account?.email as string}
                />
              </Stack>
              <FormControl sx={{ flex: '1' }}>
                <FormLabel>Location</FormLabel>
                <Autocomplete
                  disablePortal
                  fullWidth
                  options={countryListOptions}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) =>
                    option.label === value.label
                  }
                  value={{ label: values.applicant.location }}
                  onChange={(event, newValue) => {
                    void formik.setFieldValue(
                      'applicant.location',
                      newValue?.label ?? '',
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="applicant.location"
                      fullWidth
                    />
                  )}
                />
              </FormControl>
            </Stack>
          </fieldset>
        </Stack>

        <Stack>
          <fieldset className={s.wrap}>
            <legend>
              <Typography variant="h6">Links</Typography>
            </legend>
            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>Linkedin</FormLabel>
              <TextField
                name="applicant.linkedin"
                type="text"
                fullWidth
                onChange={handleChange}
                value={values.applicant.linkedin}
                error={Boolean(formik.errors.applicant?.linkedin)}
                helperText={formik.errors.applicant?.linkedin as string}
              />
            </Stack>

            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>Company Website</FormLabel>
              <TextField
                name="applicant.portfolio"
                type="text"
                fullWidth
                onChange={handleChange}
                value={values.applicant.portfolio}
                error={Boolean(formik.errors.applicant?.portfolio)}
                helperText={formik.errors.applicant?.portfolio as string}
              />
            </Stack>
          </fieldset>
        </Stack>
      </div>
    </div>
  );
};

export default ProfileInfo;
