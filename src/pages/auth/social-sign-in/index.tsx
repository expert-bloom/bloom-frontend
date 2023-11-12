import React, { useEffect, useLayoutEffect } from 'react';

import { Stack, Typography } from '@mui/material';
import { type CookieAttributes } from 'js-cookie';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import useMe from '@/hooks/useMe';
import s from '@/pages/auth/social-sign-in/signin.module.scss';

const SocialSignIn = () => {
  const { me, mePayload } = useMe();
  const {
    error,
    social,
    clientType,
    start = false,
    success = false,
  } = useRouter().query;
  const router = useRouter();

  console.log('query : ', router.query);

  if (me?.id) {
    console.log('closing window ----> ');
    toast.loading('Closing widnow ----> ');
    // window.close();
  }

  useLayoutEffect(() => {
    if (start && social && clientType) {
      // `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup/${social}/?authType=${authType}&clientType=${clientType}`,

      // go to social auth
      window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup/${social}/?clientType=${clientType}`;
      console.log('goooooo');
    }
  }, [start, social, clientType]);

  useEffect(() => {
    if (error) {
      let message = error;
      if (['OAuthCallback', 'OAuthSignin'].includes(error as string))
        message = 'Account or Network Error!';

      window.opener?.postMessage({
        type: 'auth',
        social: (function () {
          return social;
        })(),
        status: 'error',
        message,
        data: null,
      });

      window.close();
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      void mePayload
        .refetch()
        .then((res) => {
          console.log('me refetch : ', res);

          if (res.errors?.length) {
            window.opener?.postMessage({
              type: 'auth',
              social: (function () {
                return social;
              })(),
              status: 'error',
              message: res.errors.map((er) => er.message).join(', '),
              data: null,
            });
            window.close();
            return;
          }

          if (res.data.me?.id) {
            window.opener?.postMessage({
              type: 'auth',
              social: (function () {
                return social;
              })(),
              status: 'success',
              message: 'Successfully logged in',
              data: null,
            });

            const opt: CookieAttributes = {
              // domain: process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
              sameSite: 'lax', // secure: true,
              path: '/',
              expires: 20,
            };

            // mePayload.client.

            // Cookies.set('test-auth', Cookies.get('authorization') ?? '-', opt);

            window.close();
          } else {
            window.opener?.postMessage({
              type: 'auth',
              social: (function () {
                return social;
              })(),
              status: 'error',
              message: 'Faild to Fetch Me query',
              data: null,
            });

            window.close();
          }
        })
        .catch((err) => {
          console.log('err : ', err);
          toast.error('error fetching me ----');
        });
    }
  }, [success]);

  return (
    <div
      className={s.container}
      style={{ display: 'grid', height: '100vh', placeItems: 'center' }}
    >
      <Stack gap="1.5rem" alignItems="center">
        <svg
          width="63"
          height="63"
          viewBox="0 0 63 63"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M42.5563 11.9816C39.484 10.3071 35.8575 9.29097 32.3354 9.13521C28.6443 8.92888 24.8295 9.72318 21.3336 11.4129C20.9123 11.5901 20.5376 11.8101 20.1722 12.0249L20.0108 12.1179C19.8774 12.1951 19.7441 12.2724 19.608 12.3536C19.3253 12.5146 19.0492 12.6744 18.7544 12.8792C18.5463 13.0329 18.3395 13.1759 18.1301 13.323C17.5658 13.7208 16.9868 14.1317 16.4983 14.5979C14.8476 15.9524 13.5571 17.6075 12.6071 18.9214C10.4365 22.1566 9.08622 25.9567 8.80702 29.6143L8.7764 30.1588C8.73328 30.9196 8.68476 31.7057 8.75353 32.4555C8.76648 32.6084 8.7661 32.7638 8.77506 32.914C8.78895 33.229 8.80152 33.5373 8.846 33.8672L9.07396 35.4221C9.09756 35.5764 9.1198 35.7413 9.1633 35.9263L9.65919 37.9272L10.138 39.2823C10.2729 39.6673 10.4158 40.0751 10.6 40.43C12.0292 43.637 14.1425 46.4578 16.7063 48.585C19.0508 50.5296 21.824 52.0023 24.7491 52.8452L26.2371 53.2376C26.3781 53.2693 26.4926 53.2889 26.6031 53.3058L26.7775 53.3311C27.0052 53.3636 27.2195 53.3986 27.4445 53.435C27.8598 53.5076 28.2672 53.5748 28.7079 53.6183L30.5641 53.7229C30.9516 53.7249 31.3352 53.7068 31.7081 53.6874C31.9039 53.681 32.0984 53.6681 32.3288 53.662C34.5253 53.4772 36.5106 53.0634 38.0516 52.4652C38.1769 52.4171 38.3008 52.3796 38.4234 52.3355C38.6727 52.2499 38.9259 52.167 39.1432 52.0599L40.8591 51.2626L42.5702 50.266C42.9009 50.0682 43.0205 49.6414 42.8282 49.2984C42.632 48.9526 42.2034 48.8308 41.8634 49.0166L40.1792 49.9218L38.4995 50.6224C38.3169 50.6953 38.121 50.7534 37.9224 50.8155C37.7838 50.8489 37.6518 50.8983 37.5012 50.9408C36.0711 51.435 34.2445 51.7425 32.244 51.8346C32.0442 51.8383 31.8471 51.8379 31.654 51.8403C31.3051 51.8414 30.9602 51.8451 30.6392 51.8305L28.9177 51.6725C28.5476 51.619 28.1695 51.5427 27.7848 51.4678C27.5639 51.4167 27.3376 51.3737 27.1299 51.3374L26.9529 51.2987C26.8704 51.2834 26.7772 51.2667 26.7333 51.2543L25.3466 50.8322C22.7651 49.9789 20.33 48.5729 18.2942 46.7557C16.1056 44.7951 14.3339 42.2335 13.1742 39.3582C12.0276 36.6013 11.5988 33.2792 11.9716 30.0076C12.3145 27.0213 13.3948 24.1635 15.1858 21.5083C15.3034 21.3339 15.421 21.1596 15.5212 21.0196C16.4309 19.8688 17.5408 18.5589 18.9483 17.496C19.3367 17.1525 19.7862 16.856 20.2611 16.5478C20.4878 16.4009 20.7079 16.2553 20.8907 16.1306C21.0974 16.0048 21.3188 15.8831 21.5348 15.7694C21.6761 15.6975 21.8162 15.619 21.9388 15.5576L22.1002 15.4646C22.4002 15.3037 22.6749 15.1546 22.9908 15.039L24.1186 14.5715C24.3399 14.4844 24.5718 14.4159 24.7997 14.3447C24.953 14.2982 25.0982 14.2635 25.2635 14.2078C25.786 14.0182 26.3283 13.9112 26.9105 13.7965C27.117 13.7571 27.3302 13.7163 27.5608 13.6585C27.7553 13.611 27.9737 13.5969 28.2082 13.5762C28.364 13.5603 28.5172 13.5483 28.6318 13.5333C28.7876 13.5173 28.9342 13.5066 29.0927 13.4867C29.3285 13.4555 29.5456 13.4347 29.7494 13.4337C30.0237 13.44 30.2994 13.4357 30.5777 13.4274C31.0811 13.421 31.5579 13.4197 32.0318 13.4914C34.9664 13.7352 37.7144 14.6085 40.2052 16.0868C42.3489 17.3655 44.2716 19.1525 45.7607 21.264C47.0255 23.0628 47.9756 25.0528 48.4928 27.0393C48.572 27.3176 48.6299 27.5931 48.6839 27.8659C48.7154 28.0428 48.7563 28.2145 48.7892 28.3636C48.8037 28.4541 48.8208 28.5406 48.8445 28.6258C48.8749 28.7443 48.8986 28.864 48.9116 28.9651L48.9793 29.6047C48.9922 29.7748 49.0132 29.9331 49.0301 30.0887C49.0668 30.3268 49.0889 30.5608 49.0964 30.7561L49.1083 31.9001C49.1312 32.3307 49.089 32.7116 49.0522 33.0673C49.0384 33.2598 49.0126 33.4443 49.0123 33.5824C48.9961 33.6926 48.9918 33.7935 48.9836 33.8917C48.9753 34.0072 48.9724 34.1148 48.9414 34.2554L48.5449 36.3059C48.3134 37.8623 49.3793 39.3365 50.9488 39.5822C52.0417 39.7601 53.1536 39.2819 53.7711 38.3664C54.0063 38.0176 54.1604 37.6257 54.2227 37.2064L54.5217 35.2574C54.5514 35.0756 54.572 34.83 54.5846 34.5791L54.6028 34.2338C54.6098 34.0598 54.6223 33.8779 54.6347 33.6788C54.6734 33.1052 54.7163 32.4479 54.6619 31.8058L54.5867 30.4289C54.5622 30.0952 54.5097 29.76 54.4559 29.4181C54.431 29.2572 54.4048 29.0896 54.3826 28.9074L54.2687 28.104C54.2332 27.9244 54.1804 27.7273 54.1329 27.5396L54.0643 27.2454C54.0195 27.071 53.9773 26.8927 53.9338 26.7076C53.8455 26.3309 53.7479 25.9422 53.613 25.5571C52.84 23.0292 51.5383 20.5194 49.8338 18.2799C47.8544 15.682 45.3333 13.5087 42.5563 11.9816Z"
            fill="#8b8cf8"
          />
        </svg>
        <Typography variant="h5">Authenticating ...</Typography>
      </Stack>
    </div>
  );
};

SocialSignIn.signIn = true;

export default SocialSignIn;
