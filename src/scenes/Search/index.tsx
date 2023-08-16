import React from 'react';

import { AltRoute, Bookmark, LocationOn } from '@mui/icons-material';
import {
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { TimeClock } from '@mui/x-date-pickers';
import moment from 'moment/moment';
import { BsClock } from 'react-icons/bs';
import { CiLock } from 'react-icons/ci';
import { FaSearchLocation } from 'react-icons/fa';

import { useGetJobPostsQuery } from '@/graphql/client/gql/schema';
import { capitalize } from '@/utils';
import SearchFilter from 'src/scenes/Search/SearchFilter';

import s from './search.module.scss';

const jobPosts = {
  title: 'Revive Ad Server Customization',
};

const JobPosts = () => {
  const jopPostsPayload = useGetJobPostsQuery();

  const { data: posts, loading } = jopPostsPayload;

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

            {posts?.getJobPosts &&
              posts.getJobPosts.map((data, idx) => (
                <div key={idx} className={s.job_card}>
                  <div className={s.hor}>
                    <Typography className={s.title} variant="h5">
                      {data.title}
                    </Typography>

                    <IconButton>
                      <Bookmark />
                    </IconButton>
                  </div>

                  <Typography className={s.detail}>
                    {capitalize(data.salaryType)}: <b>${data.salary[0]}</b> -{' '}
                    {data.experienceLevel} - <BsClock /> Posted{' '}
                    {moment(data.createdAt).calendar()}
                  </Typography>

                  <Typography variant="body1" className={s.desc}>
                    {data.description}
                    <b>more</b>
                  </Typography>

                  <div className={s.tags}>
                    {data.category.map((category) => (
                      <Chip label={category} key={category} />
                    ))}
                  </div>

                  <Typography className={s.detail}>Proposals: 0</Typography>
                  <Stack direction="row" gap=".3rem">
                    <LocationOn fontSize="small" />
                    <Typography className={s.detail}>
                      {data.location}
                    </Typography>
                  </Stack>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosts;
