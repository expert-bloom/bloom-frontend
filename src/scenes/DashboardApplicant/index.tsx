import React from 'react';

import { Stack, Typography } from '@mui/material';
import Image from 'next/image';

import s from './db-comp.module.scss';
import FAQ from './FAQ';
import HowItWork from './HowItWork';
import Placeholder from './img_2.png';

const DashboardCompany = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Typography variant="h5" className={s.greeting}>
          Welcome back, name
        </Typography>

        <div className={s.content}>
          <div className={s.img}>
            <Image src={Placeholder} alt={'placeholder'} />
          </div>

          <Stack gap="1rem">
            <div className={s.how_it_work}>
              <HowItWork />
            </div>

            <div className={s.faq}>
              <FAQ />
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default DashboardCompany;
