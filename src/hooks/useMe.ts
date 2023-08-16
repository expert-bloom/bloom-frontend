import { useSession } from 'next-auth/react';

import { useMeQuery } from '@/graphql/client/gql/schema';

function useMe() {
  const { data: session } = useSession();

  const mePayload = useMeQuery({
    skip: !session?.user?.id,
    variables: {
      input: {
        accountId: session?.user?.id as string,
      },
    },
  });
  const { data, loading, error } = mePayload;

  return {
    me: data?.me,
    mePayload,
    loading,
    error,
  };
}

export default useMe;
