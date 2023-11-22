import React, { useEffect } from 'react';

import { Avatar, Box, Divider, Drawer, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import SimpleBar from 'simplebar-react';

import useMe from '@/hooks/useMe';

import s from './companynav.module.scss';
import { clientPaths } from './config';
import { SideNavItem } from './side-nav-item';

export const Scrollbar = styled(SimpleBar)``;

export const SideNav = (props: any) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const { me } = useMe();

  useEffect(() => {
    onClose();
  }, [pathname]);

  const content = (
    <Scrollbar
      className={s.side_nav}
      sx={{
        height: '100%', // border: 'thin solid red',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          // background: 'neutral.400',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRight: 'thin solid lightgray',
        }}
      >
        <Stack className={s.logo} direction="row">
          <Avatar
            sx={{
              height: 40,
              width: 40,
            }}
            src={me?.image ?? ''}
          />
          <Stack>
            <Typography>
              {me?.firstName} {me?.lastName}
            </Typography>
            <Typography variant="subtitle2" color="gray" sx={{ mt: '-.2rem' }}>
              {me?.company?.companyName ?? <i>no-company name</i>}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ borderColor: 'neutral.200' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {clientPaths.map((item: any) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
      </Box>
    </Scrollbar>
  );

  // mobile
  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          // backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
