import React from 'react';

import { Modal } from '@mui/material';
import { type Variants } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { MotionChild, MotionParent } from '@/components/MotionItems';
import { useAppStore } from '@/lib/store';

import s from './applican_detail.module.scss';
import DetailContent from './components/DetailContent';

const transition = {
  duration: 0.5,
  ease: [0.165, 0.84, 0.44, 1],
};

export const basicVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};

export const blurBgVariants = {
  variants: {
    ...basicVariants,
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.01, 0, 0.9],
      },
    },
  },
};

const menuVariants: { variants: Variants } & Record<string, any> = {
  variants: {
    initial: {
      scale: 0.8,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.01, 0, 0.9],
        delayChildren: 0.3,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        ...transition,
        duration: 0.4,
      },
    },
  },

  transition: {
    duration: 0.5,
    ease: [0.6, 0.01, 0, 0.9],
  },
};

const ProfileDetail = () => {
  const { applicantDetail, setApplicantDetail } = useAppStore();

  const onClose = () => {
    if (applicantDetail.isLoading) {
      toast.error('Ongoing process, please wait!');
      return;
    }

    setApplicantDetail({
      selectedApplicationId: null,
    });
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      hideBackdrop={true}
      keepMounted={false}
    >
      <MotionParent className={s.container} variants={{}}>
        <MotionChild
          className={s.blur_bg}
          onClick={onClose}
          variants={blurBgVariants.variants}
          transition={transition}
        />

        <MotionChild
          className={s.wrapper}
          variants={menuVariants.variants}
          transition={menuVariants.transition}
        >
          <DetailContent />
        </MotionChild>
      </MotionParent>
    </Modal>
  );
};

export default ProfileDetail;
