// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

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
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/post-job/:path*'],
};
