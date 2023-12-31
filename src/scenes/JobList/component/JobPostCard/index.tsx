/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState, useTransition } from 'react';

import { Bookmark, LocationOn } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Chip, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { BsClock } from 'react-icons/bs';

import {
  type JobPost,
  MeDocument,
  useSaveJobPostMutation,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { useResponseErrorHandler } from '@/hooks/useResponseErrorHandler';
import { useAppStore } from '@/lib/store';
import { capitalize } from '@/utils';

import s from './jobpostcard.module.scss';

interface Props {
  post: JobPost;
}

const JobPostCard = ({ post }: Props) => {
  const setJobPostDetailId = useAppStore((state) => state.setJobPostDetailId);

  const me = useMe();
  const [saveJob, savePayload] = useSaveJobPostMutation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  useResponseErrorHandler(savePayload.error, 'Error saving job');

  useEffect(() => {
    startTransition(() => {
      setIsSaved(
        !!me.me?.applicant?.savedJobs?.edges.find(
          (saved) => saved.node.id === post.id,
        ),
      );
    });
  }, [me.me?.applicant, post]);

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

  if (!me.me?.applicant) return null;

  const applicant = me.me.applicant;

  return (
    <div
      className={s.job_card}
      onClick={() => {
        setJobPostDetailId({
          jobPostId: post.id,
        });
      }}
    >
      {!me.me.profileCompleteness && (
        <Alert className={s.incomplete_profile} severity="warning">
          <Typography>complete your profile to start applying</Typography>
        </Alert>
      )}

      <div className={s.title_div}>
        <Typography className={s.title} variant="h6">
          {post.title}
        </Typography>

        <LoadingButton
          loading={isLoading || savePayload.loading || isPending}
          color={isSaved ? 'primary' : 'secondary'}
          size="large"
          className={s.bookmark}
          onClick={async (e) => {
            e.stopPropagation();
            if (!me.me) return;

            setIsLoading(true);

            const lToast = toast.loading('Saving Job-Post ...');

            const savedJob = await saveJob({
              variables: {
                input: {
                  jobPostId: post.id,
                  accountId: me.me.id,
                  save: !isSaved,
                },
              },
              refetchQueries: [MeDocument],
            });

            if (savedJob.errors) {
              toast.success('Error saving job');
              toast.dismiss(lToast);
              setIsLoading(false);
              return;
            }

            if (savedJob.data?.saveJobPost?.id) {
              toast.success('Job-Post Saved for later.');
            }

            toast.dismiss(lToast);
            setIsLoading(false);
          }}
        >
          <Bookmark />
        </LoadingButton>
      </div>

      <Typography className={s.detail}>
        {capitalize(post.salaryType)}: <b>${post.salary[0]}</b> -{' '}
        {post.experienceLevel} - <BsClock /> Posted{' '}
        {moment(post.createdAt).calendar()} - JobType:{' '}
        <b>{capitalize(post.jobType).replace('_', ' ')}</b>
      </Typography>

      <Typography variant="body1" className={s.desc}>
        {post.description}
        <b>more</b>
      </Typography>

      <div className={s.tags}>
        {post.category.map((category) => (
          <Chip label={category} key={category} />
        ))}
      </div>

      <Typography className={s.detail}>Applicants: 0</Typography>

      <Stack direction="row" gap=".3rem">
        <LocationOn fontSize="small" />
        <Typography className={s.detail}>{post.location}</Typography>
      </Stack>
    </div>
  );
};

export default JobPostCard;
