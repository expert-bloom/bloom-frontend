import React, { Suspense } from 'react';
import JobPostsPage from '@/scenes/JobPosts';

const JobPosts = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobPostsPage />
    </Suspense>
  );
};

export default JobPosts;
