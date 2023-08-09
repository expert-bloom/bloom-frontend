import React, { createContext, useContext, useLayoutEffect } from 'react';
import {
  type AnimationControls,
  type MotionValue,
  useAnimation,
  useMotionValue,
} from 'framer-motion';

interface ToolTipType {
  text: string;
  show: boolean;
  timer: number[] | null;
}

interface MotionValueContextType {
  toolTipsData: MotionValue<any>;
  appBarScrollState: MotionValue<string>;
  PageAnimationEvent: MotionValue<string>;
  scrollState: MotionValue<{
    elementId?: string;
    scrollY?: number;
    remember: boolean;
  }>;
  PageAnimationController: AnimationControls;

  mouse: {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
  };

  moScroll?: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    yProgress: MotionValue<number>;
    xProgress: MotionValue<number>;
    limit: MotionValue<number>;
    scrollDirection: MotionValue<string>;
  };
}

const MotionValueContext = createContext<MotionValueContextType>(
  {} as unknown as MotionValueContextType,
);

export const MotionValueContextWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const PageAnimationEvent = useMotionValue<string>('');
  const PageAnimationController = useAnimation();

  // mouse_event motion_values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const appBarScrollState = useMotionValue('');
  const scrollState = useMotionValue<any>(null);

  const toolTipsData = useMotionValue({
    text: '',
    show: false,
    timer: null,
  });

  useLayoutEffect(() => {
    const updateMouseMotionValue = (ev: MouseEvent) => {
      mouseX.set(ev.clientX);
      mouseY.set(ev.clientY);
    };

    window.addEventListener('mousemove', updateMouseMotionValue);

    return () => {
      window.removeEventListener('mousemove', updateMouseMotionValue);
    };
  }, []);

  return (
    <MotionValueContext.Provider
      value={{
        mouse: {
          mouseX,
          mouseY,
        },
        toolTipsData,
        appBarScrollState,
        PageAnimationEvent,
        PageAnimationController,
        scrollState,
      }}
    >
      {children}
    </MotionValueContext.Provider>
  );
};

export function useAppInfo() {
  return useContext(MotionValueContext);
}
