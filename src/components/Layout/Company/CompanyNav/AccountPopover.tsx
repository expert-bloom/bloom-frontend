import { useCallback, useState } from 'react';

import { Logout } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { MeDocument, useLogOutMutation } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';

import s from './companynav.module.scss';

export const AccountPopover = (props: any) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const { me: session, mePayload } = useMe();
  const [logout] = useLogOutMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = useCallback(() => {
    setIsLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
      credentials: 'include',
      mode: 'no-cors',
    })
      .then(async (res) => {
        console.log('res : ', res);
        await mePayload.refetch().then((res) => {
          setIsLoading(false);
          router.replace('/auth/login');
        });
      })
      .catch((err) => {
        console.log('err : ', err);
        toast.error('Error signing out');
        setIsLoading(false);
      });

    return;
    void logout({
      refetchQueries: [MeDocument], // awaitRefetchQueries: true,
    })
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
          {session?.email}
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

        <MenuItem
          onClick={handleSignOut}
          className={s.logout}
          disabled={isLoading}
        >
          <ListItemIcon color="error">
            {isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <Logout color="error" />
            )}
          </ListItemIcon>
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};
