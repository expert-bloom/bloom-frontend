import React from 'react';

import { useFormik } from 'formik';

import JobList from '@/scenes/JobList/component/JobList';
import SearchFilter from '@/scenes/JobList/SearchFilter';

import s from './search.module.scss';

export interface FilterType {
  industry: string[];
  experienceLevel: string[];
  jobType: string[];
  location: string[];
}

interface FilterContextType {
  filter: ReturnType<typeof useFormik<FilterType>>;
}

// create a context for the formik form
const FilterContext = React.createContext<FilterContextType>({} as any);
export const useFilterContext = () => React.useContext(FilterContext);

const JobPosts = () => {
  const filter = useFormik<FilterType>({
    initialValues: {
      industry: [] as string[],
      experienceLevel: [] as string[],
      jobType: [],
      location: [],
    },
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: false,
    onSubmit(value) {
      console.log('values : ', value);
    },
  });

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <FilterContext.Provider value={{ filter }}>
          <div className={s.content}>
            <SearchFilter />
            <JobList />
          </div>
        </FilterContext.Provider>
      </div>
    </div>
  );
};

export default JobPosts;
