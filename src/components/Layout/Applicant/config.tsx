import React from 'react';

import {
  AccountCircle,
  Dashboard,
  Event,
  Handshake,
  Save,
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

export const clientPaths = [
  {
    title: 'Dashboard',
    path: '/applicant/dashboard',
    icon: (
      <SvgIcon fontSize="medium">
        <Dashboard />
      </SvgIcon>
    ),
  },
  {
    title: 'Explore Jobs',
    path: '/jobs',

    icon: (
      <SvgIcon fontSize="medium">
        <Handshake />
      </SvgIcon>
    ),
  },
  {
    title: 'My Interviews',
    path: '/applicant/my-interviews',

    icon: (
      <SvgIcon>
        <Event />
      </SvgIcon>
    ),
  },
  {
    title: 'Profile',
    path: '/applicant/profile',

    icon: (
      <SvgIcon>
        <AccountCircle />
      </SvgIcon>
    ),
  },
  {
    title: 'Saved',
    path: '/applicant/saved-jobs',

    icon: (
      <SvgIcon>
        <Save />
      </SvgIcon>
    ),
  },
];
