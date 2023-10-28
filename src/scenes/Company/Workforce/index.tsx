import React from 'react';

import {
  Avatar,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import useMe from '@/hooks/useMe';

import s from './workforce.module.scss';

const Workforce = () => {
  const { me } = useMe();

  return (
    <div className={s.container}>
      <Container maxWidth={'xxl' as any} className={s.wrapper}>
        <Stack>
          <Typography variant="h4">Your Team</Typography>

          <Typography color="gray">
            Manage contracts and workspace manager accounts.
          </Typography>
        </Stack>

        <Card className={s.applicants}>
          <Stack className={s.no_talent}>
            <Typography variant="h6">No Team Members Yet</Typography>

            <Typography color="gray">
              Find Talent to build your team in the Marketplace.
            </Typography>

            <Button variant="outlined">Go To Marketplace</Button>
          </Stack>
        </Card>

        <Stack gap="1.5rem">
          <Typography variant="h5">Workspace Manager Accounts</Typography>
          <Divider />
        </Stack>

        <div className={s.managers}>
          <Card className={s.invite}>
            <Stack>
              <Avatar />
              <Typography variant="h6">No Team Members Yet</Typography>

              <Typography color="gray">
                Find Talent to build your team in the Marketplace.
              </Typography>

              <Tooltip title="Coming Soon" placement="top">
                <Button variant="outlined">Invite Manager</Button>
              </Tooltip>
            </Stack>
          </Card>

          <Card className={s.owner}>
            <Stack>
              <Avatar>
                {me?.company?.companyName?.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6">
                {`${me?.firstName} ${me?.lastName} - ${me?.company?.companyName}`}
              </Typography>

              <Typography color="gray">{me?.email}</Typography>

              <Chip variant="filled" label="Owner" />
            </Stack>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Workforce;
