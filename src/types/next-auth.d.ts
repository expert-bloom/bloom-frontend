import { type DefaultSession } from 'next-auth';
import type { DiscriminatorType } from '@/models/User/discriminators';
import { type ICompany } from '@/models/Company';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: {
      image?: string;
      name: string;
      email: string;
      role: DiscriminatorType;
      company: ICompany | string;
    };
  }
}
