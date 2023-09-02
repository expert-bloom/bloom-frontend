import { create } from 'zustand';

interface JobPostDetail {
  isLoading: boolean;
  jobPostId: string | null;
}

interface ProfileDetail {
  isLoading: boolean;
  profileId: string | null;
}

interface Store {
  jobPostDetailState: JobPostDetail;
  profileDetail: ProfileDetail;
  setJobPostDetailId: (postDetail: Partial<JobPostDetail>) => void;
  setProfileDetail: (profileDetail: Partial<ProfileDetail>) => void;
  settingIdxClicked: string | null;
  setSettingIdx: (idx: string | null) => void;
}

export const useAppStore = create<Store>((set) => ({
  jobPostDetailState: {
    jobPostId: null,
    isLoading: false,
  },
  profileDetail: {
    profileId: null,
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
  setProfileDetail: (profileDetail: Partial<ProfileDetail>) => {
    set((state) => ({
      profileDetail: { ...state.profileDetail, ...profileDetail },
    }));
  },
}));
