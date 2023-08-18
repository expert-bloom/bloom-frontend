import { useCallback } from 'react';

import { Logout } from '@mui/icons-material';
import {
  Box,
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import s from './applicant_nav.module.scss';

export const AccountPopover = (props: any) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const { data: session }: any = useSession();

  const handleSignOut = useCallback(() => {
    void signOut({ redirect: false })
      .then(() => {
        onClose?.();
        router.push('/auth/login');
      })
      .catch(() => {
        toast.error('Error signing out');
      });
  }, [onClose, session, router]);

  return (
    <Popover
      className={s.popover}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={onClose}
      open={open}
      // PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {session?.user?.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}
      >
        {/* <Link href="/">
          <MenuItem>
            <ListItemIcon>
              <AccountCircleTwoTone />
            </ListItemIcon>
            <Typography variant="body1">Profile Setting</Typography>
          </MenuItem>
        </Link> */}

        <MenuItem onClick={handleSignOut} className={s.logout}>
          <ListItemIcon color="error">
            <Logout color="error" />
          </ListItemIcon>
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};
