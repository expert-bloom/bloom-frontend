import React from 'react';

import {
  BusinessCenter,
  CalendarToday,
  MonetizationOn,
  Place,
  Save,
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

import {
  GetSavedApplicantsDocument,
  MeDocument,
  useGetApplicantsQuery,
  useSaveApplicantMutation,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { useAppStore } from '@/lib/store';
import QueryComponent from '@/scenes/Company/MarketPlace/BestMatch/QueryComponent';

import s from './bestmatch.module.scss';

const MarketPlace = () => {
  const { me } = useMe();
  const { selectedJobPostId, setProfileDetail } = useAppStore();

  // todo : convert this to getBestMatchApplicantsQuery
  const bestMatchQuery = useGetApplicantsQuery({
    skip: !selectedJobPostId || !me?.company?.id,
    variables: {
      input: {
        filter: {
          ids: [],
        },
      },
    },
  });

  const [saveApplicant, savedPayload] = useSaveApplicantMutation();

  const onSaveApplicant = (applicantId: string, save = true) => {
    const saved = saveApplicant({
      variables: {
        input: {
          companyId: me?.company?.id ?? '',
          applicantId,
          save,
        },
      },
      refetchQueries: [MeDocument, GetSavedApplicantsDocument],
    });
  };

  // console.log('applicantsPayload : ', applicantsPayload);

  return (
    <QueryComponent
      data={bestMatchQuery}
      loading={!selectedJobPostId}
      errorMessage={'Something went wrong loading best match applicants'}
    >
      {(data) => (
        <div className={s.container}>
          <List className={s.list}>
            {data.data?.getApplicants?.edges.map(({ node: applicant }, idx) => {
              const saved = me?.company?.savedApplicants.find(
                (savedApplicant) => savedApplicant.id === applicant.id,
              );

              return (
                <ListItem
                  key={idx}
                  className={s.list_item}
                  secondaryAction={
                    <Stack direction="row" alignItems="center">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        startIcon={<CalendarToday />}
                      >
                        Interview
                      </Button>
                      <LoadingButton
                        loading={savedPayload.loading}
                        onClick={(e) => {
                          e.stopPropagation();

                          onSaveApplicant(applicant.id, !saved);
                        }}
                        startIcon={<Save />}
                      >
                        {saved ? 'Unsave' : 'Save'}
                      </LoadingButton>
                    </Stack>
                  }
                  onClick={() => {
                    setProfileDetail({
                      profileId: applicant?.id,
                    });
                  }}
                >
                  <ListItemButton className={s.list_item_btn}>
                    <ListItemIcon>
                      <Avatar
                        className={s.avatar}
                        src={applicant?.account.image}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6" color="gray" fontWeight="600">
                          {`${applicant?.account.firstName} ${applicant.account.lastName}`}
                        </Typography>
                      }
                      secondary={
                        <Stack className={s.secondary}>
                          <div className={s.detail}>
                            <div className={s.detail_item}>
                              <BusinessCenter fontSize="small" />
                              <Typography variant="body2">
                                {applicant.jobPosition}
                              </Typography>
                            </div>
                            -
                            <div className={s.detail_item}>
                              <MonetizationOn fontSize="small" />
                              <Typography variant="body2">
                                {applicant.salaryExpectation?.toLocaleString()}
                                /mo
                              </Typography>
                            </div>
                            -
                            <div className={s.detail_item}>
                              <Place fontSize="small" />
                              <Typography variant="body2">
                                {applicant.location}
                              </Typography>
                            </div>
                          </div>

                          <div className={s.skills}>
                            skills:
                            {applicant?.skills
                              ?.slice(0, 5)
                              .map((skill, idx) => (
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
              );
            })}
          </List>

          {!data.data?.getApplicants?.edges && (
            <div className={s.not_found}>
              <Alert severity="info">
                <AlertTitle>
                  <Typography variant="h6">No Best-Matches</Typography>
                </AlertTitle>
                <Typography>
                  No best match applicant found for this job post.
                </Typography>
              </Alert>
            </div>
          )}

          {!data.loading && data.data?.getApplicants?.edges.length && (
            <Pagination
              className={s.pagination}
              count={data.data?.getApplicants?.edges.length}
              variant="outlined"
              shape="rounded"
            />
          )}
        </div>
      )}
    </QueryComponent>
  );
};

export default MarketPlace;
