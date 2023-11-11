import React, { useEffect } from 'react';

import { useNextCssRemovalPrevention } from '@madeinhaus/nextjs-page-transition';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { toast, Toaster } from 'react-hot-toast';

import FixedLayer from '@/components/commons/FixedLayer';
import Applicant from '@/components/Layout/Applicant';
import LayoutEmpty from '@/components/Layout/LayoutEmpty';
import Loader from '@/components/Loader';
import { MotionParent } from '@/components/MotionItems';
import useMe from '@/hooks/useMe';
import LayoutCompany from 'src/components/Layout/Company';

import s from './layout.module.scss';

const useRoleLayout = (pathname: string) => {
  const { me } = useMe();

  const Empty = (page: any) => <LayoutEmpty>{page}</LayoutEmpty>;
  Empty.displayName = 'Empty';

  // console.log('session -- > : ', data);
  if (!me) {
    return Empty;
  }

  if (me?.accountType === 'COMPANY') {
    const CompanyLayout = (page: any) => <LayoutCompany>{page}</LayoutCompany>;
    CompanyLayout.displayName = 'DBCompany';

    return CompanyLayout;
  } else if (me?.accountType === 'AFFILIATE') {
    const AffiliateLayout = (page: any) => <LayoutEmpty>{page}</LayoutEmpty>;
    AffiliateLayout.displayName = 'DBClient';

    return AffiliateLayout;
  } else if (me?.accountType === 'APPLICANT') {
    const ApplicantLayout = (page: any) => <Applicant>{page}</Applicant>;
    ApplicantLayout.displayName = 'Empty';

    return ApplicantLayout;
  } else {
    return Empty;
  }
};

const LoadingSpinner = () => (
  <div className={s.loader}>
    <Loader
      style={{
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
      }}
    />
  </div>
);

let loadingId: string | undefined;

const LayoutContents = ({ children }: any) => {
  const router = useRouter();
  const { pathname } = router;

  const { me, mePayload } = useMe();

  const getLayout = useRoleLayout(pathname);
  const removeUnusedStyles = useNextCssRemovalPrevention();

  // handle protected routes

  useEffect(() => {
    if (mePayload.loading && me?.id && !loadingId) {
      loadingId = toast.loading('loading ... ');
    }

    if (!mePayload.loading && loadingId) {
      toast.dismiss(loadingId);
      loadingId = undefined;
    }
  }, [me]);

  if (mePayload.loading && !me?.id) {
    return <LoadingSpinner />;
  }

  if (router.pathname.startsWith('/activate') && !me?.id) {
    void router.replace('/404');
    return <LoadingSpinner />;
  }

  if (
    (router.pathname.startsWith('/auth') || router.pathname === '/') &&
    me?.id
  ) {
    if (me?.accountType === 'APPLICANT') {
      void router.replace('/applicant/dashboard');
      return <LoadingSpinner />;
    } else if (me?.accountType === 'COMPANY') {
      void router.replace('/company/dashboard');
      return <LoadingSpinner />;
    } else {
      void router.replace('/404');
      return <LoadingSpinner />;
    }
  }

  if (
    router.pathname.startsWith('/applicant') &&
    me?.accountType !== 'APPLICANT'
  ) {
    void router.replace('/auth/login');
    return <LoadingSpinner />;
  }

  if (router.pathname.startsWith('/company') && me?.accountType !== 'COMPANY') {
    void router.replace('/auth/login');
    return <LoadingSpinner />;
  }

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
          removeUnusedStyles();
          window.scrollTo(0, 0);
        }}
      >
        <FixedLayer />

        <MotionParent key={pathname}>{children}</MotionParent>
      </AnimatePresence>
    </>,
  );
};

export default LayoutContents;
