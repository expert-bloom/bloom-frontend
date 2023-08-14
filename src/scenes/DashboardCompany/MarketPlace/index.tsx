import React from 'react';

import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import s from './marketplace.module.scss';

const MarketPlace = () => {
  const posts = [];

  return (
    <Card className={s.container}>
      <CardHeader title={<Typography variant="h5">Marketplace</Typography>} />

      <CardContent>
        <Alert severity="info" className={s.alert}>
          <AlertTitle>
            <Typography variant="h5">No Job Post</Typography>
          </AlertTitle>

          <Typography variant="body1" fontWeight={300}>
            You have not posted any job yet. Click the button below to post a
            job.
          </Typography>

          <Button size="large" variant="outlined">
            <Link href="/post">Create Your First Job Post</Link>
          </Button>
        </Alert>
      </CardContent>

      <CardActions>
        <Button size="small" disabled>
          See More
        </Button>
      </CardActions>
    </Card>
  );
};

export default MarketPlace;
