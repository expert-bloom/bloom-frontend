import React from 'react';

// getserversideprops and fetch it using the id
import { GetServerSideProps } from 'next';

import { useGetJobPostQuery } from '@/graphql/client';

interface Props {
  id: string;
}

// async function getS

const ProfileView = () => {
  return <div></div>;
};

export default ProfileView;
