import React from 'react';

import { Edit } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import useMe from '@/hooks/useMe';

import s from './edit_profile.module.scss';

const EditProfile = () => {
  const { me } = useMe();

  return (
    <Card className={s.container} elevation={0}>
      <CardHeader
        title={
          <Stack alignItems="center">
            <Avatar
              className={s.avatar}
              src={me?.image ?? '-'}
              sx={{ width: '4rem', height: '4rem', mb: '1rem' }}
            />
            <Typography variant="h6" noWrap>
              {`${me?.firstName} ${me?.lastName}`}
            </Typography>
            <Typography variant="subtitle2">
              {me?.applicant?.jobPosition ?? <i>Job Position</i>}
            </Typography>
          </Stack>
        }
      />

      <CardContent className={s.content}>
        <Typography variant="body2" color="text.secondary">
          Profile Completeness
        </Typography>
        <Stack direction="row" alignItems="center" gap=".8rem">
          <LinearProgress
            variant="determinate"
            value={me?.profileCompleteness ?? 0}
            sx={{ width: '100%' }}
          />
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            me?.profileCompleteness ?? 0,
          )}%`}</Typography>
        </Stack>

        <Link
          href="/applicant/profile"
          style={{ width: 'max-content', margin: 'auto' }}
        >
          <Button variant="contained" color="primary" startIcon={<Edit />}>
            Complete Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
