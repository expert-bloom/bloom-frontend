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
    if (error) {
      console.error(error);
      if (isShowToast) {
        toast.error(
          message ||
            error.message ||
            'Something went wrong, please try again later',
        );
      }
    }
  }, [error]);
}
