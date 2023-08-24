import React, { useEffect } from 'react';

import { Bookmark, LocationOn, Search } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import moment from 'moment/moment';
import { toast } from 'react-hot-toast';
import { BsClock } from 'react-icons/bs';

import { MoButton } from '@/components/MoButton';
import { useGetJobPostsQuery } from '@/graphql/client/gql/schema';
import { useAppStore } from '@/lib/store';
import JobPostCard from '@/scenes/Search/component/JobPostCard';
import { capitalize } from '@/utils';
import SearchFilter from 'src/scenes/Search/SearchFilter';

import s from './search.module.scss';

const JobPosts = () => {
  const jopPostsPayload = useGetJobPostsQuery();

  const { data: posts, loading } = jopPostsPayload;

  console.log('posts : ', jopPostsPayload);

  // access the store
  const selectedDayOfWeek = useAppStore((state) => state.setJobPostDetailId);

  useEffect(() => {
    if (jopPostsPayload.error) {
      toast.error('Something wrong showing job-posts');
    }
  }, [jopPostsPayload]);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.content}>
          <SearchFilter />

          <div className={s.right}>
            {loading && (
              <div className={s.loading}>
                <CircularProgress />
              </div>
            )}

            <div className={s.search}>
              <TextField
                fullWidth
                variant="outlined"
                label="Search for jobs"
                placeholder="type ... "
              />
              <MoButton
                startIcon={<Search />}
                motionProps={{
                  whileTap: {
                    scale: 0.99,
                  },
                }}
              >
                Search
              </MoButton>
            </div>

            <div className={s.search_tags}>
              {['React', 'Art & Design'].map((label, idx) => (
                <Chip
                  key={label}
                  label={label}
                  size="small"
                  color="primary"
                  onDelete={() => null}
                />
              ))}

              <Button variant="text">Clear Filters</Button>
            </div>

            {posts?.getJobPosts && posts.getJobPosts.length === 0 && (
              <Alert>
                <AlertTitle>No Job-Posts</AlertTitle>
                There is no active Job-posts currently!
              </Alert>
            )}

            {posts?.getJobPosts && posts.getJobPosts.length > 0 && (
              <div className={s.list}>
                {posts.getJobPosts.map((post, idx) => (
                  <JobPostCard post={post} key={idx} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosts;
