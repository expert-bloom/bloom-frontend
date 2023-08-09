import React from 'react';
import s from './setupaccount.module.scss';
import { Button, TextField, Typography } from '@mui/material';
import { MoButton } from '@/components/MoButton';

const SetUpAccount = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Typography className={s.title}>
          Set up an account <br />
          and start hiring!
        </Typography>

        <form action="">
          <TextField required type="email" label="Email" />

          <MoButton>Start Hiring</MoButton>
        </form>
      </div>
    </div>
  );
};

export default SetUpAccount;
