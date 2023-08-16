import React, { type ComponentProps } from 'react';

import { motion } from 'framer-motion';

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

export const basicTransition = {
  duration: 0.5,
  ease: [0.6, 0.01, 0, 0.9],
};

type Props = ComponentProps<typeof motion.div>;

export const MotionChild = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <motion.div
        variants={basicVariants}
        transition={basicTransition}
        ref={ref}
        {...props}
      >
        {props.children}
      </motion.div>
    );
  },
);

MotionChild.displayName = 'MotionChild';
