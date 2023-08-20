import React, { type ReactElement, type ReactNode } from 'react';

import '@/styles/globals.css';
import '@global/index.scss';
import '@/lib/filePong/doka/doka.min.css';

import { ApolloProvider } from '@apollo/client';
import { CacheProvider, type EmotionCache } from '@emotion/react';
import { Alert, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { type NextPage } from 'next';
import { type AppProps } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';

import { useNProgress } from '@/hooks/use-nprogress';
import apollo from '@/lib/apollo';
import { store } from '@/Store/store';
import { createTheme } from '@/theme/admin-theme';
import createEmotionCache from '@/utils/createEmotoinCache';
import Layout from 'src/components/Layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

/* interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
} */

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  session?: Session;
  pageProps: any;
  Component: AppProps['Component'] & {
    Layout: React.FC<{ children: React.ReactNode }>;
    signIn: boolean;
  };
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  useNProgress();

  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={apollo}>
        <CacheProvider value={emotionCache}>
          <Provider store={store}>
            <ThemeProvider theme={createTheme()}>
              <CssBaseline />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {Component.signIn ? (
                  <Component {...pageProps} />
                ) : (
                  <Layout pageProps={pageProps}>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </LocalizationProvider>
            </ThemeProvider>
          </Provider>
        </CacheProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
