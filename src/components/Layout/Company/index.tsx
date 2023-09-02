import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import AccountAlert from '@/components/AccountAlert';
import Footer from '@/components/commons/Footer';
import { useTopPadding } from '@/components/Layout/Applicant';

import CompanyTopNavBar from './CompanyNav';
import s from './layout_company.module.scss';

interface Props {
  children: React.ReactNode;
}

const DBCompany: React.FC<Props> = ({ children }) => {
  const { top } = useTopPadding();

  return (
    <>
      <motion.div className={s.nav_bar} initial="initial" animate="animate">
        <AnimatePresence>
          <CompanyTopNavBar key="top-nav-bar" />
        </AnimatePresence>
      </motion.div>

      <motion.div className={s.root}>
        <div
          className={s.wrapper}
          style={{
            paddingTop: top,
          }}
        >
          <AccountAlert />

          <main>{children}</main>
          <Footer />
        </div>
      </motion.div>
    </>
  );
};

export default DBCompany;
