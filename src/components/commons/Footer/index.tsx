import React from 'react';
import s from './footer.module.scss';
import {
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  Android,
  Apple,
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Twitter,
} from '@mui/icons-material';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import Link from 'next/link';

const socials = [
  {
    Icon: FacebookOutlined,
    href: 'https://www.facebook.com',
  },
  {
    Icon: LinkedIn,
    href: 'https://www.linkedin.com',
  },
  {
    Icon: Twitter,
    href: 'https://www.twitter.com',
  },
  {
    Icon: Instagram,
    href: 'https://www.instagram.com',
  },
];

const Footer = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.links}>
          <div className={s.row}>
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

            <Typography variant="body1" color="#808080FF">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.amet
              consectetur adipisicing elit.
            </Typography>
          </div>

          <div className={s.row}>
            {/* <Typography variant="h6">Pages</Typography> */}

            <Stack direction="column" spacing={1}>
              <Link href="/about">
                <Typography variant="body1" color="#808080FF">
                  About
                </Typography>
              </Link>
              <Link href="/contact">
                <Typography variant="body1" color="#808080FF">
                  Contact
                </Typography>
              </Link>
              <Link href="/blog">
                <Typography variant="body1" color="#808080FF">
                  Blog
                </Typography>
              </Link>
              <Link href="/faq">
                <Typography variant="body1" color="#808080FF">
                  FAQ
                </Typography>
              </Link>
            </Stack>
          </div>

          <div className={s.row}>
            {/* <Typography variant="h6">Pages</Typography> */}

            <Stack direction="column" spacing={1}>
              <Link href="/about">
                <Typography variant="body1" color="#808080FF">
                  Terms of service
                </Typography>
              </Link>
              <Link href="/contact">
                <Typography variant="body1" color="#808080FF">
                  Privacy Policy
                </Typography>
              </Link>
              <Link href="/blog">
                <Typography variant="body1" color="#808080FF">
                  Cookie Setting
                </Typography>
              </Link>
              <Link href="/faq">
                <Typography variant="body1" color="#808080FF">
                  Help & Support
                </Typography>
              </Link>
            </Stack>
          </div>

          <div className={s.row}>
            <Typography variant="h6" color="#d0d0d0">
              Keep in touch
            </Typography>

            <TextField
              variant="outlined"
              label="Email"
              fullWidth
              className={s.email_input}
              sx={{ width: '20rem' }}
            />
            <Button variant="contained">Subscribe</Button>
          </div>
        </div>

        <div className={s.contact_link}>
          <div className={s.social}>
            <Stack direction="row" alignItems="center" gap={2}>
              <Typography variant="body1">Follow Us</Typography>
              <Stack direction="row" alignItems="center" gap={1}>
                {socials.map((social, idx) => (
                  <IconButton key={idx}>
                    <social.Icon />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </div>

          <div className={s.apps}>
            <Stack direction="row" alignItems="center" gap={2}>
              <Typography variant="body1">Mobile App</Typography>
              <Stack direction="row" alignItems="center" gap={1}>
                <IconButton>
                  <Apple />
                </IconButton>
                <IconButton>
                  <Android />
                </IconButton>
              </Stack>
            </Stack>
          </div>
        </div>

        <Divider variant="fullWidth" />

        <div className={s.copyright}>
          <Typography variant="body1">
            © 2016 - {new Date().getFullYear()}, All rights reserved
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Footer;
