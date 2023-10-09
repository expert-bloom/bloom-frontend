/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react';

import { BusinessCenter, MonetizationOn, Place } from '@mui/icons-material';
import {
  Alert,
  type AlertColor,
  AlertTitle,
  Avatar,
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
import {
  type Application,
  InterviewStatus,
  useGetCompanyJobApplicationsQuery,
} from '@/graphql/client/gql/schema';
import { useResponseErrorHandler } from '@/hooks/useResponseErrorHandler';
import { useAppStore } from '@/lib/store';

import s from './saved.module.scss';

const tabCategories = [
  {
    label: 'Invited ( Pending )',
    value: InterviewStatus.Pending,
  },
  {
    label: 'Responded',
    value: InterviewStatus.ApplicantResponded,
  },
  {
    label: 'Refused',
    value: InterviewStatus.ApplicantRefused,
  },
];

const getLabel = (status: InterviewStatus) => {
  switch (status) {
    case InterviewStatus.Pending:
      return { label: 'Wait for the applicant to respond', color: 'info' };
    case InterviewStatus.ApplicantResponded:
      return {
        label: 'Applicant Responded',
      };
    case InterviewStatus.ApplicantRefused:
      return { label: 'Applicant Refused', color: 'error' };
    default:
      return { label: status, color: 'error' };
  }
};

const InterviewApplicants = () => {
  const [activeCategories, setActiveCategories] = useState(
    tabCategories[0].value,
  );
  const [filteredCategories, setFilteredCategories] = useState<Application[]>(
    [],
  );

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    console.log('new vaues : ', newValue);
    setActiveCategories(newValue);
  };

  const { setApplicantDetail, appPopupsState, setAppPopupsState } =
    useAppStore();
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

  useEffect(() => {
    if (!applications?.getJobApplications || loading) {
      return;
    }

    const applicationsWithApplicant = applications.getJobApplications.edges;

    const filtered = applicationsWithApplicant
      .map((ap) => ap.node)
      .filter((app) => app.jobPostId === selectedJobPostId)
      .filter((app) => app?.interview?.status === activeCategories);

    setFilteredCategories(filtered);
  }, [jobApplications, activeCategories, selectedJobPostId]);

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

  return (
    <div className={s.container}>
      <Tabs
        value={activeCategories}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        // variant="fullWidth"
      >
        {tabCategories.map((label) => (
          <Tab key={label.label} label={label.label} value={label.value} />
        ))}
      </Tabs>

      <List className={s.list}>
        {filteredCategories.map((application, idx) => (
          <ListItem
            key={idx}
            disablePadding
            className={s.list_item}
            onClick={() => {
              setAppPopupsState({
                selectedApplicationId: application.id,
                showViewInterviewPopup: true,
              });
            }}
            secondaryAction={
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Alert
                  severity={
                    getLabel(application?.interview?.status as InterviewStatus)
                      .color as AlertColor
                  }
                >
                  <Typography variant="subtitle2" textTransform={'capitalize'}>
                    {
                      getLabel(
                        application?.interview?.status as InterviewStatus,
                      ).label
                    }
                  </Typography>
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

      {filteredCategories.length === 0 && (
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

      {filteredCategories.length > 0 && (
        <Pagination
          className={s.pagination}
          count={filteredCategories.length}
          variant="outlined"
          shape="rounded"
        />
      )}
    </div>
  );
};

export default InterviewApplicants;
