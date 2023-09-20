/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useTransition } from 'react';

import { LocationOn, PeopleAlt, Visibility } from '@mui/icons-material';
import { Chip, Divider, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { BsClock } from 'react-icons/bs';

import { type JobPost } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { capitalize } from '@/utils';

import s from './application_jobdetailcard.module.scss';

interface Props {
  post: JobPost;
}

const JobPostCard = ({ post }: Props) => {
  const me = useMe();

  if (!me.me?.applicant) return null;

  return (
    <div className={s.job_card}>
      <Typography variant="h4">Job Detail</Typography>

      <Typography className={s.title} variant="h6">
        {post.title}
      </Typography>

      <Typography className={s.detail}>
        {capitalize(post.salaryType)}: <b>${post.salary[0]}</b> -{' '}
        {post.experienceLevel} - <BsClock /> Posted on{' '}
        {moment(post.createdAt).calendar()} - JobType:{' '}
        <b>{capitalize(post.jobType).replace('_', ' ')}</b>
      </Typography>

      <Typography variant="body1" className={s.desc}>
        {post.description}
        <b>more</b>
      </Typography>

      <Stack direction="row" gap="1rem" alignItems="center" flexWrap="wrap">
        <Stack direction="row" gap=".2rem">
          <LocationOn fontSize="small" />
          <Typography className={s.detail}>{post.location}</Typography>
        </Stack>

        <Stack direction="row" gap=".2rem">
          <PeopleAlt fontSize="small" />
          <Typography className={s.detail}>Applicants: 0</Typography>
        </Stack>

        <Stack direction="row" gap=".2rem">
          <Visibility fontSize="small" />
          <Typography className={s.detail}>120 Views</Typography>
        </Stack>
      </Stack>

      <Divider sx={{ borderColor: '#eaeaea' }} />

      <Stack gap=".5rem" color="gray" className={s.skills_list}>
        <Typography>Skills and expertise</Typography>

        <div className={s.tags}>
          {post.category.map((category) => (
            <Chip className={s.chips} label={category} key={category} />
          ))}
        </div>
      </Stack>
    </div>
  );
};

export default JobPostCard;
