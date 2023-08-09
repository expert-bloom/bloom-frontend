import { useRef } from 'react';
import { capitalize } from '@/utils';
import { type AccountType } from '@/graphql/client/gql/schema';
import Cookies from 'js-cookie';

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
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`,
    );

    newWindow?.focus();
  };

  const withSocial = (
    authType: 'login' | 'signup',
    social: 'google' | 'github',
    clientType: AccountType | null,
  ) => {
    // document.cookie = `authType=${authType}`;
    // document.cookie = `clientType=${clientType ?? '-'}`;
    Cookies.remove('authType');
    Cookies.remove('clientType');
    Cookies.set('authType', authType);
    Cookies.set('clientType', clientType ?? '-');

    popupCenter(
      `/auth/sign-in/?social=${social}`,
      `${capitalize(social)} Sign In`,
    );
  };

  return {
    withSocial,
    windowRef,
  };
}
