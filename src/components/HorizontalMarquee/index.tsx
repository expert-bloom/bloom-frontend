import React, { useRef } from 'react';

import { wrap } from '@motionone/utils';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

import s from './marquee.module.scss';

interface PropsType {
  children: React.ReactNode;
  baseVelocity: number;
  noOfChildren?: number;
}
const HorizontalMarquee = ({
  children,
  baseVelocity = 2,
  noOfChildren = 6,
}: PropsType) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();

  // this is the magic wrapping for the length of the marquee
  const x = useTransform(baseX, (x) => `${wrap(-10, -43.3, x)}%`);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 10], {
    clamp: false,
  });

  const directionFactor = useRef(1);
  useAnimationFrame((time, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // this what change the direction of the scroll once we switch scrolling direciton
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <motion.div className={s.scroller} style={{ x }}>
          {Array.from(new Array(noOfChildren)).map((txt, idx) => (
            <React.Fragment key={idx}>{children}</React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalMarquee;
