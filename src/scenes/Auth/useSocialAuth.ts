import { useRef } from 'react';

import Cookies, { type CookieAttributes } from 'js-cookie';

import { type AccountType } from '@/graphql/client/gql/schema';
import { capitalize } from '@/utils';

export type AuthType = 'login' | 'signup';
export type SocialAuthType = 'google' | 'github';

export default function useSocialAuth() {
  const windowRef = useRef<Window | null>(null);

  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      'loading ...',
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`,
    );

    newWindow?.focus();
  };

  const withSocial = (
    authType: AuthType,
    social: SocialAuthType,
    clientType: AccountType | null,
  ) => {
    // document.cookie = `authType=${authType}`;
    // document.cookie = `clientType=${clientType ?? '-'}`;

    const opt: CookieAttributes = {
      // domain: process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
      sameSite: 'None',
      secure: true,
      path: '/',
      expires: 20,
    };

    console.log('domain : ', opt.domain);

    // Cookies.remove('authType');
    // Cookies.remove('clientType');

    Cookies.set('authType', authType, opt);
    Cookies.set('clientType', clientType ?? '-', opt);
    Cookies.set('test-auth-type', clientType ?? '-', opt);

    popupCenter(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup/${social}/?authType=${authType}&clientType=${clientType}`,
      `${capitalize(social)} Sign In`,
    );
  };

  return {
    withSocial,
    windowRef,
  };
}
