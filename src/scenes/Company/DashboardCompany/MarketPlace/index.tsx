import React, { useEffect } from 'react';

import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { useGetCompanyJobPostsQuery } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';

import s from './marketplace.module.scss';

const MarketPlace = () => {
  const { me } = useMe();

  const jobPostPayload = useGetCompanyJobPostsQuery({
    skip: !me?.company?.id,
    variables: {
      input: {
        companyId: me?.company?.id ?? '',
      },
    },
  });

  const { data: posts, loading } = jobPostPayload;

  useEffect(() => {
    console.log('posts : ', me);
  }, [posts]);

  return (
    <Card className={s.container}>
      <CardHeader title={<Typography variant="h5">Marketplace</Typography>} />

      {loading && (
        <div className={s.loading}>
          <CircularProgress />
        </div>
      )}

      {!(
        !loading &&
        posts?.getCompanyJobPosts &&
        posts?.getCompanyJobPosts?.jobPosts?.length > 0
      ) && (
        <CardContent>
          <Alert severity="info" className={s.alert}>
            <AlertTitle>
              <Typography variant="h5">No Job Post </Typography>
            </AlertTitle>

            <Typography variant="body1" fontWeight={300}>
              You have not posted any job yet. Click the button below to post a
              job.
            </Typography>

            <Button size="large">
              <Link href="/company/create-job-post">
                Create Your First Job Post
              </Link>
            </Button>
          </Alert>
        </CardContent>
      )}

      <div className={s.posts}>
        {posts?.getCompanyJobPosts &&
          posts.getCompanyJobPosts?.jobPosts?.map((post) => (
            <ButtonBase className={s.post} key={post.id}>
              <Link href="/company/marketplace">
                <Typography>{post.title}</Typography>
                <div className={s.stat}>
                  <Chip
                    label="Best Matches"
                    avatar={<Avatar>0</Avatar>}
                    variant="outlined"
                  />
                  <Chip
                    label="Applicants"
                    avatar={<Avatar>0</Avatar>}
                    variant="outlined"
                  />
                </div>
              </Link>
            </ButtonBase>
          ))}
      </div>

      <CardActions>
        {posts?.getCompanyJobPosts &&
        posts?.getCompanyJobPosts?.jobPosts.length > 0 ? (
          <Link href="/company/marketplace">
            <Button size="small">See More</Button>
          </Link>
        ) : (
          <Link href="/company/create-job-post">
            <Button size="small" variant="outlined">
              Create Job Post
            </Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
};

export default MarketPlace;
