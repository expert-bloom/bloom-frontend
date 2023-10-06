import { create } from 'zustand';

interface JobPostDetail {
  isLoading: boolean;
  jobPostId: string | null;
}

interface ProfileDetail {
  isLoading: boolean;
  profileId: string | null;
}

interface InterviewPopup {
  isLoading: boolean;
  open: boolean;
}

interface ApplicantDetail {
  isLoading: boolean;
  selectedApplicationId: string | null;
}

interface Store {
  jobPostDetailState: JobPostDetail;
  profileDetail: ProfileDetail;
  applicantDetail: ApplicantDetail;
  interviewPopup: InterviewPopup;

  selectedJobPostId: string | null;

  setJobPostDetailId: (postDetail: Partial<JobPostDetail>) => void;
  setProfileDetail: (profileDetail: Partial<ProfileDetail>) => void;
  setInterviewPopup: (profileDetail: Partial<InterviewPopup>) => void;

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
  interviewPopup: {
    isLoading: false,
    open: false,
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

  setInterviewPopup: (interviewPopup: Partial<InterviewPopup>) => {
    set((state) => ({
      interviewPopup: { ...state.interviewPopup, ...interviewPopup },
    }));
  },

  setApplicantDetail: (applicantDetail: Partial<ApplicantDetail>) => {
    set((state) => ({
      applicantDetail: { ...state.applicantDetail, ...applicantDetail },
    }));
  },
}));
