import React from 'react';

import { AnimatePresence } from 'framer-motion';

import JobDetail from '@/components/commons/FixedLayer/JobDetailSlider';
import ProfileView from '@/components/commons/FixedLayer/ProfileView';
import { useAppStore } from '@/lib/store';

import s from './fixed.module.scss';

const FixedLayer: React.FC<any> = () => {
  const showDetail = useAppStore((state) => state.jobPostDetailState);
  const profileDetail = useAppStore((state) => state.profileDetail);

  return (
    <div className={s.container}>
      <AnimatePresence>
        {showDetail.jobPostId !== null && <JobDetail />}
        {profileDetail.profileId !== null && <ProfileView />}
        {/* {true && <ProfileView />} */}
      </AnimatePresence>
    </div>
  );
};

export default FixedLayer;
