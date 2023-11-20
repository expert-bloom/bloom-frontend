import React from 'react';

import { Container, Stack, Typography } from '@mui/material';

import useMe from '@/hooks/useMe';
import AccountSteps from '@/scenes/Company/DashboardCompany/AccountSteps';
import CompanyProfile from '@/scenes/Company/DashboardCompany/CompanyProfile';
import FAQ from '@/scenes/Company/DashboardCompany/FAQ';
import HowItWork from '@/scenes/Company/DashboardCompany/HowItWork';
import MarketPlace from '@/scenes/Company/DashboardCompany/MarketPlace';

import s from './db-comp.module.scss';

const DashboardCompany = () => {
  const { me } = useMe();

  return (
    <div className={s.container}>
      <Container maxWidth={'xl' as any} className={s.wrapper}>
        <Typography variant="h5" className={s.greeting} fontWeight={300}>
          Welcome back,{' '}
          <b>
            {me?.firstName} {me?.lastName}
          </b>
        </Typography>

        <div className={s.content}>
          <MarketPlace />

          <Stack gap="2rem">
            <div className={s.how_it_work}>
              <HowItWork />
            </div>

            <div className={s.faq}>
              <FAQ />
            </div>
          </Stack>

          <Stack gap="2rem">
            <div className={s.profile}>
              <CompanyProfile />
            </div>

            <div className={s.account_steps}>
              <AccountSteps />
            </div>
          </Stack>
        </div>
      </Container>
    </div>
  );
};

export default DashboardCompany;
