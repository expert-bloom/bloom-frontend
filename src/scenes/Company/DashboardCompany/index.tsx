import React from 'react';

import { Stack, Typography } from '@mui/material';

import AccountSteps from '@/scenes/Company/DashboardCompany/AccountSteps';
import CompanyProfile from '@/scenes/Company/DashboardCompany/CompanyProfile';
import FAQ from '@/scenes/Company/DashboardCompany/FAQ';
import HowItWork from '@/scenes/Company/DashboardCompany/HowItWork';
import MarketPlace from '@/scenes/Company/DashboardCompany/MarketPlace';

import s from './db-comp.module.scss';

const DashboardCompany = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Typography variant="h5" className={s.greeting}>
          Welcome back, name
        </Typography>

        <div className={s.content}>
          <div className={s.marketplace}>
            <MarketPlace />
          </div>

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
      </div>
    </div>
  );
};

export default DashboardCompany;
