import { useEffect } from 'react';

import { type ApolloError } from '@apollo/client';
import { toast } from 'react-hot-toast';

export function useResponseErrorHandler(
  error: ApolloError | undefined,
  message: string,
  options?: {
    isShowToast?: boolean;
  },
) {
  const { isShowToast = true } = options ?? {};

  useEffect(() => {
    if (error?.message || error?.graphQLErrors?.length) {
      console.error(error);
      if (isShowToast) {
        toast.error(
          error.message ||
            message ||
            'Something went wrong, please try again later',
        );
      }
    }
  }, [error]);
}
