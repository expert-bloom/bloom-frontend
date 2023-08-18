import React from 'react';

import { AnimatePresence } from 'framer-motion';

import { useAppStore } from '@/lib/store';
import JobDetail from 'src/components/commons/FixedLayer/JobDetailSlider';

import s from './fixed.module.scss';

const FixedLayer: React.FC<any> = () => {
  const showDetail = useAppStore((state) => state.jobPostDetailState);

  return (
    <div className={s.container}>
      <AnimatePresence>
        {showDetail.jobPostId !== null && <JobDetail />}
      </AnimatePresence>
    </div>
  );
};

export default FixedLayer;
