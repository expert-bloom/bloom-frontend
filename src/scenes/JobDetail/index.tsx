import React, { useEffect } from 'react';

import {
  Bookmark,
  Flag,
  LocationOn,
  Money,
  PersonPin,
  Psychology,
  Verified,
  Work,
} from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import moment from 'moment/moment';
import { useRouter } from 'next/router';

import { ApplyButton } from '@/components/commons/FixedLayer/JobDetailSlider/components/DetailContent';
import Loader from '@/components/Loader';
import { MoButton } from '@/components/MoButton';
import { MotionChild } from '@/components/MotionItems';
import { useGetJobPostsQuery } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { capitalize } from '@/utils';

import s from './jobdetail.module.scss';

const JobDetail = () => {
  // get the id from the url
  const router = useRouter();
  const { id } = router.query;
  const { me } = useMe();

  const { data: jobPost, loading } = useGetJobPostsQuery();

  const [selectedJobPost, setSelectedJobPost] = React.useState<
    NonNullable<typeof jobPost>['getJobPosts'][number] | null
  >();

  useEffect(() => {
    if (jobPost?.getJobPosts) {
      const selectedJob = jobPost.getJobPosts.find((job) => job.id === id);
      setSelectedJobPost(selectedJob ?? null);
    }
  }, [id, jobPost]);

  if (selectedJobPost === undefined || loading) {
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <Loader />
        </div>
      </div>
    );
  }

  if (selectedJobPost === null) {
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <Alert severity="error">
            <AlertTitle>
              <Typography variant="h6">Job not found</Typography>
            </AlertTitle>
            <Typography variant="body1">
              The job you are looking for is not found.
            </Typography>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <Container className={s.wrapper} maxWidth={'xl'}>
        <MotionChild className={s.detail}>
          <div className={s.job_info}>
            <div className={s.title_div}>
              <Typography variant="h5">{selectedJobPost.title}</Typography>

              <Stack sx={{ mt: '2rem' }}>
                <Typography className={s.category}>
                  Cloud Engineering
                </Typography>
                <Typography variant="body2" color="gray" className={s.time}>
                  Posted {moment(selectedJobPost.createdAt).fromNow()}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center">
                <LocationOn fontSize="small" />
                <Typography className={s.location}>
                  {selectedJobPost.location}
                </Typography>
              </Stack>
            </div>

            <div className={s.desc}>
              <Typography variant="body1">
                {selectedJobPost.description}
              </Typography>
            </div>

            <div className={s.stat}>
              <Stack direction="row" alignItems="flex-start" gap=".3rem">
                <Money />
                <Stack>
                  <Typography>Salary Type</Typography>
                  <Typography color="gray" variant="body2">
                    {capitalize(selectedJobPost.salaryType)}
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" alignItems="flex-start" gap=".3rem">
                <Psychology />
                <Stack>
                  <Typography>
                    {capitalize(selectedJobPost.experienceLevel)}
                  </Typography>
                  <Typography color="gray" variant="body2">
                    Skill Level
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" alignItems="flex-start" gap=".3rem">
                <PersonPin />
                <Stack>
                  <Typography>{capitalize(selectedJobPost.jobSite)}</Typography>
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
                    {capitalize(selectedJobPost.jobType).replace('_', '')}
                  </Typography>
                </Stack>
              </Stack>
            </div>

            <div className={s.skills}>
              <Typography variant="h6">Skills and Expertise</Typography>
              <div className={s.chips}>
                {selectedJobPost.skills.map((skill) => (
                  <Chip key={skill} label={capitalize(skill)} />
                ))}
              </div>
            </div>
          </div>

          <div className={s.job_action}>
            <div className={s.apply}>
              <ApplyButton id={selectedJobPost.id} />

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
        </MotionChild>
      </Container>
    </div>
  );
};

export default JobDetail;
