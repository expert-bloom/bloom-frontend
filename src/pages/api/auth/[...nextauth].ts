import cookie from 'cookie';
import { type NextApiRequest, type NextApiResponse } from 'next';
import type { Account, Awaitable, NextAuthOptions, User } from 'next-auth';
import NextAuth from 'next-auth';
import { type AdapterUser } from 'next-auth/adapters';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import {
  type AccountType,
  FindAccountDocument,
  type FindAccountQuery,
  type FindAccountQueryVariables,
  SignUpOAuthDocument,
  type SignUpOAuthMutation,
  type SignUpOAuthMutationVariables,
} from '@/graphql/client/gql/schema';
import apollo from '@/lib/apollo';
import { type AuthType } from '@/scenes/Auth/useSocialAuth';

import LoginProvider from './loginProvider';
import SignupProvider from './signupProvider';

const redirectUrl = '/auth/social-sign-in';

const signUpWithSocial = async (
  user: User | AdapterUser,
  clientType: AccountType,
  account: Account,
) => {
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

  if (errors !== undefined && errors.length > 0) {
    return `${redirectUrl}/?error=${errors
      .map((e: any) => e.message)
      .join(', ')}`;
  }

  if (!data?.signUpOAuth) {
    return `${redirectUrl}/?error=Something goes wrong signing-up!`;
  }

  // check for user errors
  if (data.signUpOAuth.errors.length > 0) {
    return `${redirectUrl}/?error=${data.signUpOAuth.errors
      .map((e: any) => e.message)
      .join(', ')}`;
  }

  if (data.signUpOAuth.account?.id) {
    return true;
  }

  return `${redirectUrl}/?error=Something goes wrong signing-up!`;
};

const getOptions: (
  req: NextApiRequest,
  res: NextApiResponse,
) => NextAuthOptions = (req, res) => ({
  // Configure one or more authentication providers
  events: {
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
      /* console.log(
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
      ); */

      if (account?.type === 'credentials' && Boolean(user)) {
        return true;
      }

      if (account?.provider === 'google' || account?.provider === 'github') {
        const clientType = req.cookies.clientType as AccountType;
        const authType = req.cookies.authType as AuthType;

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
                accountFilter: {
                  email: user.email,
                },
                oAuthFilter: {
                  provider: 'google',
                },
              },
            },
          });

          // console.log('find accoutn payload :  ', findAccountPayload);

          /* if (
            findAccountPayload.data?.findAccount?.account?.oAuthClient
              ?.length &&
            findAccountPayload.data?.findAccount?.account?.oAuthClient?.length >
              0
          ) {

          } */
          if (authType === 'login') {
            if (findAccountPayload.data.findAccount?.account?.id) {
              return true;
            }

            if (!findAccountPayload.data.findAccount?.account?.id) {
              return `${redirectUrl}/?error=Account Not Found!`;
            }
          }

          if (authType === 'signup') {
            if (findAccountPayload.data.findAccount?.account?.id) {
              return `${redirectUrl}/?error=Account Already Exist, Please login!`;
            }

            // signup with social
            return await signUpWithSocial(user, clientType, account);
          }

          return false;
        } catch (err: any) {
          console.log('err : ', err);
          return `${redirectUrl}/?error=${
            err.message ?? 'Something went wrong'
          }`;
        }
      } else {
        return `${redirectUrl}/?error=Invalid Provider`;
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
              accountFilter: {
                email: user.email,
              },
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
    error: '/auth/social-sign-in',
    signIn: '/auth/social-sign-in',
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

    /* EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest(params) {
        const { identifier, url, provider, theme } = params;
        const { host } = new URL(url);

        const transport = createTransport(provider.server);

        const acc = await nodemailer.createTestAccount();

        console.log('sendVerificationRequest : ', params);

        const t2 = createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'henokgetachew500@gmail.com',
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        });

        const result = await t2.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html: html({ url, host, theme }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
        }
      },
    }), */
  ],
});

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return NextAuth(req, res, getOptions(req, res));
}
