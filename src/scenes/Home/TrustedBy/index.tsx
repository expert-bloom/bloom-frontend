import React from 'react';
import s from './trustedby.module.scss';
import { Typography } from '@mui/material';
import HorizontalMarquee from '@/components/HorizontalMarquee';

import Logo1 from '@/public/assets/logo-ipsum/Vector-1.png';
import Logo2 from '@/public/assets/logo-ipsum/Vector-2.png';
import Logo3 from '@/public/assets/logo-ipsum/Vector-3.png';
import Logo4 from '@/public/assets/logo-ipsum/Vector-4.png';
import Logo5 from '@/public/assets/logo-ipsum/Vector-5.png';
import Logo6 from '@/public/assets/logo-ipsum/Vector-6.png';
import Logo7 from '@/public/assets/logo-ipsum/Vector-7.png';
import Image from 'next/image';

const logos = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7];

const TrustedBy = () => {
  return (
    <div className={s.container}>
      <HorizontalMarquee baseVelocity={2}>
        <Typography className={s.txt}>Trusted by</Typography>
      </HorizontalMarquee>

      <div className={s.logo_container}>
        <HorizontalMarquee baseVelocity={1} noOfChildren={3}>
          <div className={s.logo_ipsum}>
            {logos.map((logo) => (
              <Image src={logo} alt="logo ipsum icon" key={logo.src} />
            ))}
          </div>
        </HorizontalMarquee>
      </div>
    </div>
  );
};

export default TrustedBy;
