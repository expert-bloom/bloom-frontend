import React, { useEffect } from 'react';

import { Modal } from '@mui/material';
import { type Variants } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { MotionChild, MotionParent } from '@/components/MotionItems';
import { useGetJobPostQuery } from '@/graphql/client/gql/schema';
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
      x: '100%',
    },
    animate: {
      x: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.01, 0, 0.9],
        delayChildren: 0.3,
      },
    },
    exit: {
      x: '100%',
    },
  },

  transition: {
    duration: 1,
    ease: [0.6, 0.01, 0, 0.9],
  },
};

const JobDetail = () => {
  const { jobPostDetailState, setJobPostDetailId } = useAppStore();

  const payload = useGetJobPostQuery({
    skip: !jobPostDetailState.jobPostId,
    variables: {
      input: {
        id: jobPostDetailState.jobPostId ?? '',
      },
    },
  });
  const [jobPost, setJobPost] = React.useState<typeof payload>(payload);

  useEffect(() => {
    setJobPost(payload);
  }, [payload]);

  const onClose = () => {
    if (jobPostDetailState.isLoading) {
      toast.error('Ongoing process, please wait!');
      return;
    }

    setJobPostDetailId({
      jobPostId: null,
    });
  };

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
          className={s.menu_wrapper}
          variants={menuVariants.variants}
          transition={menuVariants.transition}
        >
          <DetailContent
            isLoading={jobPost.loading}
            jobPost={jobPost.data?.getJobPost}
          />
        </MotionChild>
      </MotionParent>
    </Modal>
  );
};

export default JobDetail;
