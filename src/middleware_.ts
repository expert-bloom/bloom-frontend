import * as jose from 'jose';
import { type NextRequest, NextResponse } from 'next/server';

const secret: any = process.env.JWT_SECRET;

export async function middleware(request: NextRequest) {
  let token: any = {};

  // const rawJwt = request.cookies.get('authorization')?.value;
  const rawJwt = request.headers.get('Authorization');
  const s2 = new TextEncoder().encode(secret);
  if (rawJwt && s2) {
    token = await jose
      .jwtVerify(rawJwt, s2, {
        issuer: 'bloom-experts',
        algorithms: ['HS256'],
      })
      .then((res) => res.payload);
  }

  // console.log('token : ', token, rawJwt);
  console.log('secret  : ', request.headers.has('Authorization'));

  if (request.nextUrl.pathname.startsWith('/activate') && !token?.accountType) {
    return NextResponse.redirect(new URL('/404', request.url));
  }

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
    '/activate/:path*',
  ],
};

// See "Matching Paths" below to learn more
