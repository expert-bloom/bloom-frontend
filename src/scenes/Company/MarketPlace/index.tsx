import React, { useEffect, useState } from 'react';

import {
  AccountCircle,
  Contacts,
  EditRounded,
  LocalOffer,
  PendingActions,
  Settings,
  WorkTwoTone,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  CircularProgress,
  FormLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import { MotionParent } from '@/components/MotionItems';
import { useGetCompanyJobPostsQuery } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { useResponseErrorHandler } from '@/hooks/useResponseErrorHandler';
import { useAppStore } from '@/lib/store';
import AppliedApplicants from '@/scenes/Company/MarketPlace/AppliedApplicants';
import BestMatch from '@/scenes/Company/MarketPlace/BestMatch';
import Offers from '@/scenes/Company/MarketPlace/Offers';
import SavedApplicants from '@/scenes/Company/MarketPlace/SavedApplicants';
import InterviewApplicants from 'src/scenes/Company/MarketPlace/Interview';

import s from './marketplace.module.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const marketPlaceItems = [
  {
    name: 'Best Match',
    component: (props: any) => <BestMatch {...props} />,
    schema: '',
    Icon: AccountCircle,
  },
  {
    name: 'Applicants',
    component: (props: any) => <AppliedApplicants {...props} />,
    schema: '',
    Icon: Contacts,
  },
  {
    name: 'Interview',
    component: (props: any) => <InterviewApplicants {...props} />,
    Icon: Settings,
  },
  {
    name: 'Offers',
    component: (props: any) => <Offers {...props} />,
    Icon: LocalOffer,
  },
  {
    name: 'Saved',
    component: (props: any) => <SavedApplicants {...props} />,
    schema: '',
    Icon: PendingActions,
  },
];

const MarketPlace = () => {
  const { me, loading: meLoading } = useMe();
  const [selectedJobPostId, setSelectedJobPostId] = React.useState<string>('');
  const setAppStoreJobPostId = useAppStore(
    (state) => state.setSelectedJobPostId,
  );

  const [activeStep, setActiveStep] = useState(0);
  const [currentTab, setCurrentTab] = useState<typeof marketPlaceItems[number]>(
    {
      ...marketPlaceItems[activeStep],
    },
  );

  /*  const jobPostPayload = useGetJobPostsQuery({
      skip: !me?.company?.id,
      variables: {
        input: {
          companyId: me?.company?.id ?? '',
        },
      },
    }); */

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
    setCurrentTab({ ...marketPlaceItems[activeStep] });
  }, [activeStep]);

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

  useEffect(() => {
    if (selectedJobPostId) {
      setAppStoreJobPostId(selectedJobPostId);
    }
  }, [selectedJobPostId]);

  if (
    jobPostPayload.loading ||
    meLoading ||
    !jobPostPayload.data?.getCompanyJobPosts?.jobPosts
  ) {
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.loading}>
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  }

  const posts = jobPostPayload.data?.getCompanyJobPosts.jobPosts;

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <header className={s.mp_header}>
          <Stack gap={0.5} flex="1" justifyContent="space-between">
            <FormLabel>Select Job Post</FormLabel>

            <Stack direction="row" gap="1rem" alignItems="center">
              <Select
                className={s.select}
                value={selectedJobPostId}
                onChange={(e) => {
                  setSelectedJobPostId(e.target.value);
                }}
                MenuProps={MenuProps}
                renderValue={(selected) => (
                  <Stack direction="row" alignItems="center" gap=".5rem">
                    <WorkTwoTone color="primary" />
                    <ListItemText
                      className={s.selected}
                      // sx={{ py: '.4rem' }}
                      primary={
                        posts?.find((post) => post.id === selected)?.title ??
                        'Select Job Post'
                      }
                    />
                  </Stack>
                )}
              >
                {posts.map((job, idx) => (
                  <MenuItem value={job.id} key={idx}>
                    <Stack direction="row" alignItems="center" gap="1rem">
                      <WorkTwoTone color="disabled" />
                      <ListItemText sx={{ py: '.4rem' }} primary={job.title} />
                    </Stack>
                  </MenuItem>
                ))}
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
                  // size="small"
                  variant="outlined"
                  color="primary"
                  startIcon={<EditRounded />}
                  disabled={!selectedJobPostId}
                  sx={{ borderRadius: '.5rem' }}
                >
                  Edit Post
                </LoadingButton>
              </Link>
            </Stack>
          </Stack>
        </header>

        <div className={s.content}>
          <motion.div layoutId="tab_nav" className={s.tab_list}>
            {marketPlaceItems.map((item, idx) => (
              <Button
                startIcon={<item.Icon />}
                color="secondary"
                variant="outlined"
                key={idx}
                className={clsx([
                  s.tab,
                  currentTab.name === item.name && s.active,
                ])}
                onClick={() => {
                  setActiveStep(idx);
                }}
              >
                {item.name}

                {currentTab.name === item.name && (
                  <motion.div
                    layoutId="active"
                    className={s.active_indicator}
                  />
                )}
              </Button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <MotionParent className={s.animator} key={currentTab.name}>
              {currentTab?.component({})}
            </MotionParent>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
