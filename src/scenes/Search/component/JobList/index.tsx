import React, { useEffect } from 'react';

import { Search } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  CircularProgress,
  TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { useResponseErrorHandler } from '@/components/commons/FixedLayer/ProfileView';
import { MoButton } from '@/components/MoButton';
import { useGetJobPostsQuery } from '@/graphql/client/gql/schema';
import { useAppStore } from '@/lib/store';
import { type FilterType } from '@/scenes/Search';
import JobPostCard from '@/scenes/Search/component/JobPostCard';
import useFilters from '@/scenes/Search/useFilteredJobs';

import s from './joblist.module.scss';

const JobList = () => {
  const jopPostsPayload = useGetJobPostsQuery();
  const { data: posts, loading } = jopPostsPayload;

  const { filteredJobs, clearFilters, filters, hasFilters } = useFilters(
    posts?.getJobPosts ?? [],
  );

  useResponseErrorHandler(
    jopPostsPayload.error,
    'Something wrong showing job-posts',
  );

  return (
    <div className={s.container}>
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

      <motion.div className={s.search_tags} layout>
        {Object.keys(filters.values).map((key: string) => {
          const filterItems = filters.values[key as keyof FilterType];

          return filterItems.map((item, idx) => (
            <Chip
              key={idx}
              size="small"
              color="primary"
              label={item}
              onDelete={() => {
                void filters.setFieldValue(
                  key,
                  filterItems.filter((v) => v !== item),
                );
              }}
            />
          ));
        })}

        <MoButton
          disabled={!hasFilters}
          variant="text"
          onClick={() => {
            clearFilters();
          }}
        >
          Clear Filters
        </MoButton>
      </motion.div>

      {posts?.getJobPosts && posts.getJobPosts.length === 0 && (
        <Alert>
          <AlertTitle>No Job-Posts</AlertTitle>
          There is no active Job-posts currently!
        </Alert>
      )}

      {posts?.getJobPosts && filteredJobs.length > 0 && (
        <div className={s.list}>
          {posts.getJobPosts.map((post, idx) => (
            <JobPostCard post={post} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
