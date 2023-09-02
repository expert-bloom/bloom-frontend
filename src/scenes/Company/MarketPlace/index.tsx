import React, { useEffect, useState } from 'react';

import {
  AccountCircle,
  Contacts,
  EditRounded,
  PendingActions,
  Settings,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  FormLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { MotionParent } from '@/components/MotionItems';
import { useGetJobPostsQuery } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import BestMatch from '@/scenes/Company/MarketPlace/BestMatch';

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
    component: (props: any) => <h1 {...props}>APPLICANT</h1>,
    schema: '',
    Icon: Contacts,
  },
  {
    name: 'Saved',
    component: (props: any) => <h1>SAVED</h1>,
    schema: '',
    Icon: PendingActions,
  },
  {
    name: 'Interview',
    component: (props: any) => <h1>INTERVIEW</h1>,
    Icon: Settings,
  } /* {
    name: 'Done',
    component: (props: any) => <h1>congradulation </h1>,
  }, */,
];

const MarketPlace = () => {
  const { me } = useMe();
  const [selectedJobPost, setSelectedJobPost] = React.useState<string>('');

  const [activeStep, setActiveStep] = useState(0);
  const [currentTab, setCurrentTab] = useState<typeof marketPlaceItems[number]>(
    {
      ...marketPlaceItems[activeStep],
    },
  );

  const jobPostPayload = useGetJobPostsQuery({
    skip: !me?.company?.id,
    variables: {
      input: {
        companyId: me?.company?.id ?? '',
      },
    },
  });
  const posts = jobPostPayload.data?.getJobPosts;

  useEffect(() => {
    setCurrentTab({ ...marketPlaceItems[activeStep] });
  }, [activeStep]);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <header className={s.mp_header}>
          <Stack gap={0.5} flex="1" justifyContent="space-between">
            <FormLabel>Select Job Post</FormLabel>

            <Select
              value={selectedJobPost}
              onChange={(e) => {
                setSelectedJobPost(e.target.value);
              }}
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <ListItemText
                  className={s.selected}
                  sx={{ py: '.4rem' }}
                  primary={
                    posts?.find((post) => post.id === selected)?.title ??
                    'Select Job Post'
                  }
                />
              )}
            >
              {jobPostPayload.data?.getJobPosts.map((job, idx) => (
                <MenuItem value={job.id} key={idx}>
                  <ListItemText sx={{ py: '.4rem' }} primary={job.title} />
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <LoadingButton
            size="small"
            variant="contained"
            color="primary"
            startIcon={<EditRounded />}
          >
            Edit Post
          </LoadingButton>
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
