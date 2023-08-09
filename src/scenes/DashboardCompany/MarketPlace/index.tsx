import React from 'react';
import s from './marketplace.module.scss';
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useGetJobPostsQuery } from '@/graphql/client/gql/schema';

const MarketPlace = () => {
  const posts = [];

  const jobPosts = useGetJobPostsQuery({
    variables: {},
  });

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
