import { create } from 'zustand';

interface JobPostDetail {
  isLoading: boolean;
  jobPostId: string | null;
}

interface Store {
  jobPostDetailState: JobPostDetail;
  setJobPostDetailId: (dayOfWeek: Partial<JobPostDetail>) => void;
  settingIdxClicked: string | null;
  setSettingIdx: (idx: string | null) => void;
}

export const useAppStore = create<Store>((set) => ({
  jobPostDetailState: {
    jobPostId: null,
    isLoading: false,
  },
  settingIdxClicked: null,
  setSettingIdx: (idx: string | null) => {
    set(() => ({
      settingIdxClicked: idx,
    }));
  },
  setJobPostDetailId: (postDetail: Partial<JobPostDetail>) => {
    set((state) => ({
      jobPostDetailState: { ...state.jobPostDetailState, ...postDetail },
    }));
  },
}));
