import React, { useEffect } from 'react';

import { EditRounded, WorkTwoTone } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Chip,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import moment from 'moment';
import Link from 'next/link';

import Loader from '@/components/Loader';
import { useGetCompanyJobPostsQuery } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { useResponseErrorHandler } from '@/hooks/useResponseErrorHandler';
import { useAppStore } from '@/lib/store';
import s from '@/scenes/Company/MarketPlace/marketplace.module.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MarketPlaceToolBar = () => {
  const { me, loading: meLoading } = useMe();
  // const [selectedJobPostId, setSelectedJobPostId] = React.useState<string>('');

  const { selectedJobPostId, setSelectedJobPostId } = useAppStore();
  const [selectedJobPost, setSelectedJobPost] = React.useState<any>();

  const jobPostPayload = useGetCompanyJobPostsQuery({
    skip: !me?.company?.id,
    variables: {
      input: {
        companyId: me?.company?.id ?? '',
      },
    },
  });

  useResponseErrorHandler(
    jobPostPayload.error,
    'Something went wrong loading marketplace',
  );

  useEffect(() => {
    if (
      !jobPostPayload.loading &&
      jobPostPayload.data?.getCompanyJobPosts?.jobPosts &&
      !selectedJobPost
    ) {
      setSelectedJobPost(
        jobPostPayload.data.getCompanyJobPosts?.jobPosts[0].id,
      );
    }
  }, [jobPostPayload]);

  useEffect(() => {
    if (
      jobPostPayload.loading ||
      meLoading ||
      !jobPostPayload.data?.getCompanyJobPosts
    )
      return;

    if (
      !selectedJobPostId &&
      jobPostPayload.data?.getCompanyJobPosts.jobPosts.length > 0
    ) {
      setSelectedJobPostId(
        jobPostPayload.data?.getCompanyJobPosts.jobPosts[0].id,
      );
    }
  }, [jobPostPayload]);

  return (
    <div>
      <header className={s.mp_header}>
        <Stack gap="1rem" flex="1" justifyContent="space-between">
          <Typography variant="h5">Select Job Post</Typography>

          <Stack className={s.mp_header_flex}>
            {(jobPostPayload.loading || meLoading) && (
              <div className={s.toolbar_loading}>
                <Loader style={{}} />
              </div>
            )}

            <Select
              className={s.select}
              value={selectedJobPostId}
              onChange={(e) => {
                setSelectedJobPostId(e.target.value as string);
              }}
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <Stack direction="row" alignItems="center" gap=".5rem">
                  <WorkTwoTone color="primary" />
                  <ListItemText
                    className={s.selected}
                    // sx={{ py: '.4rem' }}
                    primary={
                      jobPostPayload.data?.getCompanyJobPosts?.jobPosts?.find(
                        (post) => post.id === selected,
                      )?.title ?? 'Select Job Post'
                    }
                  />
                  <Chip
                    variant="filled"
                    size="small"
                    label={moment().toDate().toDateString()}
                  />
                </Stack>
              )}
            >
              {jobPostPayload.data?.getCompanyJobPosts?.jobPosts?.map(
                (job, idx) => (
                  <MenuItem value={job.id} key={idx}>
                    <Stack direction="row" alignItems="center" gap="1rem">
                      <WorkTwoTone color="disabled" />
                      <ListItemText sx={{ py: '.4rem' }} primary={job.title} />
                    </Stack>
                  </MenuItem>
                ),
              )}
            </Select>

            <Link
              href={`/company/edit-job-post/${selectedJobPostId}`}
              onClick={(e) => {
                if (!selectedJobPostId) {
                  e.preventDefault();
                }
              }}
            >
              <LoadingButton
                variant="outlined"
                color="primary"
                startIcon={<EditRounded />}
                disabled={!selectedJobPostId}
                sx={{ borderRadius: '.5rem' }}
              >
                Edit Post
              </LoadingButton>
            </Link>

            <Link href="/company/create-job-post">
              <LoadingButton
                variant="contained"
                color="primary"
                sx={{ borderRadius: '.5rem' }}
              >
                Create Job-Post
              </LoadingButton>
            </Link>
          </Stack>
        </Stack>
      </header>
    </div>
  );
};

export default MarketPlaceToolBar;
