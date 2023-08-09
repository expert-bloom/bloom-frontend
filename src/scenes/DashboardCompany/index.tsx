import React from 'react';
import s from './db-comp.module.scss';
import CompanyProfile from '@/scenes/DashboardCompany/CompanyProfile';
import AccountSteps from '@/scenes/DashboardCompany/AccountSteps';
import FAQ from '@/scenes/DashboardCompany/FAQ';
import HowItWork from '@/scenes/DashboardCompany/HowItWork';
import MarketPlace from '@/scenes/DashboardCompany/MarketPlace';
import { Typography } from '@mui/material';

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

          <div className={s.how_it_work}>
            <HowItWork />
          </div>

          <div className={s.faq}>
            <FAQ />
          </div>

          <div className={s.account_steps}>
            <AccountSteps />
          </div>

          <div className={s.profile}>
            <CompanyProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCompany;
