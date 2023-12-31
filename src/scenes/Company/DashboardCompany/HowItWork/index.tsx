import React from 'react';

import { PlayArrow } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

import s from './howitwork.module.scss';

const HowItWork = () => {
  return (
    <Card className={s.container}>
      <CardHeader
        title={<Typography variant="h5">How Does It Work</Typography>}
      />

      <CardContent className={s.vid}>
        <div className={s.content}>
          <Button startIcon={<PlayArrow />} variant="contained" color="primary">
            Watch Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWork;
