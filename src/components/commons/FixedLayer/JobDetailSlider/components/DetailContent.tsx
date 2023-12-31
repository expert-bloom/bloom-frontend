import React, { useState } from 'react';

import {
  Bookmark,
  Close,
  Flag,
  Launch,
  LocationOn,
  Money,
  PersonPin,
  Psychology,
  Verified,
  Work,
} from '@mui/icons-material';
import {
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import moment from 'moment';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import SimpleBar from 'simplebar-react';

import { MoButton } from '@/components/MoButton';
import { MotionChild, MotionParent } from '@/components/MotionItems';
import 'simplebar-react/dist/simplebar.min.css';
import { type JobPost } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { capitalize } from '@/utils';

import s from '../job_detail_slider.module.scss';

const transition = {
  duration: 1,
  ease: [0.6, 0.01, 0, 0.9],
};

interface Props {
  isLoading: boolean;
  jobPost: JobPost | null | undefined;
  onCloseJobDetail: () => void;
}

interface ApplyButtonProps {
  id: string;
  onClick?: (prop: any) => void;
}

export const ApplyButton = ({ id, onClick = () => null }: ApplyButtonProps) => {
  const { me } = useMe();

  return (
    <Tooltip
      title={
        !me?.emailVerified
          ? 'Verify you email to start applying!'
          : !me.profileCompleteness
          ? 'Complete Your Profile'
          : ''
      }
      placement="top"
    >
      <Link
        href={`/applicant/apply/${id}`}
        onClick={(e) => {
          if (!me?.emailVerified) {
            toast.error('Verify your Email to start applying for job-posts');
            e.preventDefault();
            return;
          }
          onClick(e);
        }}
      >
        <MoButton
          motionProps={{
            style: {
              cursor:
                !me?.emailVerified || !me.profileCompleteness
                  ? 'not-allowed'
                  : 'pointer',
            },
          }}
          fullWidth
          variant="contained"
          disabled={!me?.emailVerified || !me.profileCompleteness}
        >
          Apply Now
        </MoButton>
      </Link>
    </Tooltip>
  );
};

const DetailContent = ({ jobPost, isLoading, onCloseJobDetail }: Props) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const { me } = useMe();

  // check if the router is navigating

  return (
    <SimpleBar style={{ maxHeight: '100vh' }}>
      <MotionChild className={s.content} transition={transition}>
        <header>
          <IconButton onClick={onCloseJobDetail}>
            <Close />
          </IconButton>

          <Link href={`/jobs/${jobPost?.id ?? ''}`} target="_blank">
            <Button startIcon={<Launch />}>Open job in a new window</Button>
          </Link>
        </header>

        <AnimatePresence mode="wait">
          <MotionParent key={isLoading ? '0' : '1'}>
            {isLoading && (
              <MotionChild className={s.loading_spinner}>
                <CircularProgress />
              </MotionChild>
            )}

            {!isLoading && jobPost && (
              <MotionChild className={s.detail}>
                <div className={s.job_info}>
                  <div className={s.title_div}>
                    <Typography variant="h5">{jobPost.title}</Typography>

                    <Stack sx={{ mt: '2rem' }}>
                      <Typography className={s.category}>
                        Cloud Engineering
                      </Typography>
                      <Typography
                        variant="body2"
                        color="gray"
                        className={s.time}
                      >
                        Posted {moment(jobPost.createdAt).fromNow()}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center">
                      <LocationOn fontSize="small" />
                      <Typography className={s.location}>
                        {jobPost.location}
                      </Typography>
                    </Stack>
                  </div>

                  <div className={s.desc}>
                    <Typography variant="body1">
                      {jobPost.description}
                    </Typography>
                  </div>

                  <div className={s.stat}>
                    <Stack direction="row" alignItems="flex-start" gap=".3rem">
                      <Money />
                      <Stack>
                        <Typography>Salary Type</Typography>
                        <Typography color="gray" variant="body2">
                          {capitalize(jobPost.salaryType)}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" alignItems="flex-start" gap=".3rem">
                      <Psychology />
                      <Stack>
                        <Typography>
                          {capitalize(jobPost.experienceLevel)}
                        </Typography>
                        <Typography color="gray" variant="body2">
                          Skill Level
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" alignItems="flex-start" gap=".3rem">
                      <PersonPin />
                      <Stack>
                        <Typography>{capitalize(jobPost.jobSite)}</Typography>
                        <Typography color="gray" variant="body2">
                          Job Site
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" alignItems="flex-start" gap=".3rem">
                      <Work />
                      <Stack>
                        <Typography>Job Type</Typography>
                        <Typography color="gray" variant="body2">
                          {capitalize(jobPost.jobType).replace('_', '')}
                        </Typography>
                      </Stack>
                    </Stack>
                  </div>

                  <div className={s.skills}>
                    <Typography variant="h6">Skills and Expertise</Typography>
                    <div className={s.chips}>
                      {jobPost.skills.map((skill) => (
                        <Chip key={skill} label={capitalize(skill)} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className={s.job_action}>
                  <div className={s.apply}>
                    <ApplyButton id={jobPost.id} />

                    <MoButton
                      fullWidth
                      variant="outlined"
                      startIcon={<Bookmark />}
                    >
                      Save Job
                    </MoButton>

                    <Button startIcon={<Flag fontSize="small" />}>
                      Flag as inappropriate
                    </Button>
                  </div>

                  <div className={s.about_client}>
                    <Typography variant="h6">About the client</Typography>

                    <Stack direction="row" gap=".5rem">
                      <Verified color="primary" />
                      <Typography>Verified</Typography>
                    </Stack>

                    <Typography>United Sates</Typography>
                    <Typography>34 Jobs posted</Typography>
                    <Typography>0 Hired</Typography>

                    <Typography variant="body2" color="gray">
                      Member since Jul 12, 2020,
                    </Typography>
                  </div>
                </div>
              </MotionChild>
            )}
          </MotionParent>
        </AnimatePresence>
      </MotionChild>
    </SimpleBar>
  );
};

export default DetailContent;
