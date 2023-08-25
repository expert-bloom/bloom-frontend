import React from 'react';

import { Send } from '@mui/icons-material';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

import s from './confirmemail.module.scss';

const HowItWork = () => {
  return (
    <Card className={s.container} elevation={0}>
      <CardHeader
        title={<Typography variant="h5">Confirm your email address</Typography>}
      />

      <CardContent className={s.content}>
        <Alert severity="warning">
          We need to confirm your email henokgetachew5000@gmail.com to know
          it&apos;s you.
        </Alert>

        <Button startIcon={<Send />} variant="outlined" color="primary">
          Resend email
        </Button>
      </CardContent>
    </Card>
  );
};

export default HowItWork;
