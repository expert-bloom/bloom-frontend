import React from 'react';

import { Edit } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import s from './edit_profile.module.scss';

const EditProfile = () => {
  return (
    <Card className={s.container} elevation={0}>
      <CardHeader
        title={
          <Typography variant="h5">Continue Building Your Profile</Typography>
        }
      />

      <CardContent className={s.content}>
        <Typography>
          The more information on your profile, the better we can match you with
          employers.
        </Typography>

        <Link href="/applicant/profile" style={{ width: 'max-content' }}>
          <Button variant="contained" color="primary" startIcon={<Edit />}>
            Edit Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
