import { create } from 'zustand';

interface JobPostDetail {
  isLoading: boolean;
  jobPostId: string | null;
}

interface ProfileDetail {
  isLoading: boolean;
  profileId: string | null;
}

interface AppPopupState {
  isLoading: boolean;
  selectedApplicationId: string | null;
  showSendInterviewPopup: boolean;
  showSendOfferPopup: boolean;
  showViewInterviewPopup: boolean;
}

interface ApplicantDetail {
  isLoading: boolean;
  selectedApplicationId: string | null;
}

interface Store {
  jobPostDetailState: JobPostDetail;
  profileDetail: ProfileDetail;
  applicantDetail: ApplicantDetail;
  appPopupsState: AppPopupState;

  selectedJobPostId: string | null;

  setJobPostDetailId: (postDetail: Partial<JobPostDetail>) => void;
  setProfileDetail: (profileDetail: Partial<ProfileDetail>) => void;
  setAppPopupsState: (profileDetail: Partial<AppPopupState>) => void;

  setApplicantDetail: (profileDetail: Partial<ApplicantDetail>) => void;

  setSelectedJobPostId: (jobPostId: string) => void;
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
  appPopupsState: {
    isLoading: false,
    showSendInterviewPopup: false,
    showViewInterviewPopup: false,
    showSendOfferPopup: false,
    selectedApplicationId: null,
  },

  applicantDetail: {
    selectedApplicationId: null,
    applicationWithApplicant: null,
    isLoading: false,
  },

  settingIdxClicked: null,

  selectedJobPostId: null,
  setSelectedJobPostId: (jobPostId: string) => {
    set(() => ({
      selectedJobPostId: jobPostId,
    }));
  },

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

  setAppPopupsState: (interviewPopup: Partial<AppPopupState>) => {
    set((state) => ({
      appPopupsState: { ...state.appPopupsState, ...interviewPopup },
    }));
  },

  setApplicantDetail: (applicantDetail: Partial<ApplicantDetail>) => {
    set((state) => ({
      applicantDetail: { ...state.applicantDetail, ...applicantDetail },
    }));
  },
}));
