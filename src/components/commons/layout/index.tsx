import React, { useCallback, useEffect, useRef } from 'react';

import { Alert } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

import Applicant from '@/components/commons/layout/Applicant';
import LayoutCompany from '@/components/commons/layout/DBCompany';
import LayoutEmpty from '@/components/commons/layout/LayoutEmpty';
import { MotionParent } from '@/components/MotionItems';

const useRoleLayout = (pathname: string) => {
  const { data } = useSession();

  const Empty = (page: any) => <LayoutEmpty>{page}</LayoutEmpty>;
  Empty.displayName = 'Empty';

  // console.log('session -- > : ', data);
  if (!data?.user) {
    return Empty;
  }

  if (data?.user?.accountType === 'COMPANY') {
    const CompanyLayout = (page: any) => <LayoutCompany>{page}</LayoutCompany>;
    CompanyLayout.displayName = 'DBCompany';

    return CompanyLayout;
  } else if (data?.user?.accountType === 'AFFILIATE') {
    const AffiliateLayout = (page: any) => <LayoutEmpty>{page}</LayoutEmpty>;
    AffiliateLayout.displayName = 'DBClient';

    return AffiliateLayout;
  } else if (data.user.accountType === 'APPLICANT') {
    const ApplicantLayout = (page: any) => <Applicant>{page}</Applicant>;
    ApplicantLayout.displayName = 'Empty';

    return ApplicantLayout;
  } else {
    return Empty;
  }
};

type Cleanup = () => void;

export const useTransitionFix = (): Cleanup => {
  const cleanupRef = useRef<Cleanup>(() => null);

  useEffect(() => {
    const changeListener = () => {
      // Create a clone of every <style> and <link> that currently affects the page. It doesn't
      // matter if Next.js is going to remove them or not since we are going to remove the copies
      // ourselves later on when the transition finishes.
      const nodes = document.querySelectorAll(
        'link[rel=stylesheet], style:not([media=x])',
      );
      const copies = [...nodes].map((el) => el.cloneNode(true) as HTMLElement);

      for (const copy of copies) {
        // Remove Next.js' data attributes so the copies are not removed from the DOM in the route
        // change process.
        copy.removeAttribute('data-n-p');
        copy.removeAttribute('data-n-href');

        // Add duplicated nodes to the DOM.
        document.head.appendChild(copy);
      }

      cleanupRef.current = () => {
        for (const copy of copies) {
          // Remove previous page's styles after the transition has finalized.
          document.head.removeChild(copy);
        }
      };
    };

    Router.events.on('beforeHistoryChange', changeListener);

    return () => {
      Router.events.off('beforeHistoryChange', changeListener);
      cleanupRef.current();
    };
  }, []);

  // Return an fixed reference function that calls the internal cleanup reference.
  return useCallback(() => {
    cleanupRef.current();
  }, []);
};

const LayoutContents = ({ children }: any) => {
  const { pathname } = useRouter();

  const getLayout = useRoleLayout(pathname);
  const transitionCallback = useTransitionFix();

  return getLayout(
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            zIndex: 99999,
          },
          error: {
            style: {
              border: 'thin solid red',
              backgroundColor: '#FFEFEF',
            },
          },
        }}
      />

      <AnimatePresence
        mode="wait"
        custom={{ pathname }}
        onExitComplete={() => {
          transitionCallback();
          window.scrollTo(0, 0);
        }}
      >
        <motion.main key={pathname}>
          <MotionParent>{children}</MotionParent>
        </motion.main>
      </AnimatePresence>
    </>,
  );
};

export default LayoutContents;
