import React, { useEffect, useState } from 'react';

import {
  ArrowCircleLeft,
  CheckCircleTwoTone,
  GitHub,
  Person,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
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
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import GoogleIcon from '@/components/Icons/Google';
import { MoButton } from '@/components/MoButton';
import { AccountType } from '@/graphql/client/gql/schema';
import useSocialAuth from '@/scenes/Auth/useSocialAuth';
import { type RegisterFormValuesType } from 'src/scenes/Auth/Register';

import s from '../signup.module.scss';

const AuthDetails = ({ onReturn }: any) => {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormikContext<RegisterFormValuesType>();
  const { values, handleChange } = formik;
  const router = useRouter();
  const { withSocial } = useSocialAuth();

  useEffect(() => {
    // console.log('formik : ', formik);
  }, [formik]);

  useEffect(() => {
    window.onmessage = (event: Record<string, any>) => {
      console.log('onmessage event : --- ', event.data);
      if (event.data.type === 'auth') {
        if (event.data.status === 'success') {
          // window.close();
          toast.success('Login success');
        } else if (event.data.status === 'error') {
          toast.error(
            `Error : ${
              (event.data.message as string) ?? 'something went wrong'
            }`,
          );
          formik.setSubmitting(false);
          // setErrorMsg(event.data.message);
        }
      }
    };

    return () => {
      window.onmessage = null;
    };
  }, []);

  useEffect(() => {
    if (session) {
      void router.push('/');
    }
  }, [session]);

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
        startIcon={<GitHub />}
        fullWidth
        onClick={() => {
          formik.setSubmitting(true);
          console.log('accout type : ', formik.values.type);
          withSocial('signup', 'github', formik.values.type);
        }}
      >
        Continue with Github
      </MoButton>

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
        label="Email"
        variant="outlined"
        fullWidth
      />

      <Autocomplete
        disablePortal
        fullWidth
        // sx={{ width: 300 }}
        // multiple
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
            // required
          />
        )}
      />

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

export default AuthDetails;
