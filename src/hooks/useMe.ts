import { useEffect } from 'react';

import { useMeQuery } from '@/graphql/client/gql/schema';
import { useResponseErrorHandler } from '@/hooks/useResponseErrorHandler';

function useMe() {
  const mePayload = useMeQuery({
    // skip: !session?.user?.id,
    nextFetchPolicy: 'network-only',
  });
  const { data, loading, error } = mePayload;

  useEffect(() => {
    console.log('mePayload : ', mePayload);

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
