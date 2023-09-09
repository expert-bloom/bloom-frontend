/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react';

import {
  BusinessCenter,
  CalendarToday,
  Delete,
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
import { toast } from 'react-hot-toast';

import {
  GetSavedApplicantsDocument,
  type GetSavedApplicantsQuery,
  MeDocument,
  SaveApplicantDocument,
  useGetSavedApplicantsQuery,
  useSaveApplicantMutation,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { useAppStore } from '@/lib/store';

import s from './saved.module.scss';

const MarketPlace = () => {
  const { me } = useMe();
  const [savedApplicants, setSavedApplicants] = useState<
    GetSavedApplicantsQuery['getSavedApplicant']
  >([]);
  const { setProfileDetail } = useAppStore();

  const savedApplicantsPayload = useGetSavedApplicantsQuery({
    fetchPolicy: 'network-only',
    skip: !me?.company?.id,
    variables: {
      input: {
        companyId: me?.company?.id ?? '',
      },
    },
  });

  const [saveApplicant, savedPayload] = useSaveApplicantMutation();
  const onRemoveSavedApplicant = (applicantId: string) => {
    void saveApplicant({
      variables: {
        input: {
          companyId: me?.company?.id ?? '',
          applicantId,
          save: false,
        },
      },
      refetchQueries: [MeDocument, GetSavedApplicantsDocument],
    });
  };

  useEffect(() => {
    if (savedApplicantsPayload.data?.getSavedApplicant) {
      setSavedApplicants(savedApplicantsPayload.data.getSavedApplicant);
    }

    if (savedApplicantsPayload.error) {
      toast.error(savedApplicantsPayload.error.message);
    }
  }, [savedApplicantsPayload]);

  return (
    <div className={s.container}>
      <List className={s.list}>
        {savedApplicants.map((applicant, idx) => (
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
                    onRemoveSavedApplicant(applicant.id);
                  }}
                  startIcon={<Delete />}
                  color="error"
                >
                  Delete
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
                <Avatar className={s.avatar} src={applicant?.account.image} />
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
                      {applicant?.skills?.slice(0, 5).map((skill, idx) => (
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

      {savedApplicants.length === 0 && !savedApplicantsPayload.loading && (
        <div className={s.not_found}>
          <Alert severity="info">
            <AlertTitle>
              <Typography variant="h6">No Saved Applicant</Typography>
            </AlertTitle>
            <Typography>
              You have not saved any applicant yet. Click the button below to
              save
            </Typography>
          </Alert>
        </div>
      )}

      {savedApplicants.length > 0 && (
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
