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
  ApplicationStatus,
  InterviewStatus,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import ApplicationDetail, {
  useFindApplication,
} from '@/scenes/Applicant/ApplicationProcess/components/ApplicationDetail';
import InterviewDetail from '@/scenes/Applicant/ApplicationProcess/components/InterviewDetail';
import { getStatusTextAndColor } from '@/scenes/Applicant/ApplicationProcess/helpers';

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
  isActive: boolean;
}

const ApplicationProcess = () => {
  const router = useRouter();
  const { id } = router.query;

  const [steps, setSteps] = useState<StepType[]>([]);
  const [activeStep, setActiveStep] = useState<StepType>();
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const { me } = useMe();
  const {
    data: selectedApplication,
    error,
    loading,
  } = useFindApplication(id as string);

  useEffect(() => {
    if (!id || loading || !selectedApplication) return;

    const steps: StepType[] = [];

    console.log('selected appliatins : ', selectedApplication);

    // application stage
    const applicationStep: StepType = {
      name: 'Your Application',
      component: (
        <ApplicationDetail
          application={selectedApplication}
          applicationId={id as string}
        />
      ),
      status: selectedApplication.status,
      expanded: false,
      description:
        'This is Your Application process where you can track you prgress on the applciation process',
      skipped: false,
      completed: selectedApplication?.status === ApplicationStatus.Interview,
      isActive: selectedApplication?.status === ApplicationStatus.Pending,
    };
    steps.push(applicationStep);

    // interview stage
    const interviewStep: StepType = {
      name: 'Interview',
      component: <InterviewDetail applicationId={id as string} />,
      status: selectedApplication?.interview?.status ?? 'NO INTERVIEW',
      expanded: false,
      description:
        'This is Your Interview process where you can track you prgress on the applciation process',
      skipped: false,
      completed:
        selectedApplication?.interview?.status === InterviewStatus.Accepted,
      isActive:
        selectedApplication?.interview?.status === InterviewStatus.Pending,
    };
    steps.push(interviewStep);

    // offer stage
    const offerStep: StepType = {
      name: 'Offer',
      component: <h1> OFFER </h1>,
      status: selectedApplication?.status,
      expanded: false,
      description:
        'This is Your Interview process where you can track you prgress on the applciation process',
      skipped: false,
      completed: false,
      isActive: false,
    };
    steps.push(offerStep);

    setSteps(steps);

    if (selectedApplication?.offer) {
      setActiveStepIdx(2);
    } else if (selectedApplication?.interview) {
      setActiveStepIdx(1);
    } else {
      setActiveStepIdx(0);
    }
  }, [selectedApplication]);

  useEffect(() => {
    if (!steps.length) return;

    const selectedStep = steps[activeStepIdx];
    setActiveStep(selectedStep);
  }, [activeStepIdx, selectedApplication, steps]);

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
                    optional={
                      <StepperStatus label={step.status} color={color} />
                    }
                    onClick={() => {
                      const selectedStep = steps[index];

                      if (selectedStep.isActive || selectedStep.completed) {
                        // expand the selected step
                        // selectedStep.expanded = !selectedStep.expanded;
                        // setSteps([...steps]);
                        setActiveStepIdx(index);
                      }

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
