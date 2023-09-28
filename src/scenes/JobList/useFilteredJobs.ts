import { useState, useEffect } from 'react';

import { intersection } from 'lodash';

import { type JobPost } from '@/graphql/client/gql/schema';
import { type FilterType, useFilterContext } from '@/scenes/JobList/index';

// A helper function that checks if a job post matches all the filter criteria
const matchesFilters = (job: JobPost, filters: FilterType) => {
  // If no filters are applied, return true
  if (Object.values(filters).every((value) => value.length === 0)) {
    return true;
  }

  if (
    filters.location.length > 0 &&
    !filters.location.some((l) => l === job.location)
  ) {
    return false;
  }

  const intersect = intersection(job.category, filters.industry).length > 0;
  if (filters.industry.length > 0 && !intersect) {
    return false;
  }

  if (
    filters.jobType.length > 0 &&
    !filters.jobType.some((jt) => jt === job.jobType)
  ) {
    return false;
  }

  if (
    filters.experienceLevel.length > 0 &&
    !filters.experienceLevel.some((el) => el === job.experienceLevel)
  ) {
    return false;
  }

  return true;
};

const useFilters = (jobs: JobPost[]) => {
  const { filter } = useFilterContext();
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const hasFilters = Object.values(filter.values).some(
    (value) => value.length > 0,
  );

  useEffect(() => {
    const newFilteredJobs = jobs.filter((job) =>
      matchesFilters(job, filter.values),
    );
    setFilteredJobs(newFilteredJobs);
  }, [jobs, filter]);

  const clearFilters = () => {
    filter.resetForm();
  };

  // Return an object with the filters, filtered jobs, and functions to update and clear them
  return { filters: filter, filteredJobs, clearFilters, hasFilters };
};

export default useFilters;
