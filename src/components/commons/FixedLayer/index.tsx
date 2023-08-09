import React from 'react';
import s from './fixed.module.scss';
import TopNavBar from './TopNavBar';
import { AnimatePresence, motion } from 'framer-motion';

const FixedLayer: React.FC<any> = ({}) => {
  return (
    <motion.div className={s.container} initial="initial" animate="animate">
      <AnimatePresence>
        <TopNavBar key="top-nav-bar" />
      </AnimatePresence>
    </motion.div>
  );
};

export default FixedLayer;
