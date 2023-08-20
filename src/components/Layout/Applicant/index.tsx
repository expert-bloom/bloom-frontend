import React, { useEffect, useRef } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import AccountAlert from '@/components/AccountAlert';
import Footer from '@/components/commons/Footer';

import s from './applicant.module.scss';
import ApplicantNav from './ApplicantNav';

interface Props {
  children: React.ReactNode;
}

const Applicant: React.FC<Props> = ({ children }) => {
  // define a ref for the top nav bar (mutable)
  const [height, setHeight] = React.useState(0);

  useEffect(() => {
    setHeight(document.getElementById('applicant-nav')?.offsetHeight ?? 0);
  }, []);

  return (
    <>
      <motion.div className={s.nav_bar} initial="initial" animate="animate">
        <AnimatePresence>
          <ApplicantNav key="top-nav-bar" />
        </AnimatePresence>
      </motion.div>

      <motion.div className={s.root}>
        <div
          className={s.wrapper}
          style={{
            paddingTop: height,
          }}
        >
          <AccountAlert />
          <main className={s.main}>{children}</main>
          <Footer />
        </div>
      </motion.div>
    </>
  );
};

export default Applicant;
