import React from 'react';

import { Alert, AlertTitle, CircularProgress, Typography } from '@mui/material';
import Link from 'next/link';

import useMe from '@/hooks/useMe';
import JobPostCard from '@/scenes/JobList/component/JobPostCard';

import s from './savedjobs.module.scss';

const SavedJobs = () => {
  const { me, loading } = useMe();

  if (!me?.applicant) return null;

  const applicant = me.applicant;

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <header>
          <Typography variant="h3" className={s.title}>
            Saved Jobs
          </Typography>
        </header>

        <div className={s.content}>
          <div className={s.right}>
            {loading && (
              <div className={s.loading}>
                <CircularProgress />
              </div>
            )}

            {applicant.savedJobs?.edges.length === 0 && (
              <Alert>
                <AlertTitle>No Job-Posts</AlertTitle>
                You have no saved jobs,{' '}
                <Link href="/src/pages/jobs">
                  <b>explore here</b>
                </Link>
              </Alert>
            )}

            {applicant.savedJobs && (
              <div className={s.list}>
                {applicant.savedJobs.edges.map(({ node: post }, idx) => (
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

export default SavedJobs;
