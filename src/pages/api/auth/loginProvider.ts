import CredentialsProvider from 'next-auth/providers/credentials';

import { AuthTypeKeys } from '@/constants';
import type {
  AuthAccountPayload,
  LoginMutation,
  LoginMutationVariables,
} from '@/graphql/client/gql/schema';
import { LoginDocument } from '@/graphql/client/gql/schema';
import apollo from '@/lib/apollo';

export default CredentialsProvider({
  id: AuthTypeKeys.LOGIN,
  name: AuthTypeKeys.LOGIN,
  credentials: {},
  async authorize(credential) {
    const { email, password } = credential as Record<string, string>;

    console.log('userName: ', password, email);

    try {
      const queryRes = await apollo.mutate<
        LoginMutation,
        LoginMutationVariables
      >({
        mutation: LoginDocument,
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      const { data, errors } = queryRes;

      console.log('login query Res  : ', data);

      if (errors !== undefined && errors.length > 0) {
        throw new Error(errors.map((e: any) => e.message).join(', '));
      }

      if (data === undefined || data === null) {
        throw new Error('Something Wrong!');
      }

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.logIn && data.logIn.errors.length > 0) {
        throw new Error(
          data.logIn.errors.map((e: any) => e.message).join(', '),
        );
      }

      if (data.logIn.account !== undefined && data.logIn.account !== null) {
        const { account } = data.logIn;
        return account satisfies AuthAccountPayload;
      }

      return null;
    } catch (err: any) {
      console.log('err : ', err);
      throw new Error(err.message ?? 'Something went wrong');
    }
  },
});
