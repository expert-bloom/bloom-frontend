import React from 'react';

import {
  AddLink,
  Bookmark,
  Close,
  Flag,
  Launch,
  LocationOn,
  Money,
  PersonPin,
  Psychology,
  RadioButtonChecked,
  Verified,
  Work,
} from '@mui/icons-material';
import { Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import SimpleBar from 'simplebar-react';

import { MoButton } from '@/components/MoButton';
import { MotionChild } from '@/components/MotionItems';

import s from '../job_detail_slider.module.scss';
import 'simplebar-react/dist/simplebar.min.css';

interface Props {
  // program: GetProgramQuery['getProgram']['program'] | null | undefined;
  isLoading: boolean;
}

const transition = {
  duration: 1,
  ease: [0.6, 0.01, 0, 0.9],
};

const DetailContent = () => {
  return (
    <SimpleBar style={{ maxHeight: '100vh' }}>
      <MotionChild className={s.content} transition={transition}>
        <header>
          <IconButton>
            <Close />
          </IconButton>

          <Link href="/">
            <Button startIcon={<Launch />}>Open job in a new window</Button>
          </Link>
        </header>

        <div className={s.detail}>
          <div className={s.job_info}>
            <div className={s.title_div}>
              <Typography variant="h5">
                Aws/Devops Infrastructure Engineer (Terraform)
              </Typography>

              <Stack sx={{ mt: '2rem' }}>
                <Typography className={s.category}>
                  Cloud Engineering
                </Typography>
                <Typography variant="body2" color="gray" className={s.time}>
                  Posted 1 day ago
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center">
                <LocationOn fontSize="small" />
                <Typography className={s.location}>Worldwide</Typography>
              </Stack>
            </div>

            <div className={s.desc}>
              <Typography variant="body1">
                Currently searching for an Individual with strong Infrastructure
                background managing AWS environment using TERRAFORM. Also, our
                Infrastructure is automated with Devops CI/CD pipeline and
                Github as Version Control. Be able to Come up with new ideas on
                how to secure the infrastructure and maintain the pipeline.
                Also, you will be assigned to do Terraform upgrade for the first
                project with in infrastructure. Environment is relatively small
                so most of the task is quite simple. The person should have
                experience in AWS and Devops infrastructure for at least 6 years
              </Typography>
            </div>

            <div className={s.stat}>
              <Stack direction="row" alignItems="flex-start" gap=".3rem">
                <Money />
                <Stack>
                  <Typography>Salary Type</Typography>
                  <Typography color="gray" variant="body2">
                    Hourly
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" alignItems="flex-start" gap=".3rem">
                <Psychology />
                <Stack>
                  <Typography>Intermediate</Typography>
                  <Typography color="gray" variant="body2">
                    Skill Level
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" alignItems="flex-start" gap=".3rem">
                <PersonPin />
                <Stack>
                  <Typography>Remote</Typography>
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
                    Full time
                  </Typography>
                </Stack>
              </Stack>
            </div>

            <div className={s.skills}>
              <Typography variant="h6">Skills and Expertise</Typography>
              <div className={s.chips}>
                <Chip label="DevOps" />
                <Chip label="DevOps" />
                <Chip label="DevOps" />
                <Chip label="DevOps" />
                <Chip label="DevOps" />
              </div>
            </div>
          </div>

          <div className={s.job_action}>
            <div className={s.apply}>
              <MoButton fullWidth variant="contained">
                Apply Now
              </MoButton>

              <MoButton fullWidth variant="outlined" startIcon={<Bookmark />}>
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
        </div>
      </MotionChild>
    </SimpleBar>
  );
};

export default DetailContent;
