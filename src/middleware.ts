import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { AccountType } from '@/graphql/client/gql/schema';

/* const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });

  console.log(
    'token ------------------------------- : ',
    JSON.stringify(token, null, 2),
  );

  if (token == null) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (request.nextUrl.pathname === '/company') {
    // todo : check if user is client or freelancer
    if (token.accountType === 'COMPANY')
      return NextResponse.redirect(new URL('/company/dashboard', request.url));
  }

  return NextResponse.next();
} */

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token: any = await getToken({ req: request, secret });

  console.log(
    'middleware token ------------------------------- : ',
    JSON.stringify(token, null, 2),
    'pathname',
    request.nextUrl.pathname,
  );

  if (request.nextUrl.pathname.startsWith('/auth') && token?.accountType) {
    if (token?.accountType === 'APPLICANT') {
      return NextResponse.redirect(
        new URL('/applicant/dashboard', request.url),
      );
    }

    if (token?.accountType === 'COMPANY') {
      return NextResponse.redirect(new URL('/company/dashboard', request.url));
    }

    return NextResponse.redirect(new URL('/404', request.url));
  }

  if (request.nextUrl.pathname === '/' && token?.id) {
    if (token?.accountType === 'APPLICANT') {
      return NextResponse.redirect(
        new URL('/applicant/dashboard', request.url),
      );
    }

    if (token?.accountType === 'COMPANY') {
      return NextResponse.redirect(new URL('/company/dashboard', request.url));
    }
  }

  if (
    request.nextUrl.pathname.startsWith('/applicant') &&
    token?.accountType !== 'APPLICANT'
  ) {
    return NextResponse.redirect(new URL('/404', request.url));
  }

  if (
    request.nextUrl.pathname.startsWith('/company') &&
    token?.accountType !== 'COMPANY'
  ) {
    return NextResponse.redirect(new URL('/404', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/applicant/:path*',
    '/company/:path*',
    '/auth/login',
    '/auth/register',
  ],
};

// See "Matching Paths" below to learn more
