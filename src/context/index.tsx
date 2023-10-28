import React, { type FC } from 'react';

import AppProvider from '@/context/app';
import LayoutProvider from '@/context/layout';
import { MotionValueContextWrapper } from '@/context/MotionValuesContext';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ContextWrapper: FC<{ children: React.ReactElement }> = ({
  children,
}: any) => {
  return (
    <AppProvider>
      <LayoutProvider pageProps={{}}>
        <MotionValueContextWrapper>{children}</MotionValueContextWrapper>
      </LayoutProvider>
    </AppProvider>
  );
};
export default ContextWrapper;
