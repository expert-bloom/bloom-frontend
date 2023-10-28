import { configureStore } from '@reduxjs/toolkit';

import { AppliedJobReducer } from '@/utils/AppliedJobSlice';
import { JobReducer } from '@/utils/JobSlice';
import { UserReducer } from '@/utils/UserSlice';

export const store = configureStore({
  reducer: {
    User: UserReducer, // UserReducer is a function that returns a slice of state
    Job: JobReducer, // JobReducer is a function that returns a slice of state
    AppliedJob: AppliedJobReducer, // AppliedJobReducer is a function that returns a slice of state
  },
});
