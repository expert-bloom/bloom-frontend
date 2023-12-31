import React, { useEffect, useState } from 'react';

import {
  AccountCircle,
  BusinessCenter,
  CalendarTodayRounded,
  MonetizationOn,
  PendingActions,
  Place,
} from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Chip,
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
import moment from 'moment/moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { MotionParent } from '@/components/MotionItems';
import {
  type Application,
  useGetJobApplicationsQuery,
} from '@/graphql/client/gql/schema';
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

  const [currentPageApplications, setCurrentPageApplications] =
    useState<Application[]>();

  const jobApplications = useGetJobApplicationsQuery({
    skip: !me?.applicant?.id,
    variables: {
      includeCompany: true,
      input: {
        filter: {
          applicantId: me?.applicant?.id ?? '',
        },
      },
    },
  });
  const { error, data: applications } = jobApplications;

  // console.log('jobposts payload  :', jobApplications);

  useResponseErrorHandler(
    error,
    'An error occurred while getting job applications',
  );

  useEffect(() => {
    setCurrentTab({ ...myInterviewItems[activeStep] });
  }, [activeStep]);

  useEffect(() => {
    // handle the pagination

    if (
      jobApplications.loading ||
      !applications ||
      !applications.getJobApplications
    )
      return;

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentPageApplications(
      applications.getJobApplications.edges
        .filter((e) => e.node !== null)
        .map((edge) => edge.node as Application)
        .slice(start, end),
    );
  }, [page, itemsPerPage, jobApplications]);

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
              {currentPageApplications && currentPageApplications.length > 0 ? (
                <>
                  <List className={s.list}>
                    {currentPageApplications.map((applciation, idx) => {
                      if (!applciation.jobPost)
                        return (
                          <Alert className={s.alert}>
                            <AlertTitle>
                              <Typography variant="h4">
                                Job Post deleted or not found
                              </Typography>
                            </AlertTitle>
                          </Alert>
                        );

                      const post = applciation.jobPost;

                      return (
                        <Link
                          href={`/applicant/my-interviews/application/${applciation.id}`}
                          key={applciation.id}
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
                                <Stack
                                  gap="1rem"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <Avatar
                                    className={s.avatar}
                                    // src={applicant?.account.image}
                                  />
                                  <Stack textAlign="center">
                                    <Typography variant="h6">
                                      {applciation?.company?.companyName ?? '-'}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                  >
                                    <Typography
                                      variant="h6"
                                      color="gray"
                                      fontWeight="400"
                                      className={s.title}
                                    >
                                      {post.title}
                                    </Typography>

                                    <Chip
                                      label={moment(
                                        applciation.createdAt,
                                      ).format('DD MMM YYYY, hh:mm A')}
                                      variant="outlined"
                                      size="small"
                                      sx={{ px: '.2rem', color: 'gray' }}
                                      icon={
                                        <CalendarTodayRounded color="disabled" />
                                      }
                                    />
                                  </Stack>
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
                                      className={s.desc}
                                      fontWeight={300}
                                      variant="body2"
                                    >
                                      {post.description.slice(0, 100)}
                                    </Typography>

                                    <Typography>
                                      You shared your contacts with the job-post
                                      owner.
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
                        (jobApplications.data?.getJobApplications.edges
                          ?.length ?? 0) / itemsPerPage,
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
