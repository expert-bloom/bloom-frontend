import { create } from 'zustand';

interface JobPostDetail {
  isLoading: boolean;
  jobPostId: string | null;
}

interface Store {
  jobPostDetailState: JobPostDetail;
  setJobPostDetailId: (dayOfWeek: Partial<JobPostDetail>) => void;
}

export const useAppStore = create<Store>((set) => ({
  jobPostDetailState: {
    jobPostId: null,
    isLoading: false,
  },
  setJobPostDetailId: (postDetail: Partial<JobPostDetail>) => {
    set((state) => ({
      jobPostDetailState: { ...state.jobPostDetailState, ...postDetail },
    }));
  },
}));
