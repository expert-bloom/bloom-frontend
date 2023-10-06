import React, { useEffect, useState } from 'react';

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
import { useRouter } from 'next/router';
import { BiLinkExternal } from 'react-icons/bi';

import {
  type Application,
  useGetJobApplicationsQuery,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { useResponseErrorHandler } from '@/hooks/useResponseErrorHandler';
import ApplicationDetail from '@/scenes/Applicant/ApplicationProcess/components/ApplicationDetail';
import {
  getStatusTextAndColor,
  stepsData,
} from '@/scenes/Applicant/ApplicationProcess/helpers';

import s from './application_process.module.scss';

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

const HeaderNav = () => (
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
);

interface StepType {
  name: string;
  status: string;
  description: string;
  component: React.ReactElement;
  completed: boolean;
  skipped: boolean;
  expanded: boolean;
}

const ApplicationProcess = () => {
  const router = useRouter();
  const { id } = router.query;

  const [steps, setSteps] = useState<StepType[]>([]);
  const [activeStep, setActiveStep] = useState<StepType>();
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const { me } = useMe();
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>();

  const jobApplications = useGetJobApplicationsQuery({
    skip: !me?.applicant?.id,
    variables: {
      input: {
        applicantId: me?.applicant?.id ?? '',
      },
    },
  });

  useResponseErrorHandler(
    jobApplications.error,
    'Error getting job applications',
  );

  useEffect(() => {
    if (
      !!selectedApplication ||
      jobApplications.loading ||
      !jobApplications.data?.getJobApplications
    )
      return;

    const findSelected = jobApplications.data?.getJobApplications.edges.find(
      (ap) => ap.node.id === id,
    )?.node;

    console.log('findSelected : ', findSelected);

    setSelectedApplication(findSelected ?? null);
  }, [jobApplications]);

  useEffect(() => {
    if (!selectedApplication) return;

    const steps: StepType[] = [];

    // application stage
    const applicationStep: StepType = {
      name: 'Your Application',
      component: <ApplicationDetail />,
      status: selectedApplication?.status,
      expanded: false,
      description:
        'This is Your Application process where you can track you prgress on the applciation process',
      skipped: false,
      completed: false,
    };
    steps.push(applicationStep);

    // interview stage
    const interviewStep: StepType = {
      name: 'Interview',
      component: <ApplicationDetail />,
      status: selectedApplication?.status,
      expanded: false,
      description:
        'This is Your Interview process where you can track you prgress on the applciation process',
      skipped: false,
      completed: false,
    };
    steps.push(interviewStep);

    // offer stage
    const offerStep: StepType = {
      name: 'Offer',
      component: <ApplicationDetail />,
      status: selectedApplication?.status,
      expanded: false,
      description:
        'This is Your Interview process where you can track you prgress on the applciation process',
      skipped: false,
      completed: false,
    };
    steps.push(offerStep);

    setSteps(steps);
    setActiveStep(applicationStep);
  }, [selectedApplication]);

  return (
    <div className={s.container}>
      <Container className={s.wrapper} maxWidth={'xxl' as any}>
        <Container maxWidth={'xl' as any} component="header">
          <HeaderNav />

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
          <Stepper activeStep={activeStepIdx} orientation="vertical">
            {steps.map((step, index) => {
              // const status = getInfo(index, selectedPermit.permit_status)
              const { label, color } = getStatusTextAndColor('PENDING');

              return (
                <Step
                  key={step.name}
                  className={s.step}
                  expanded={steps[index].expanded}
                >
                  <StepLabel
                    optional={<StepperStatus label={label} color={color} />}
                    onClick={() => {
                      if (activeStepIdx < index) return;

                      setSteps((steps) =>
                        steps.map((step, idx) => ({
                          ...step,
                          expand: idx === index,
                        })),
                      );

                      // setActiveSForm(index);
                    }}
                    className={clsx([activeStepIdx === index && s.active])}
                  >
                    {step.name}
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </div>

        <div className={s.action_center}>{activeStep?.component}</div>
      </Container>
    </div>
  );
};

export default ApplicationProcess;
