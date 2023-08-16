import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Footer from '@/components/commons/Footer';

import s from './applicant.module.scss';
import ApplicantNav from './ApplicantNav';

interface Props {
  children: React.ReactNode;
}

const Applicant: React.FC<Props> = ({ children }) => {
  return (
    <>
      <motion.div className={s.nav_bar} initial="initial" animate="animate">
        <AnimatePresence>
          <ApplicantNav key="top-nav-bar" />
        </AnimatePresence>
      </motion.div>

      <motion.div className={s.root}>
        <div className={s.wrapper}>
          <main>{children}</main>
          <Footer />
        </div>
      </motion.div>
    </>
  );
};

export default Applicant;
