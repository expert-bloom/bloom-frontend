import React from 'react';

import { Button, Container, TextField, Typography } from '@mui/material';

import { MoButton } from '@/components/MoButton';

import s from './setupaccount.module.scss';

const SetUpAccount = () => {
  return (
    <div className={s.container}>
      <Container className={s.wrapper}>
        <Typography className={s.title} variant="h2">
          Set up an account <br />
          and start hiring!
        </Typography>

        <form action="">
          <TextField required type="email" label="Email" />

          <MoButton>Start Hiring</MoButton>
        </form>
      </Container>
    </div>
  );
};

export default SetUpAccount;
