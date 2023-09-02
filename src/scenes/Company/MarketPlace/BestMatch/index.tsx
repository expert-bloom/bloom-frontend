import React, { useEffect, useState } from 'react';

import {
  BusinessCenter,
  CalendarToday,
  MonetizationOn,
  Place,
  Save,
} from '@mui/icons-material';
import {
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

import { useGetApplicantsQuery } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { useAppStore } from '@/lib/store';

import s from './bestmatch.module.scss';

const MarketPlace = () => {
  const { me } = useMe();
  const [selectedJobPost, setSelectedJobPost] = useState<string>('');
  const { setProfileDetail } = useAppStore();

  const applicantsPayload = useGetApplicantsQuery({
    // fetchPolicy: 'network-only',
    // skip: !selectedJobPost || !me?.company?.id,
    variables: {
      input: {
        filter: {
          ids: [],
        },
      },
    },
  });

  // console.log('applicantsPayload : ', applicantsPayload);

  useEffect(() => {
    if (applicantsPayload.data?.getApplicants?.edges && !selectedJobPost) {
      setSelectedJobPost(applicantsPayload.data.getApplicants.edges[0].node.id);
    }

    if (applicantsPayload.error) {
      toast.error(applicantsPayload.error.message);
    }
  }, [applicantsPayload]);

  return (
    <div className={s.container}>
      <List className={s.list}>
        {applicantsPayload.data?.getApplicants?.edges
          .concat(applicantsPayload.data?.getApplicants?.edges)
          .concat(applicantsPayload.data?.getApplicants?.edges)
          .concat(applicantsPayload.data?.getApplicants?.edges)
          .map(({ node: applicant }, idx) => (
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
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    startIcon={<Save />}
                  >
                    Save
                  </Button>
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
                        {applicant?.skills
                          ?.slice(0, 4)
                          ?.concat(applicant.skills)
                          ?.concat(applicant.skills)
                          ?.concat(applicant.skills)
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
          ))}
      </List>

      <Pagination
        className={s.pagination}
        count={10}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};

export default MarketPlace;
