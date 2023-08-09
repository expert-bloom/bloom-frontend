// include the prop type of MuiButton
import React from 'react';
import { motion } from 'framer-motion';
import { LoadingButton } from '@mui/lab';

// create

type MotionButtonType = {
  children: React.ReactNode; // props from motion.div
  motionProps?: React.ComponentProps<typeof motion.div>;
} & React.ComponentProps<typeof LoadingButton>;
export const MoButton: React.FC<MotionButtonType> = ({
  children,
  motionProps,
  ...props
}) => {
  const effect =
    props?.disabled ?? props?.loading
      ? {
          whileTap: {
            x: [-10, 10, -10, 0],
            transition: { duration: 0.2 },
          },
        }
      : {
          whileHover: { scale: 1.07 },
          whileTap: {
            scale: 0.89,
          },
        };

  return (
    <motion.div
      {...effect}
      {...motionProps}
      style={{
        cursor: 'pointer',
        borderRadius: '50000px',
        ...motionProps?.style,
      }}
    >
      <LoadingButton
        variant="contained"
        color="primary"
        size="large"
        {...props}
      >
        {children}
      </LoadingButton>
    </motion.div>
  );
};
