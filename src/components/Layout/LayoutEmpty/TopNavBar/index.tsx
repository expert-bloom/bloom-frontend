import React from 'react';

import {
  AccountCircleTwoTone,
  FollowTheSigns,
  Logout,
  Reorder,
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Slide,
  Stack,
  Tooltip,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import { AccountPopover } from '@/components/Layout/Company/CompanyNav/AccountPopover';
import { usePopover } from '@/hooks/use-popover';
import Logo from '@/public/logo.png';

import s from './topnav.module.scss';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

export function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window != null ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const navVariants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const navTransition = {
  duration: 1,
  ease: [0.6, 0.01, 0, 0.9],
};

export default function TopNavBar({ pageProps }: any) {
  // console.log('data: ', session, isTalent);
  const router = useRouter();

  const { data } = useSession();
  const accountPopover = usePopover();

  // console.log('session: ', data);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <motion.div
      style={{ position: 'fixed', top: 0, width: '100%', zIndex: 10 }}
      initial="initial"
      animate="animate"
    >
      <AnimatePresence>
        <HideOnScroll>
          <div style={{ width: '100%', display: 'flex' }}>
            <motion.nav
              className={clsx([s.container])}
              variants={navVariants}
              transition={navTransition}
            >
              <Link href="/">
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  className={s.logo_stack}
                >
                  <div className={s.logo}>
                    <Image src={Logo} alt="enqu-logo" />
                  </div>
                  <Typography variant="body1">ExpertBlooms</Typography>
                </Stack>
              </Link>

              <div className={clsx([s.links])}></div>

              {data != null ? (
                <Tooltip title="Profile">
                  <Avatar
                    onClick={accountPopover.handleOpen}
                    ref={accountPopover.anchorRef}
                    sx={{
                      cursor: 'pointer',
                      height: 40,
                      width: 40,
                    }}
                    // src="/assets/avatars/avatar-anika-visser.png"
                  />
                </Tooltip>
              ) : (
                <Link
                  href={'/auth/login'}
                  className="px-4 py-2 border border-white rounded uppercase tracking-widest mx-4   transition-all duration-700 hover:bg-white font-semibold text-base hover:text-indigo-600"
                >
                  <Button variant="outlined">Login</Button>
                </Link>
              )}

              <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
              />

              <Menu
                elevation={0}
                id="menu-appbar"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className={s.menu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Divider sx={{ my: 0.5 }} />

                <MenuItem
                  onClick={() => {
                    signOut()
                      .then(() => {
                        void router.push('/auth/login');
                        handleClose();
                      })
                      .catch(() => {
                        handleClose();
                      });
                  }}
                >
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </motion.nav>
          </div>
        </HideOnScroll>
      </AnimatePresence>
    </motion.div>
  );
}
