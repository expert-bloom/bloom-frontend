import React from 'react';

import { Stack, Typography } from '@mui/material';
import Image from 'next/image';

import useMe from '@/hooks/useMe';

import HowItWork from './ConfirmEmail';
import s from './db-comp.module.scss';
import EditProfile from './EditProfile';
import Placeholder from './img_2.png';

const DashboardCompany = () => {
  const { me } = useMe();

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Typography variant="h5" className={s.greeting}>
          Welcome back, {me?.firstName} {me?.lastName}
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
              <EditProfile />
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default DashboardCompany;
