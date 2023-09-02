import { useSession } from 'next-auth/react';

import { useResponseErrorHandler } from '@/components/commons/FixedLayer/ProfileView';
import { useMeQuery } from '@/graphql/client/gql/schema';

function useMe() {
  const { data: session } = useSession();

  const mePayload = useMeQuery({
    skip: !session?.user?.id,
    nextFetchPolicy: 'network-only',
    variables: {
      input: {
        accountId: session?.user?.id as string,
      },
    },
  });
  const { data, loading, error } = mePayload;

  // console.log('mePayload: ', mePayload);

  useResponseErrorHandler(error, 'Error getting me !');

  return {
    me: data?.me,
    mePayload,
    loading,
    error,
  };
}

export default useMe;
