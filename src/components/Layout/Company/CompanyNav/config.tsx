import React from 'react';

import {
  CreateNewFolderRounded,
  Dashboard,
  Handshake,
  WorkHistory,
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

export const companyPaths = [
  {
    title: 'Dashboard',
    path: '/company/dashboard',
    icon: (
      <SvgIcon fontSize="medium">
        <Dashboard />
      </SvgIcon>
    ),
  },
  {
    title: 'Create Job-Post',
    path: '/company/create-job-post',

    icon: (
      <SvgIcon fontSize="medium">
        <CreateNewFolderRounded />
      </SvgIcon>
    ),
    subPaths: ['/client/counselor/[id]'],
  },
  {
    title: 'Marketplace',
    path: '/company/marketplace',

    icon: (
      <SvgIcon>
        <Handshake />
      </SvgIcon>
    ),
    subPaths: ['/client/counselor/[id]'],
  },

  {
    title: 'Workforce',
    path: '/company/workforce',

    icon: (
      <SvgIcon>
        <WorkHistory />
      </SvgIcon>
    ),
    subPaths: ['/client/counselor/[id]'],
  },
];
