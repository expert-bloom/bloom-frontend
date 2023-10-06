/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';

import {
  BusinessCenter,
  CalendarToday,
  MonetizationOn,
  Place,
  StarOutlineTwoTone,
  VisibilityOff,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
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
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import moment from 'moment/moment';

import Loader from '@/components/Loader';
import { useGetCompanyJobApplicationsQuery } from '@/graphql/client/gql/schema';
import { useResponseErrorHandler } from '@/hooks/useResponseErrorHandler';
import { useAppStore } from '@/lib/store';

import s from './saved.module.scss';

const InterviewApplicants = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { setApplicantDetail } = useAppStore();
  const selectedJobPostId = useAppStore((state) => state.selectedJobPostId);

  const jobApplications = useGetCompanyJobApplicationsQuery({
    skip: !selectedJobPostId,
    variables: {
      input: {
        filter: {
          jobPostId: selectedJobPostId,
        },
      },
    },
  });
  const { error, data: applications, loading } = jobApplications;

  useResponseErrorHandler(
    error,
    'An error occurred while getting job applications',
  );

  if (loading) {
    return (
      <div className={s.container}>
        <Loader />
      </div>
    );
  }

  if (!applications?.getJobApplications) {
    return null;
  }

  const applicationsWithApplicant = applications.getJobApplications.edges;

  return (
    <div className={s.container}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        // variant="fullWidth"
      >
        <Tab label="Requested" />
        <Tab label="Responded" />
        <Tab label="Refused" />
      </Tabs>

      <List className={s.list}>
        {applicationsWithApplicant.map(({ node: application }, idx) => (
          <ListItem
            key={idx}
            disablePadding
            className={s.list_item}
            onClick={() => {
              setApplicantDetail({
                selectedApplicationId: application.id,
              });
            }}
            secondaryAction={
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Alert severity="info">
                  <Typography>{application?.interview?.status}</Typography>
                </Alert>
              </Stack>
            }
          >
            <ListItemButton className={s.list_item_btn}>
              <ListItemIcon>
                <Avatar
                  className={s.avatar}
                  src={application?.applicant?.account.image}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h6" color="gray" fontWeight="600">
                      {`${application?.applicant?.account.firstName} ${application?.applicant?.account.lastName}`}
                    </Typography>
                    <Chip
                      size="small"
                      variant="outlined"
                      className={s.chip}
                      label={
                        <Typography variant="caption" color="gray">
                          {moment(application.createdAt).format('MMM DD, YYYY')}
                        </Typography>
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
                          {application?.applicant?.jobPosition}
                        </Typography>
                      </div>
                      -
                      <div className={s.detail_item}>
                        <MonetizationOn fontSize="small" />
                        <Typography variant="body2">
                          {application?.applicant?.salaryExpectation?.toLocaleString()}
                          /mo
                        </Typography>
                      </div>
                      -
                      <div className={s.detail_item}>
                        <Place fontSize="small" />
                        <Typography variant="body2">
                          {application?.applicant?.location}
                        </Typography>
                      </div>
                    </div>

                    <Typography variant="body1" className={s.cover_letter}>
                      {application.coverLetter}
                    </Typography>

                    <div className={s.skills}>
                      {application?.applicant?.skills
                        ?.slice(0, 5)
                        .map((skill: any, idx: any) => (
                          <>
                            <Chip
                              key={idx}
                              variant="outlined"
                              label={skill}
                              size="small"
                            />
                          </>
                        ))}
                    </div>
                  </Stack>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {applicationsWithApplicant.length === 0 && (
        <div className={s.not_found}>
          <Alert severity="info">
            <AlertTitle>
              <Typography variant="h6">No Applicant Yet</Typography>
            </AlertTitle>
            <Typography>
              You do not have any applicant yet. Click the button below to save
            </Typography>
          </Alert>
        </div>
      )}

      {applicationsWithApplicant.length > 0 && (
        <Pagination
          className={s.pagination}
          count={applicationsWithApplicant.length}
          variant="outlined"
          shape="rounded"
        />
      )}
    </div>
  );
};

export default InterviewApplicants;
