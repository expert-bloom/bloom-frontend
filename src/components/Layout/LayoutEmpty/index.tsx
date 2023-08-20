import React from 'react';

import { motion } from 'framer-motion';

import Footer from '@/components/commons/Footer';
import TopNavBar from 'src/components/Layout/LayoutEmpty/TopNavBar';

import s from './layout.module.scss';

interface Props {
  children: React.ReactNode;
}

const LayoutEmpty: React.FC<Props> = ({ children }) => {
  return (
    <>
      <TopNavBar key="top-nav-bar" />

      <motion.div className={s.root}>
        <div className={s.wrapper}>
          <main>{children}</main>
          <Footer />
        </div>
      </motion.div>
    </>
  );
};

export default LayoutEmpty;
