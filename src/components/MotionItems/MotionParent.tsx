import React, { forwardRef } from 'react';

import { motion, type MotionProps, type Transition } from 'framer-motion';

type MotionParentPropsType = MotionProps & {
  children: React.ReactNode;
  className?: any;
};

const basicVariants = {
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

const basicTransition: Transition = {
  duration: 0.5,
  ease: [0.6, 0.01, 0, 0.9],
};

export const MotionParent = forwardRef<any, MotionParentPropsType>(
  ({ ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={basicVariants}
        transition={basicTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        {...props}
      >
        {props.children}
      </motion.div>
    );
  },
);

MotionParent.displayName = 'PageTransitionContainer';
