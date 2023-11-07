import React from 'react';

import { useNextCssRemovalPrevention } from '@madeinhaus/nextjs-page-transition';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

import FixedLayer from '@/components/commons/FixedLayer';
import Applicant from '@/components/Layout/Applicant';
import LayoutEmpty from '@/components/Layout/LayoutEmpty';
import { MotionParent } from '@/components/MotionItems';
import useMe from '@/hooks/useMe';
import LayoutCompany from 'src/components/Layout/Company';

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

const LayoutContents = ({ children }: any) => {
  const { pathname } = useRouter();

  const getLayout = useRoleLayout(pathname);
  const removeUnusedStyles = useNextCssRemovalPrevention();

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
