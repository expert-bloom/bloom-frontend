import React, { useEffect, useState } from 'react';

import { type ApolloError } from '@apollo/client';
import { Modal } from '@mui/material';
import { type Variants } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { MotionChild, MotionParent } from '@/components/MotionItems';
import {
  type GetApplicantQuery,
  useGetApplicantQuery,
} from '@/graphql/client/gql/schema';
import { useResponseErrorHandler } from '@/hooks/useResponseErrorHandler';
import { useAppStore } from '@/lib/store';

import DetailContent from './components/DetailContent';
import s from './job_detail_slider.module.scss';

const transition = {
  duration: 1.2,
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
        duration: 1,
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
    },
  },

  transition: {
    duration: 1,
    ease: [0.6, 0.01, 0, 0.9],
  },
};

const ProfileDetail = () => {
  const { profileDetail, setProfileDetail } = useAppStore();

  const applicantsPayload = useGetApplicantQuery({
    // fetchPolicy: 'network-only',
    skip: !profileDetail.profileId,
    variables: {
      input: {
        id: profileDetail.profileId ?? '',
      },
    },
  });

  console.log('applicantsPayload : ', applicantsPayload);

  const [selectedProfile, setSelectedProfile] =
    useState<GetApplicantQuery['getApplicant']>();

  const onClose = () => {
    if (profileDetail.isLoading) {
      toast.error('Ongoing process, please wait!');
      return;
    }

    setProfileDetail({
      profileId: null,
    });
  };

  useResponseErrorHandler(
    applicantsPayload.error,
    'Failed to get applicant detail',
  );

  useEffect(() => {
    setSelectedProfile(applicantsPayload.data?.getApplicant);
  }, [applicantsPayload]);

  return (
    <Modal open={true} onClose={onClose} hideBackdrop={true}>
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
          <DetailContent
            isLoading={applicantsPayload.loading}
            profile={selectedProfile}
          />
        </MotionChild>
      </MotionParent>
    </Modal>
  );
};

export default ProfileDetail;
