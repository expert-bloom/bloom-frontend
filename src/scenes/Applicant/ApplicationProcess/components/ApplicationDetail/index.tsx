import React from 'react';

import {
  BusinessCenter,
  CalendarTodayRounded,
  MonetizationOn,
  Place,
} from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Button,
  Chip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import moment from 'moment/moment';
import Link from 'next/link';
import { BiLinkExternal } from 'react-icons/bi';

import s from './applicationdetail.module.scss';

const ApplicationDetail = () => {
  return (
    <div className={s.container}>
      <ListItem
        className={s.list_item}
        secondaryAction={<Stack direction="row" alignItems="center"></Stack>}
      >
        <ListItemButton className={s.list_item_btn}>
          <ListItemIcon>
            <Avatar
              className={s.avatar}
              // src={applicant?.account.image}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Stack
                gap=".5rem"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="h6"
                  color="gray"
                  // fontWeight="400"
                  className={s.title}
                >
                  {'post.title'}
                </Typography>

                <Chip
                  label={moment().format('DD MMM YYYY, hh:mm A')}
                  variant="outlined"
                  size="small"
                  sx={{ px: '.2rem', color: 'gray' }}
                  icon={<CalendarTodayRounded color="disabled" />}
                />
              </Stack>
            }
            secondary={
              <Stack className={s.secondary}>
                <div className={s.detail}>
                  <div className={s.detail_item}>
                    <BusinessCenter fontSize="small" />
                    <Typography variant="body2">Unknown</Typography>
                  </div>
                  -
                  <div className={s.detail_item}>
                    <MonetizationOn fontSize="small" />
                    <Typography variant="body2">12k /mo</Typography>
                  </div>
                  -
                  <div className={s.detail_item}>
                    <Place fontSize="small" />
                    <Typography variant="body2">USA</Typography>
                  </div>
                </div>

                <Typography className={s.desc} fontWeight={300} variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  pariatur quam totam ullam ut.
                </Typography>
              </Stack>
            }
          />
        </ListItemButton>
      </ListItem>

      <div className={s.proposal}>
        <Stack>
          <Typography variant="h6">You</Typography>
          <Typography variant="body2" color="gray">
            {moment().format('DD MMM YYYY, hh:mm A')}
          </Typography>
        </Stack>

        <Alert severity="info" className={s.alert} variant="filled">
          <Typography variant="body1">
            You shared your contact with the employer.
          </Typography>
        </Alert>

        <Stack gap=".3rem">
          <Typography variant="h6">Cover Letter</Typography>
          <Typography variant="body1" fontWeight="300">
            I am writing to express my strong interest in the front-end
            developer position at your company. With 6 years of experience (with
            project-based evidence) in the field and a passion for delivering
            solutions, I am confident in my ability to make a valuable
            contribution to your team. My qualifications include expertise in
            React.js, Next.js, and the ecosystem of those. I have honed these
            skills through various projects, ranging from small website designs
            to large-scale applications. I am also well-versed in the latest web
            development practices and technologies, ensuring that the solutions
            I deliver are both effective and up-to-date. In addition to my
            technical skills, I am a team player..
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center">
          <Typography variant="h6">Resume:</Typography>
          <Link href="/">
            <Button startIcon={<BiLinkExternal />}>resume.pdf</Button>
          </Link>
        </Stack>

        <Alert severity="warning" className={s.alert}>
          <Typography variant="body1">
            Please wait for the recruiter to respond.
          </Typography>
        </Alert>
      </div>
    </div>
  );
};

export default ApplicationDetail;
