import React, { useState } from 'react';

import { ArrowBackTwoTone } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { BiLinkExternal } from 'react-icons/bi';

import { Loader } from '@/components/Loader';
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
  const [activeStep, setActiveStep] = useState(0);

  const { me } = useMe();

  return (
    <div className={s.container}>
      <Container className={s.wrapper} maxWidth={'xxl' as any}>
        <Container maxWidth={'xl' as any} component="header">
          <Stack direction="row" alignItems="center" gap=".5rem">
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
                    <Box sx={{ mb: 2 }}>
                      <div></div>
                    </Box>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </div>

        <div className={s.action_center}>
          <Loader
            style={{
              maxWidth: '7rem',
              marginTop: '4rem',
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default ApplicationDetail;
