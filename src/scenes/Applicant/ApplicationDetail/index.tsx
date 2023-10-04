import React, { useState } from 'react';

import {
  ArrowBackTwoTone,
  BusinessCenter,
  CalendarTodayRounded,
  MonetizationOn,
  Place,
} from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiLinkExternal } from 'react-icons/bi';

import { Loader } from '@/components/Loader';
import { type Application } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import {
  getStatusTextAndColor,
  stepsData,
} from '@/scenes/Applicant/ApplicationDetail/helpers';

import s from './applicationdetail.module.scss';

export const StepperStatus = ({ label, color }: any) => {
  return (
    <div className={s.status}>
      <Typography variant="caption">Status: </Typography>
      <Chip
        // label={label.toUpperCase()}
        label={label}
        className={s.chip}
        color={color || 'secondary'}
        size="small"
        variant="outlined"
      />
    </div>
  );
};

const ApplicationDetail = () => {
  const [steps, setSteps] = useState(stepsData);
  const { me } = useMe();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedApplication, setSelectedApplication] = useState<Application>();
  const { id } = router.query;

  return (
    <div className={s.container}>
      <Container className={s.wrapper} maxWidth={'xxl' as any}>
        <Container maxWidth={'xl' as any} component="header">
          <Stack direction="row" alignItems="center" gap=".8rem">
            <Tooltip arrow placement="top" title="Go back">
              <IconButton
                color="primary"
                className={s.go_back}
                onClick={() => {
                  window.history.back();
                }}
              >
                <ArrowBackTwoTone />
              </IconButton>
            </Tooltip>

            <Box>
              <Typography variant="h5">Interview Process</Typography>
              <Typography variant="caption" color="gray">
                This is a page shows every detail of the interview process
              </Typography>
            </Box>
          </Stack>

          <Tooltip
            arrow
            placement="top"
            title="open the Job-post in new window"
          >
            <Link href="/">
              <Button startIcon={<BiLinkExternal />}>Open Job Post</Button>
            </Link>
          </Tooltip>
        </Container>

        <div className={s.stepper_container}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => {
              // const status = getInfo(index, selectedPermit.permit_status)
              const { label, color } = getStatusTextAndColor(
                step.form.props?.title,
              );

              return (
                <Step
                  key={step.title}
                  className={s.step}
                  expanded={steps[index].expand}
                >
                  <StepLabel
                    optional={<StepperStatus label={label} color={color} />}
                    onClick={() => {
                      if (activeStep < index) return;

                      setSteps((steps) =>
                        steps.map((step, idx) => ({
                          ...step,
                          expand: idx === index,
                        })),
                      );

                      // setActiveSForm(index);
                    }}
                    className={clsx([activeStep === index && s.active])}
                  >
                    {step.title}
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.desc}</Typography>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </div>

        <div className={s.action_center}>
          <ListItem
            className={s.list_item}
            secondaryAction={
              <Stack direction="row" alignItems="center"></Stack>
            }
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

                    <Typography
                      className={s.desc}
                      fontWeight={300}
                      variant="body2"
                    >
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
                developer position at your company. With 6 years of experience
                (with project-based evidence) in the field and a passion for
                delivering solutions, I am confident in my ability to make a
                valuable contribution to your team. My qualifications include
                expertise in React.js, Next.js, and the ecosystem of those. I
                have honed these skills through various projects, ranging from
                small website designs to large-scale applications. I am also
                well-versed in the latest web development practices and
                technologies, ensuring that the solutions I deliver are both
                effective and up-to-date. In addition to my technical skills, I
                am a team player..
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
      </Container>
    </div>
  );
};

export default ApplicationDetail;
