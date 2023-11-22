import React from 'react';

import {
  CreateNewFolderRounded,
  Dashboard,
  Handshake,
  ViewHeadline,
  WorkHistory,
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  Slide,
  Stack,
  type Theme,
  Tooltip,
  Typography,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { SideNav } from '@/components/Layout/Company/CompanyNav/side-nav';
import { usePopover } from '@/hooks/use-popover';
import useMe from '@/hooks/useMe';
import Logo from '@/public/logo.png';

import { AccountPopover } from './AccountPopover';
import s from './companynav.module.scss';

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
  ease: [0.6, 0.01, 0, 0.9], // delay: 1,
};

const links = [
  {
    name: 'Dashboard',
    href: '/company/dashboard',
    Icon: Dashboard,
  },
  {
    name: 'Create Job-Post',
    href: '/company/create-job-post',
    Icon: CreateNewFolderRounded,
  },
  {
    name: 'Marketplace',
    href: '/company/marketplace',
    Icon: Handshake,
  },
  {
    name: 'Workforce',
    href: '/company/workforce',
    Icon: WorkHistory,
  },
];

export default function CompanyNav() {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const router = useRouter();
  const accountPopover = usePopover();
  const { me } = useMe();

  return (
    <HideOnScroll>
      <div style={{ width: '100%', display: 'flex' }} id="top-nav">
        <motion.nav
          className={clsx([s.container])}
          variants={navVariants}
          transition={navTransition}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1.5}
            className={s.logo_stack}
          >
            <div className={s.logo}>
              <Image src={Logo} alt="enqu-logo" />
            </div>
            <Typography variant="body1">EB</Typography>
          </Stack>

          <div className={clsx([s.links])}>
            {links.map(({ href, Icon, name }) => (
              <Link
                key={name}
                href={href}
                className={clsx([s.link, router.pathname === href && s.active])}
              >
                <Button
                  startIcon={<Icon />}
                  color={router.pathname === href ? 'primary' : 'inherit'}
                >
                  <Typography>{name}</Typography>
                </Button>
              </Link>
            ))}
          </div>

          <Tooltip title="Profile">
            <Stack direction="row" alignItems="center" gap=".5rem">
              <Avatar
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
                sx={{
                  cursor: 'pointer',
                  height: 40,
                  width: 40,
                }}
                src={me?.image ?? ''}
              />
              {!lgUp && <ViewHeadline fontSize="medium" />}
            </Stack>
          </Tooltip>

          {lgUp ? (
            <AccountPopover
              anchorEl={accountPopover.anchorRef.current}
              open={accountPopover.open}
              onClose={accountPopover.handleClose}
            />
          ) : (
            <SideNav
              onClose={() => {
                accountPopover.handleClose();
              }}
              open={accountPopover.open}
            />
          )}
        </motion.nav>
      </div>
    </HideOnScroll>
  );
}
