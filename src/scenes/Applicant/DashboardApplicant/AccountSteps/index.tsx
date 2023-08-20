import React from 'react';

import {
  RadioButtonChecked,
  RadioButtonUnchecked,
  TaskAltRounded,
  TaskAltTwoTone,
} from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  LinearProgress,
  Chip,
  Stack,
} from '@mui/material';

import s from './accountsteps.module.scss';

const AccountSteps = () => {
  return (
    <Card className={s.container}>
      <CardHeader
        title={<Typography variant="h5">Profile Milestones</Typography>}
      />

      <CardContent className={s.content}>
        <Typography variant="body1" className={s.text}>
          Complete your profile to get the best matches for your job posts.
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          className={s.progress}
        >
          <LinearProgress variant="determinate" value={30} sx={{ flex: '1' }} />
          <Typography variant="body2" noWrap>
            2 steps left
          </Typography>
        </Stack>

        <div className={s.steps}>
          <Chip
            icon={<TaskAltRounded />}
            label="Create a job post"
            variant="outlined"
          />

          <Chip
            icon={<RadioButtonUnchecked />}
            label="Complete company profile"
            variant="outlined"
            color="primary"
          />

          <Chip
            icon={<RadioButtonUnchecked />}
            label="Request an interview"
            variant="outlined"
            color="primary"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSteps;
