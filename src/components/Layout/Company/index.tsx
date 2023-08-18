import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Footer from '@/components/commons/Footer';

import CompanyTopNavBar from './CompanyNav';
import s from './layout_company.module.scss';

interface Props {
  children: React.ReactNode;
}

const DBCompany: React.FC<Props> = ({ children }) => {
  return (
    <>
      <motion.div className={s.nav_bar} initial="initial" animate="animate">
        <AnimatePresence>
          <CompanyTopNavBar key="top-nav-bar" />
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

export default DBCompany;
