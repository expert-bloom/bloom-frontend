import React from 'react';

import { Button, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import useMe from '@/hooks/useMe';

import s from './companyprofile.module.scss';
import CompImg from './img_2.png';

const CompanyProfile = () => {
  const { me } = useMe();

  return (
    <Card className={s.container}>
      <CardContent className={s.content}>
        <div className={s.icon}>
          <Image src={CompImg} alt="company logo" fill />
        </div>

        <Typography variant="h6" className={s.title}>
          {me?.company?.companyName}
        </Typography>

        <Typography variant="body1" className={s.desc}>
          Find the best talent for your company by providing more information
          about your company and your job offers.
        </Typography>

        <Link href="/company/profile">
          <Button size="large" variant="contained">
            Update Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CompanyProfile;
