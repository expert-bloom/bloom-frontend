import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthTypeKeys } from '@/constants';
import {
  type AuthAccountPayload,
  SignUpDocument,
  type SignUpInput,
  type SignUpMutation,
  type SignUpMutationVariables,
} from '@/graphql/client/gql/schema';
import apollo from '@/lib/apollo';

export default CredentialsProvider<Record<string, any>>({
  id: AuthTypeKeys.SIGNUP,
  name: AuthTypeKeys.SIGNUP,
  credentials: {},
  async authorize(credential) {
    if (credential === undefined) {
      throw new Error('credential is required');
    }

    console.log('signup ------------------------------ ');

    try {
      const { email, password, country, lastName, firstName, accountType } =
        credential as SignUpInput;

      const queryRes = await apollo.mutate<
        SignUpMutation,
        SignUpMutationVariables
      >({
        mutation: SignUpDocument,
        variables: {
          input: {
            email,
            password,
            country,
            lastName,
            firstName,
            accountType,
          },
        },
      });

      const { data, errors } = queryRes;

      console.log('queryRes  : ', data);

      if (errors !== undefined) {
        throw new Error(errors.map((e: any) => e.message).join(', '));
      }

      if (data === undefined || data === null) {
        throw new Error('Something Wrong!');
      }

      if (data.signUp.errors.length > 0) {
        throw new Error(
          data.signUp.errors.map((e: any) => e.message).join(', '),
        );
      }

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data?.signUp?.account) {
        const { account } = data.signUp;
        return account satisfies AuthAccountPayload;
      }

      return null;
    } catch (err: any) {
      console.log('err : ', err);
      throw new Error(err.message ?? 'Something went wrong');
    }
  },
});
