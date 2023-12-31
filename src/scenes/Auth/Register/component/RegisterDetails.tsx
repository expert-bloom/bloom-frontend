import React, { useEffect, useState } from 'react';

import {
  ArrowCircleLeft,
  CheckCircleTwoTone,
  CorporateFare,
  GitHub,
  Person,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Alert,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { countries } from 'countries-list';
import { useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import GoogleIcon from '@/components/Icons/Google';
import { MoButton } from '@/components/MoButton';
import { AccountType } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import useSocialAuth from '@/scenes/Auth/useSocialAuth';
import { type RegisterFormValuesType } from 'src/scenes/Auth/Register';

import s from '../signup.module.scss';

const RegisterDetails = ({ onReturn }: any) => {
  const { me, mePayload } = useMe();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormikContext<RegisterFormValuesType>();
  const { values, handleChange } = formik;
  const router = useRouter();
  const { withSocial } = useSocialAuth();

  const [errorMsg, setErrorMsg] = useState<string>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (me?.id) return;

    window.onmessage = (event: Record<string, any>) => {
      // console.log('onmessage event : --- ', event.data);
      if (event.data.type === 'auth') {
        if (event.data.status === 'success') {
          router.reload();
          return;

          void mePayload
            .refetch()
            .then((res) => {
              if (res.data.me?.id) {
                toast.success('Logged in successfully!');
              }
            })
            .catch((err) => {
              console.log('err : ', err);
            });
        } else if (event.data.status === 'error') {
          formik.setSubmitting(false);
          setErrorMsg(event.data.message);
        }
      }
    };

    return () => {
      window.onmessage = null;
    };
  }, []);

  if (me?.id) {
    void router.push('/');
    return null;
  }

  const PasswordAdornment = () => (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => {
          setShowPassword((show) => !show);
        }}
        onMouseDown={(event) => {
          event.preventDefault();
        }}
        edge="end"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <div className={s.auth_detail}>
      <header>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            onClick={() => {
              onReturn?.();
            }}
          >
            <ArrowCircleLeft />
          </IconButton>
          <Typography variant="h4" className={s.title}>
            {formik.values.type === AccountType.Applicant
              ? 'Sign up to find work you love'
              : 'Sign up to hire talent'}
          </Typography>
        </Stack>
      </header>

      <MoButton
        // onClick={handleNext}
        motionProps={{
          whileHover: {
            scale: 1.01,
          },
          whileTap: {
            scale: 0.97,
          },
        }}
        variant="outlined"
        disabled={formik.isSubmitting}
        loading={formik.isSubmitting}
        startIcon={<GoogleIcon />}
        fullWidth
        onClick={() => {
          formik.setSubmitting(true);
          withSocial('signup', 'google', formik.values.type);
        }}
      >
        Continue with Google
      </MoButton>

      <MoButton
        disabled
        variant="outlined"
        loading={formik.isSubmitting}
        startIcon={<GitHub />}
        fullWidth
      >
        Continue with Github
      </MoButton>

      {Boolean(errorMsg) && (
        <Alert severity="error" variant="outlined" className={s.alert}>
          <Typography variant="body1">{errorMsg}</Typography>
        </Alert>
      )}

      <div className={s.or}>
        <Typography variant="body1">or</Typography>
      </div>

      <Stack direction="row" spacing={2}>
        <TextField
          required
          fullWidth
          name="firstName"
          label="First name"
          type="text"
          variant="outlined"
          value={values.firstName}
          onChange={handleChange}
          error={Boolean(
            Array.isArray(formik.errors.firstName) &&
              (formik.errors.firstName as any),
          )}
          helperText={
            formik.errors.firstName ?? (formik.errors.firstName as any)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          required
          name="lastName"
          label="Last name"
          type="text"
          fullWidth
          variant="outlined"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={Boolean(
            Array.isArray(formik.errors.lastName) &&
              (formik.errors.lastName as any),
          )}
          helperText={formik.errors.lastName ?? (formik.errors.lastName as any)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextField
          required
          name="password"
          label="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={values.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: <PasswordAdornment />,
          }}
        />

        <TextField
          required
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          value={values.confirmPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <CheckCircleTwoTone
                color={
                  Boolean(values.password) &&
                  values.password === values.confirmPassword
                    ? 'primary'
                    : 'inherit'
                }
              />
            ),
          }}
          error={Boolean(formik.errors.confirmPassword as any)}
          helperText={
            formik.errors.confirmPassword ??
            (formik.errors.confirmPassword as any)
          }
        />
      </Stack>

      <TextField
        name="email"
        value={values.email}
        onChange={handleChange}
        error={!!formik.errors.email}
        helperText={formik.errors.email}
        label="Email"
        variant="outlined"
        required
        fullWidth
      />

      <Stack direction="row" spacing={2}>
        {values.type === 'COMPANY' && (
          <TextField
            required
            name="companyName"
            label="Company Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            error={!!formik.errors.companyName}
            helperText={formik.errors.companyName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CorporateFare />
                </InputAdornment>
              ),
            }}
          />
        )}

        <Autocomplete
          disablePortal
          fullWidth
          options={Object.values(countries)}
          getOptionLabel={(option) => option.name ?? ''}
          value={values.country as any}
          onChange={(event, newValue) => {
            void formik.setFieldValue('country', newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name="country"
              label="Your Location"
              fullWidth
              required
            />
          )}
        />
      </Stack>

      <FormControlLabel
        className={s.confirm}
        control={
          <Checkbox
            required
            name="agree"
            onChange={handleChange}
            value={values.agree}
          />
        }
        label="Yes, I understand and agree to the bloom Terms of Service, including the User Agreement and Privacy Policy."
      />
    </div>
  );
};

export default RegisterDetails;
