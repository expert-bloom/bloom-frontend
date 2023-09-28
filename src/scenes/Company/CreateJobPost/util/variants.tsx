import { type Transition, type Variants } from 'framer-motion';

export const transition: Transition = {
  ease: 'easeInOut',
  duration: 0.35,
};
export const wrapperVariants: Variants = {
  initial(custom) {
    const x =
      custom.direction === 'RIGHT'
        ? '-100%'
        : custom.direction === 'LEFT'
        ? '100%'
        : '0';
    return {
      opacity: 0,
      x,
    };
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      default: transition,
      opacity: { delay: 0.2, duration: 0.4 },
    },
  },
  exit(custom) {
    return {
      opacity: 0,
      x: custom.direction === 'LEFT' ? '-100%' : '100%',
      transition: {
        opacity: { duration: 0.1 },
        default: transition,
      },
    };
  },
};
