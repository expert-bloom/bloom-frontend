/* eslint-disable no-extra-boolean-cast */
import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { type NextApiRequest, type NextApiResponse } from 'next';
import LoginProvider from './loginProvider';
import SignupProvider from './signupProvider';
import apollo from '@/lib/apollo';
import {
  FindAccountDocument,
  type FindAccountQuery,
  type FindAccountQueryVariables,
  SignUpOAuthDocument,
  type SignUpOAuthMutation,
  type SignUpOAuthMutationVariables,
} from '@/graphql/client/gql/schema';
import { type Awaitable, type User } from 'next-auth/src';

const getOptions: (req: NextApiRequest) => NextAuthOptions = (req) => ({
  // Configure one or more authentication providers
  events: {
    // implement all event handlers
    signIn: async (message) => {
      // console.log('signIn event ---> ', message);
    },
    signOut: async (message) => {
      // console.log('signOut event ---> ', message);
    },
    createUser: async (message) => {
      // console.log('createUser event ---> ', message);
    },
    linkAccount: async (message) => {
      // console.log('linkAccount event ---> ', message);
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(
        'signIn callback ---> ',
        'request cookies ::   ',
        req.cookies,
        'user : ',
        user,
        'account : ',
        account,
        'profile : ',
        profile,
        'email : ',
        email,
        'credentials : ',
        JSON.stringify(credentials, null, 2),
      );

      /*
      *
      *  provider: 'github',
    type: 'oauth',
    providerAccountId: '54037700',
    access_token: 'ghu_h6QQzmqKh7MJjHxjYPotiX0S60g4Cb15eDdu',
    expires_at: 1691559679,
    refresh_token: 'ghr_V2MUizsOPUZEgNr1wAtermaqNb6MitXFbjp4m9cVTHGDdOvBxR8XxKFZcbwWGhgkeS7Ygs4YheN5',
    refresh_token_expires_in: 15897599,
    token_type: 'bearer',
    scope: ''

      *
      *
      * */

      // return '/auth/sign-in/?error=foolish';

      if (account?.type === 'credentials' && Boolean(user)) {
        return true;
      } else if (
        account?.provider === 'google' ||
        account?.provider === 'github'
      ) {
        const redirectUrl = '/auth/sign-in';
        const clientType: any = req.cookies.clientType;
        const authType: any = req.cookies.authType;

        try {
          // check if account exist
          const findAccountPayload = await apollo.query<
            FindAccountQuery,
            FindAccountQueryVariables
          >({
            query: FindAccountDocument,
            fetchPolicy: 'network-only',
            variables: {
              input: {
                email: user.email,
              },
            },
          });

          console.log('find accoutn payload :  ', findAccountPayload);

          if (
            !Boolean(findAccountPayload.data.findAccount?.account?.id) &&
            authType === 'login'
          ) {
            return `${redirectUrl}/?error=Account Not Found!`;
          }

          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (findAccountPayload.data.findAccount?.account?.id) {
            if (authType === 'signup') {
              return `${redirectUrl}/?error=Account Already Exist, Please login!`;
            } else if (authType === 'login') {
              return true;
            }
          } else if (authType === 'signup') {
            const signUpPayload = await apollo.mutate<
              SignUpOAuthMutation,
              SignUpOAuthMutationVariables
            >({
              mutation: SignUpOAuthDocument,
              variables: {
                input: {
                  OAuth: {
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    accessToken: account.access_token ?? '-',
                    expires: new Date(account.expires_at ?? new Date()),
                    tokenType: account.token_type ?? '-',
                  },
                  account: {
                    email: user.email ?? '-',
                    image: user.image,
                    accountType: clientType,
                    userName: user.name,
                    firstName: (user as any).firstName,
                    lastName: (user as any).lastName,
                  },
                },
              },
            });

            const { data, errors } = signUpPayload;

            console.log('login query Res  : ', data);

            if (errors !== undefined && errors.length > 0) {
              return `${redirectUrl}/?error=${errors
                .map((e: any) => e.message)
                .join(', ')}`;
            }

            if (data === undefined || data === null) {
              return `${redirectUrl}/?error=Something goes wrong signing-up!`;
            }

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.signUpOAuth && data.signUpOAuth.errors.length > 0) {
              return `${redirectUrl}/?error=${data.signUpOAuth.errors
                .map((e: any) => e.message)
                .join(', ')}`;
            }

            if (
              data.signUpOAuth.account !== undefined &&
              data.signUpOAuth.account !== null
            ) {
              const { account } = data.signUpOAuth;

              console.log('SIGN-Up success ----->   ', account);

              return true;
            }
          }
          return false;
        } catch (err: any) {
          console.log('err : ', err);
          return `${redirectUrl}/?error=${
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            err.message ?? 'Something went wrong'
          }`;
        }
      } else {
        return '/404';
      }

      // return account?.type === 'credentials' && Boolean(user) ? true : '/404';
    } /* async redirect({ url, baseUrl }) {
      console.log('redirect callback ---> ', 'url', url, 'baseUrl', baseUrl);

      return url ?? baseUrl;
    }, */,
    async jwt({ token, user, account, profile, trigger, session }) {
      console.log(
        'jwt callback ---------> ',
        'token:',
        token,
        'user: ',
        user,
        'account: ',
        account,
        'profile: ',
        profile,
        ', Trigger: ',
        trigger,
        ', Session: ',
        session,
      );
      if (trigger === 'signIn' && account?.type === 'credentials') {
        return {
          ...token,
          ...user,
        };
      }

      if (trigger === 'signIn' && account?.type === 'oauth') {
        // // fetch the user from the database for th session

        const account = await apollo.query<
          FindAccountQuery,
          FindAccountQueryVariables
        >({
          query: FindAccountDocument,
          fetchPolicy: 'network-only',
          variables: {
            input: {
              email: user.email,
            },
          },
        });

        return {
          ...token,
          ...account.data.findAccount?.account,
        };
      }

      if (trigger === 'update') {
        // // fetch the user from the database for th session
        return {
          ...token,
          ...user,
        };
      }

      return {
        ...token,
        ...user,
      };
    },
    async session({ session, token, user }) {
      /* console.log(
        'session callback ---> ',
        'session',
        session,
        'token',
        token,
        'user',
        user,
      ); */

      return {
        ...session,
        user: {
          ...(token as any),
        },
      };
    },
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signOut: undefined,
    error: '/auth/sign-in',
    signIn: '/auth/sign-in',
  },
  providers: [
    // custom credentials provider
    LoginProvider,
    SignupProvider,

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      profile(
        profile,
      ): Awaitable<User & { firstName: string; lastName: string }> {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      profile(profile) {
        console.log('github profile --->  ', profile, '  <--- github profile');

        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url, // firstName: profile.name ?? profile.login,
        };
      },
    }),
  ],
});

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return NextAuth(req, res, getOptions(req));
}
