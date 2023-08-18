import React from 'react';

import { Bookmark, LocationOn, Search } from '@mui/icons-material';
import {
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import moment from 'moment/moment';
import { BsClock } from 'react-icons/bs';

import { MoButton } from '@/components/MoButton';
import { useGetJobPostsQuery } from '@/graphql/client/gql/schema';
import { useAppStore } from '@/lib/store';
import { capitalize } from '@/utils';
import SearchFilter from 'src/scenes/Search/SearchFilter';

import s from './search.module.scss';

const jobPosts = {
  title: 'Revive Ad Server Customization',
};

const JobPosts = () => {
  const jopPostsPayload = useGetJobPostsQuery();

  const { data: posts, loading } = jopPostsPayload;

  // access the store
  const selectedDayOfWeek = useAppStore((state) => state.setJobPostDetailId);

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

            <div className={s.list}>
              {posts?.getJobPosts &&
                posts.getJobPosts.map((post, idx) => (
                  <div
                    key={idx}
                    className={s.job_card}
                    onClick={() => {
                      selectedDayOfWeek({
                        jobPostId: post.id,
                      });
                    }}
                  >
                    <div className={s.title_div}>
                      <Typography className={s.title} variant="h6">
                        {post.title}
                      </Typography>

                      <IconButton className={s.bookmark}>
                        <Bookmark />
                      </IconButton>
                    </div>

                    <Typography className={s.detail}>
                      {capitalize(post.salaryType)}: <b>${post.salary[0]}</b> -{' '}
                      {post.experienceLevel} - <BsClock /> Posted{' '}
                      {moment(post.createdAt).calendar()}
                    </Typography>

                    <Typography variant="body1" className={s.desc}>
                      {post.description}
                      <b>more</b>
                    </Typography>

                    <div className={s.tags}>
                      {post.category.map((category) => (
                        <Chip label={category} key={category} />
                      ))}
                    </div>

                    <Typography className={s.detail}>Proposals: 0</Typography>
                    <Stack direction="row" gap=".3rem">
                      <LocationOn fontSize="small" />
                      <Typography className={s.detail}>
                        {post.location}
                      </Typography>
                    </Stack>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosts;
