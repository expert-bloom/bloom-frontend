import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import { useMeQuery } from '@/graphql/client/gql/schema';
import { useResponseErrorHandler } from '@/hooks/useResponseErrorHandler';

function useMe() {
  const { data: session } = useSession();

  const mePayload = useMeQuery({
    skip: !session?.user?.id,
    // nextFetchPolicy: 'cache-and-network',
    variables: {
      input: {
        accountId: session?.user?.id as string,
      },
    },
  });
  const { data, loading, error } = mePayload;

  useEffect(() => {
    if (error) {
      console.log('mePayload: ', mePayload);
      console.log('me: ', mePayload.data?.me);
    }
  }, [mePayload]);

  useResponseErrorHandler(error, 'Error getting me !');

  return {
    me: data?.me,
    mePayload,
    loading,
    error,
  };
}

export default useMe;
