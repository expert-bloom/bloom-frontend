import React from 'react';

import { AccountCircle, Dashboard, Handshake, Save } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Slide,
  Stack,
  Tooltip,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import AccountAlert from '@/components/AccountAlert';
import { usePopover } from '@/hooks/use-popover';
import Logo from '@/public/logo.png';

import { AccountPopover } from './AccountPopover';
import s from './applicant_nav.module.scss';

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
  delay: 1,
};

const links = [
  {
    name: 'Dashboard',
    href: '/applicant/dashboard',
    Icon: Dashboard,
  },
  {
    name: 'Explore Jobs',
    href: '/search',
    Icon: Handshake,
  },
  {
    name: 'Profile',
    href: '/applicant/profile',
    Icon: AccountCircle,
  },
  {
    name: 'Saved',
    href: '/applicant/saved-jobs',
    Icon: Save,
  },
];

export default function Applicant({ pageProps }: any) {
  // console.log('data: ', session, isTalent);
  const router = useRouter();
  const accountPopover = usePopover();

  const { data: session } = useSession();

  console.log('session', session);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HideOnScroll>
      <div style={{ width: '100%', display: 'flex' }}>
        <motion.nav
          className={clsx([s.container])}
          variants={navVariants}
          transition={navTransition}
          id="applicant-nav"
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
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40,
              }}
              src={session?.user?.image}
            />
          </Tooltip>

          <AccountPopover
            anchorEl={accountPopover.anchorRef.current}
            open={accountPopover.open}
            onClose={accountPopover.handleClose}
          />
        </motion.nav>
      </div>
    </HideOnScroll>
  );
}
