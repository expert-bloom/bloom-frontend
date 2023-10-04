/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react';

import {
  BusinessCenter,
  CalendarToday,
  Delete,
  HideImage,
  LocalOffer,
  MonetizationOn,
  Place,
  Save,
  Star,
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
  Typography,
} from '@mui/material';
import moment from 'moment/moment';
import { toast } from 'react-hot-toast';

import {
  Application,
  type ApplicationsWithApplicant,
  GetSavedApplicantsDocument,
  type GetSavedApplicantsQuery,
  MeDocument,
  SaveApplicantDocument,
  useGetCompanyJobPostsQuery,
  useGetSavedApplicantsQuery,
  useSaveApplicantMutation,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { useAppStore } from '@/lib/store';

import s from './applied.module.scss';

const MarketPlace = () => {
  const { me } = useMe();
  const [savedApplicants, setSavedApplicants] = useState<
    GetSavedApplicantsQuery['getSavedApplicant']
  >([]);
  const { setProfileDetail } = useAppStore();
  const [applications, setApplications] = useState<ApplicationsWithApplicant[]>(
    [],
  );

  const selectedJobPostId = useAppStore((state) => state.selectedJobPostId);
  const jobPostPayload = useGetCompanyJobPostsQuery({
    skip: !me?.company?.id || !selectedJobPostId,
    variables: {
      input: {
        companyId: me?.company?.id ?? '',
      },
    },
  });

  const [saveApplicant, savedPayload] = useSaveApplicantMutation();

  useEffect(() => {
    if (
      !selectedJobPostId ||
      !jobPostPayload.data?.getCompanyJobPosts?.payload ||
      jobPostPayload.loading
    ) {
      return;
    }

    const payload = jobPostPayload.data?.getCompanyJobPosts?.payload?.find(
      (job) => job.jobPost?.id === selectedJobPostId,
    );

    if (!payload) {
      toast.error('No job post found with the selected id');
      return;
    }

    setApplications(payload.applicationsWithApplicant as any);
  }, [selectedJobPostId, jobPostPayload]);

  return (
    <div className={s.container}>
      <List className={s.list}>
        {applications.map(({ application, applicant }, idx) => (
          <ListItem
            key={idx}
            className={s.list_item}
            onClick={() => {
              setProfileDetail({
                profileId: application?.id,
              });
            }}
            secondaryAction={
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  startIcon={<CalendarToday />}
                >
                  Interview
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  startIcon={<StarOutlineTwoTone />}
                >
                  Offer
                </Button>
                <LoadingButton
                  loading={savedPayload.loading}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  startIcon={<VisibilityOff />}
                  color="inherit"
                >
                  Hide
                </LoadingButton>
              </Stack>
            }
          >
            <ListItemButton className={s.list_item_btn}>
              <ListItemIcon>
                <Avatar className={s.avatar} src={applicant?.account.image} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h6" color="gray" fontWeight="600">
                      {`${applicant?.account.firstName} ${applicant?.account.lastName}`}
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
                          {applicant?.jobPosition}
                        </Typography>
                      </div>
                      -
                      <div className={s.detail_item}>
                        <MonetizationOn fontSize="small" />
                        <Typography variant="body2">
                          {applicant?.salaryExpectation?.toLocaleString()}
                          /mo
                        </Typography>
                      </div>
                      -
                      <div className={s.detail_item}>
                        <Place fontSize="small" />
                        <Typography variant="body2">
                          {applicant?.location}
                        </Typography>
                      </div>
                    </div>

                    <Typography variant="body1" className={s.cover_letter}>
                      {application.coverLetter}
                    </Typography>

                    <div className={s.skills}>
                      skills:
                      {applicant?.skills
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

      {applications.length === 0 && (
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

      {applications.length > 0 && (
        <Pagination
          className={s.pagination}
          count={savedApplicants.length}
          variant="outlined"
          shape="rounded"
        />
      )}
    </div>
  );
};

export default MarketPlace;
