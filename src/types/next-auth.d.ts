import { type DefaultSession } from 'next-auth';

import { type AccountType } from '@/graphql/client/gql/schema';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      image?: string;
      name: string;
      email: string;
      accountType: AccountType;
      company:
        | ({
            id: string;
          } & Record<string, any>)
        | null;
      applicant: object | null;
      affiliate:
        | ({
            id: string;
          } & Record<string, any>)
        | null;
    };
  }
}
