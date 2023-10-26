import React from 'react';

import {
  BusinessCenter,
  CalendarTodayRounded,
  MonetizationOn,
  Place,
} from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Button,
  Chip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { capitalize } from 'lodash';
import moment from 'moment/moment';
import Link from 'next/link';
import { BiLinkExternal } from 'react-icons/bi';

import Loader from '@/components/Loader';
import {
  type Application,
  ApplicationStatus,
  InterviewStatus,
  useGetJobApplicationsQuery,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { useResponseErrorHandler } from '@/hooks/useResponseErrorHandler';

import s from './applicationdetail.module.scss';

interface Props {
  // applicationId: string;
  application: Omit<Application, 'applicant'>;
}

export const useFindApplication = (applicationId: string) => {
  const { me } = useMe();
  const jobApplicationsResponse = useGetJobApplicationsQuery({
    skip: !me?.applicant?.id,
    fetchPolicy: 'network-only',
    variables: {
      input: {
        filter: {
          applicantId: me?.applicant?.id ?? '',
        },
      },
    },
  });

  const { data, error, loading } = jobApplicationsResponse;

  useResponseErrorHandler(
    jobApplicationsResponse.error,
    'Error getting job applications',
  );

  return {
    data: data?.getJobApplications.edges.find(
      (ja) => ja.node.id === applicationId,
    )?.node,
    error,
    loading,
  };
};

const ApplicationDetail = ({ application }: Props) => {
  console.log('application : ', application);

  /* const {
    data: application,
    error,
    loading,
  } = useFindApplication(applicationId);

  if (loading) {
    return (
      <div className={s.container}>
        <Loader />
      </div>
    );
  }

  console.log('application: ', application);

  if (!application) {
    return null;
  } */

  return (
    <div className={s.container}>
      <ListItem
        className={s.list_item}
        secondaryAction={<Stack direction="row" alignItems="center"></Stack>}
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
              <Stack
                gap=".5rem"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="h6"
                  color="gray"
                  // fontWeight="400"
                  className={s.title}
                >
                  {application?.jobPost?.title}
                </Typography>

                <Chip
                  label={moment(application?.jobPost?.createdAt).format(
                    'DD MMM YYYY, hh:mm A',
                  )}
                  variant="outlined"
                  size="small"
                  sx={{ px: '.2rem', color: 'gray' }}
                  icon={<CalendarTodayRounded color="disabled" />}
                />
              </Stack>
            }
            secondary={
              <Stack className={s.secondary}>
                <div className={s.detail}>
                  <div className={s.detail_item}>
                    <BusinessCenter fontSize="small" />
                    <Typography variant="body2">
                      {capitalize(application?.jobPost?.jobSite)}
                    </Typography>
                  </div>
                  -
                  <div className={s.detail_item}>
                    <MonetizationOn fontSize="small" />
                    <Typography variant="body2">
                      {application?.jobPost?.salary} /mo
                    </Typography>
                  </div>
                  -
                  <div className={s.detail_item}>
                    <Place fontSize="small" />
                    <Typography variant="body2">
                      {application?.jobPost?.location}
                    </Typography>
                  </div>
                </div>

                <Typography className={s.desc} fontWeight={300} variant="body2">
                  {application?.jobPost?.description}
                </Typography>
              </Stack>
            }
          />
        </ListItemButton>
      </ListItem>

      <div className={s.proposal}>
        <Stack>
          <Typography variant="h6">You</Typography>
          <Typography variant="body2" color="gray">
            {moment(application.createdAt).format('DD MMM YYYY, hh:mm A')}
          </Typography>
        </Stack>

        <Alert severity="info" className={s.alert} variant="filled">
          <Typography variant="body1">
            You shared your contact with the employer.
          </Typography>
        </Alert>

        <Stack gap=".3rem">
          <Typography variant="h6">Cover Letter</Typography>
          <Typography variant="body1" fontWeight="300">
            {application?.coverLetter}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" flexWrap="wrap" gap=".5rem">
          <Stack direction="row" alignItems="center">
            <Typography variant="h6">Resume:</Typography>
            <Link href="/">
              <Button startIcon={<BiLinkExternal />}>resume.pdf</Button>
            </Link>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="h6">Email :</Typography>
            <Typography variant="subtitle2">{application?.email}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="h6">Phone :</Typography>
            <Typography variant="subtitle2">{application?.phone}</Typography>
          </Stack>
        </Stack>

        {application.status === 'PENDING' && (
          <Alert severity="warning" className={s.alert}>
            <Typography variant="body1">
              Please wait for the recruiter to respond.
            </Typography>
          </Alert>
        )}

        {application.status === 'INTERVIEW' && (
          <Alert severity="success" className={s.alert}>
            <Typography variant="body1">
              Great You have an interview scheduled. Please check your email for
              more.
            </Typography>
          </Alert>
        )}

        {application?.status === ApplicationStatus.Offer && (
          <Alert severity="success" className={s.alert}>
            <Typography variant="body1">
              You have an offer from the employer. Please check your email for
            </Typography>
          </Alert>
        )}

        {application?.status === ApplicationStatus.Accepted && (
          <Alert severity="success" className={s.alert}>
            <Typography variant="body1">
              You have accepted the offer from the employer
            </Typography>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetail;
