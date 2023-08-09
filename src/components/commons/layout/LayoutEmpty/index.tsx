import React from 'react';
import s from './layout.module.scss';
import FixedLayer from '@/components/commons/FixedLayer';
import { motion } from 'framer-motion';
import Footer from '@/components/commons/Footer';

interface Props {
  children: React.ReactNode;
}

const LayoutEmpty: React.FC<Props> = ({ children }) => {
  return (
    <>
      <FixedLayer />
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
