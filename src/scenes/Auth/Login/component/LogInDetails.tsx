import React, { useEffect, useState } from 'react';

import { Email, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useFormikContext } from 'formik';

import { type RegisterFormValuesType } from 'src/scenes/Auth/Register';

import s from '../login.module.scss';

const LogInDetails = ({ onReturn }: any) => {
  // console.log('countries : ', Object.values(countries));
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormikContext<RegisterFormValuesType>();
  const { values, handleChange } = formik;

  useEffect(() => {
    // console.log('formik : ', formik);
  }, [formik]);

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
        <Typography variant="h4" className={s.title}>
          Sign In to your account
        </Typography>
      </header>

      <TextField
        name="email"
        value={values.email}
        onChange={handleChange}
        label="Email"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: <Email />,
        }}
      />

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
    </div>
  );
};

export default LogInDetails;
