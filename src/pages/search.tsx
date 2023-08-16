import React, { Suspense } from 'react';

import JobPostsPage from 'src/scenes/Search';

const Search = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobPostsPage />
    </Suspense>
  );
};

export default Search;
