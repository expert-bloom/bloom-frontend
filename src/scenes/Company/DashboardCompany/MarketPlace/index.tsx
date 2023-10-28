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
import { useSession } from 'next-auth/react';

import { useGetJobPostsQuery } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';

import s from './marketplace.module.scss';

const MarketPlace = () => {
  const { data: session } = useSession();
  const { me } = useMe();

  const jobPostPayload = useGetJobPostsQuery({
    skip: !me?.company?.id,
    fetchPolicy: 'cache-and-network',
    variables: {
      input: {
        companyId: me?.company?.id ?? '',
      },
    },
  });

  const { data: posts, loading } = jobPostPayload;

  useEffect(() => {
    // console.log('posts : ', posts);
  }, [posts]);

  return (
    <Card className={s.container}>
      <CardHeader title={<Typography variant="h5">Marketplace</Typography>} />

      {loading && (
        <div className={s.loading}>
          <CircularProgress />
        </div>
      )}

      {!(!loading && posts?.getJobPosts && posts?.getJobPosts?.length > 0) && (
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
              <Link href="/company/create-job-post">
                Create Your First Job Post
              </Link>
            </Button>
          </Alert>
        </CardContent>
      )}

      <div className={s.posts}>
        {posts?.getJobPosts &&
          posts.getJobPosts.slice(0, 3).map((post) => (
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
        {posts?.getJobPosts && posts?.getJobPosts?.length > 0 ? (
          <Link href="/company/marketplace">
            <Button size="small">See More</Button>
          </Link>
        ) : (
          <Link href="/company/create-job-post">
            <Button size="small">Create Job Post</Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
};

export default MarketPlace;
