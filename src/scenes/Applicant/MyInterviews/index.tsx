import React, { useEffect, useState } from 'react';

import {
  AccountCircle,
  BusinessCenter,
  MonetizationOn,
  PendingActions,
  Place,
} from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { MotionParent } from '@/components/MotionItems';
import { type JobPost, useGetJobPostsQuery } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { useResponseErrorHandler } from '@/hooks/useResponseErrorHandler';

import s from './myinterviews.module.scss';

const myInterviewItems = [
  {
    name: 'All',
    component: (props: any) => (
      <Typography variant="h1">a;lksdfja;sldkfj</Typography>
    ),
    schema: '',
    Icon: AccountCircle,
  },
  {
    name: 'Pending',
    component: (props: any) => (
      <Typography variant="h1">a;lksdfja;sldkfj</Typography>
    ),
    schema: '',
    Icon: PendingActions,
  },
  {
    name: 'Rejected',
    component: (props: any) => (
      <Typography variant="h1">a;lksdfja;sldkfj</Typography>
    ),
    schema: '',
    Icon: PendingActions,
  },
];

const MyInterviews = () => {
  const { me } = useMe();
  const router = useRouter();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [currentTab, setCurrentTab] = useState<typeof myInterviewItems[number]>(
    {
      ...myInterviewItems[activeStep],
    },
  );

  const [applications, setApplications] = useState<JobPost[] | undefined>();

  const jopPostsPayload = useGetJobPostsQuery();
  const { error, data } = jopPostsPayload;

  console.log('jobposts payload  :', jopPostsPayload);

  useResponseErrorHandler(
    error,
    'An error occurred while fetching best matches',
  );

  useEffect(() => {
    setCurrentTab({ ...myInterviewItems[activeStep] });
  }, [activeStep]);

  useEffect(() => {
    // handle the pagination

    if (jopPostsPayload.loading || !data?.getJobPosts) return;

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setApplications(data?.getJobPosts.slice(start, end));
  }, [page, itemsPerPage, jopPostsPayload]);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.content}>
          <motion.div layoutId="tab_nav" className={s.tab_list}>
            {myInterviewItems.map((item, idx) => (
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
              {applications && applications.length > 0 ? (
                <>
                  <List className={s.list}>
                    {applications.map((post, idx) => {
                      return (
                        <Link
                          href={`/applicant/my-interviews/application/${post.id}`}
                          key={post.id}
                        >
                          <ListItem
                            key={idx}
                            className={s.list_item}
                            secondaryAction={
                              <Stack
                                direction="row"
                                alignItems="center"
                              ></Stack>
                            }
                            onClick={() => {
                              // void router.push(
                              //   '/applicant/my-interviews/application/1',
                              // );
                            }}
                          >
                            <ListItemButton className={s.list_item_btn}>
                              <ListItemIcon>
                                <Avatar
                                  className={s.avatar}
                                  // src={applicant?.account.image}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="h6"
                                    color="gray"
                                    fontWeight="600"
                                    className={s.title}
                                  >
                                    {post.title}
                                  </Typography>
                                }
                                secondary={
                                  <Stack className={s.secondary}>
                                    <div className={s.detail}>
                                      <div className={s.detail_item}>
                                        <BusinessCenter fontSize="small" />
                                        <Typography variant="body2">
                                          Unknown
                                        </Typography>
                                      </div>
                                      -
                                      <div className={s.detail_item}>
                                        <MonetizationOn fontSize="small" />
                                        <Typography variant="body2">
                                          12k /mo
                                        </Typography>
                                      </div>
                                      -
                                      <div className={s.detail_item}>
                                        <Place fontSize="small" />
                                        <Typography variant="body2">
                                          USA
                                        </Typography>
                                      </div>
                                    </div>

                                    <Typography
                                      className={s.skills}
                                      fontWeight={300}
                                      variant="body2"
                                    >
                                      {post.description.slice(0, 200)}
                                    </Typography>
                                  </Stack>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        </Link>
                      );
                    })}
                  </List>

                  <Pagination
                    className={s.pagination}
                    count={
                      Math.ceil(
                        (jopPostsPayload.data?.getJobPosts?.length ?? 0) /
                          itemsPerPage,
                      ) ?? 0
                    }
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={(e, page) => {
                      setPage(page);
                    }}
                  />
                </>
              ) : (
                <Alert className={s.alert}>
                  <AlertTitle>
                    <Typography variant="h4">No Interview</Typography>
                  </AlertTitle>
                  <Typography>
                    You do not have any ongoing interview yet
                  </Typography>
                </Alert>
              )}
            </MotionParent>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyInterviews;
