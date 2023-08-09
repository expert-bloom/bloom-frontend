import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import LayoutCompany from '@/components/commons/layout/DBCompany';
import LayoutEmpty from '@/components/commons/layout/LayoutEmpty';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const useRoleLayout = (pathname: string) => {
  const { data } = useSession();

  console.log('session -- > : ', data);

  if (data?.user?.role === 'TypeCompany') {
    const DBCompany = (page: any) => <LayoutCompany>{page}</LayoutCompany>;
    DBCompany.displayName = 'DBCompany';

    return DBCompany;
  } else if (data?.user?.role === 'TypeFreelancer') {
    const DBClient = (page: any) => <LayoutEmpty>{page}</LayoutEmpty>;
    DBClient.displayName = 'DBClient';

    return DBClient;
  } else {
    const Empty = (page: any) => <LayoutEmpty>{page}</LayoutEmpty>;
    Empty.displayName = 'Empty';

    return Empty;
  }
};

const LayoutContents = ({ children }: any) => {
  const { pathname } = useRouter();

  const getLayout = useRoleLayout(pathname);

  return (
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
      <AnimatePresence>{getLayout(children)}</AnimatePresence>
    </>
  );
};

export default LayoutContents;
