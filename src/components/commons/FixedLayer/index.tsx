import React from 'react';

import { AnimatePresence } from 'framer-motion';

import ApplicantDetail from '@/components/commons/FixedLayer/ApplicantDetail';
import JobDetail from '@/components/commons/FixedLayer/JobDetailSlider';
import ProfileView from '@/components/commons/FixedLayer/ProfileView';
import SendInterviewPopup from '@/components/commons/FixedLayer/SendInterviewPopup';
import SendOfferPopup from '@/components/commons/FixedLayer/SendOfferPopup';
import ViewInterviewResponse from '@/components/commons/FixedLayer/ViewInterviewResponse';
import { useAppStore } from '@/lib/store';

import s from './fixed.module.scss';

const FixedLayer: React.FC<any> = () => {
  const showDetail = useAppStore((state) => state.jobPostDetailState);
  const profileDetail = useAppStore((state) => state.profileDetail);
  const applicantDetail = useAppStore((state) => state.applicantDetail);
  const interviewPopup = useAppStore((state) => state.appPopupsState);

  return (
    <div className={s.container}>
      <AnimatePresence>
        {showDetail.jobPostId !== null && <JobDetail />}
        {profileDetail.profileId !== null && <ProfileView />}
        {applicantDetail.selectedApplicationId !== null && <ApplicantDetail />}
        {/* {interviewPopup.open && <SendInterviewPopup />} */}

        <SendInterviewPopup />
        <ViewInterviewResponse />
        <SendOfferPopup />
      </AnimatePresence>
    </div>
  );
};

export default FixedLayer;
