import React, { useEffect } from 'react';

import {
  BusinessCenter,
  CalendarTodayRounded,
  Cancel,
  MonetizationOn,
  Place,
  Send,
} from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Avatar,
  Checkbox,
  Chip,
  FormControlLabel,
  FormLabel,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { capitalize } from 'lodash';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import YouTube from 'react-youtube';
import SimpleBar from 'simplebar-react';

import Loader from '@/components/Loader';
import { MoButton } from '@/components/MoButton';
import {
  GetCompanyJobApplicationsDocument,
  GetJobApplicationsDocument,
  InterviewStatus,
  OfferStatus,
  useRespondToInterviewMutation,
  useRespondToOfferMutation,
} from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { useFindApplication } from '@/scenes/Applicant/ApplicationProcess/components/ApplicationDetail';
import { getYoutubeIdFromURL } from '@/utils';

import s from './applicationdetail.module.scss';

interface Props {
  applicationId: string;
}

const ApplicationDetail = ({ applicationId }: Props) => {
  const { me } = useMe();
  const [showPreview, setShowPreview] = React.useState(false);
  const [interviewVideoLink, setInterviewVideoLink] = React.useState({
    url: '',
    error: false,
    errorMsg: '',
  });
  const [respondToOffer, respondToOfferResponse] = useRespondToOfferMutation();

  const {
    data: application,
    error,
    loading,
  } = useFindApplication(applicationId);

  useEffect(() => {
    if (application?.interview?.answerVideo) {
      setInterviewVideoLink({
        url: application?.interview?.answerVideo,
        error: false,
        errorMsg: '',
      });
    }
  }, [application]);

  if (loading) {
    return (
      <div className={s.container}>
        <Loader />
      </div>
    );
  }

  if (!application?.offer) {
    return (
      <div className={s.container}>
        <Alert severity="warning">
          <AlertTitle>
            <Typography variant="h6">No Offer Yet</Typography>
          </AlertTitle>
          <Typography variant="body1">You do not have an offer yet.</Typography>
        </Alert>
      </div>
    );
  }

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

      {application?.offer?.status === OfferStatus.Pending && (
        <Alert severity="success">
          <AlertTitle>
            <Typography variant="h6">New Offer</Typography>
          </AlertTitle>
          <Typography variant="body1">
            You have an offer from the employer
          </Typography>
        </Alert>
      )}

      {application?.offer?.status === OfferStatus.Accepted && (
        <Alert severity="success">
          <AlertTitle>
            <Typography variant="h6">Offer Accepted</Typography>
          </AlertTitle>
          <Typography variant="body1">You have joined the company.</Typography>
        </Alert>
      )}

      <Stack gap=".7rem" flex="1" style={{ width: '100%' }}>
        <FormLabel>Offer Detail</FormLabel>
        <TextField
          fullWidth
          required
          multiline
          rows={5}
          disabled={true}
          InputProps={{
            readOnly: true,
          }}
          value={application?.offer?.description ?? '-'}
        />
      </Stack>

      {application?.offer?.status === 'PENDING' && (
        <div className={s.action}>
          <MoButton
            variant="outlined"
            color="error"
            size="large"
            startIcon={<Cancel />}
            loading={respondToOfferResponse.loading}
            onClick={() => {
              respondToOffer({
                refetchQueries: [
                  GetJobApplicationsDocument,
                  GetCompanyJobApplicationsDocument,
                ],
                awaitRefetchQueries: true,
                variables: {
                  input: {
                    applicationId: application?.id ?? '',
                    offerId: application?.offer?.id ?? '',
                    applicantId: me?.applicant?.id ?? '',
                    refuse: true,
                  },
                },
              })
                .then((res) => {
                  if (res.data?.respondToOffer?.id) {
                    toast.success('Interview video submitted successfully');
                  }
                })
                .catch((error) => {
                  toast.error(error.message);
                });
            }}
          >
            Reject Interview
          </MoButton>

          <MoButton
            variant="contained"
            size="large"
            startIcon={<Send />}
            disabled={!interviewVideoLink}
            loading={respondToOfferResponse.loading}
            onClick={() => {
              respondToOffer({
                refetchQueries: [
                  GetJobApplicationsDocument,
                  GetCompanyJobApplicationsDocument,
                ],
                awaitRefetchQueries: true,
                variables: {
                  input: {
                    applicationId: application?.id ?? '',
                    offerId: application?.offer?.id ?? '',
                    applicantId: me?.applicant?.id ?? '',
                  },
                },
              })
                .then((res) => {
                  if (res.data?.respondToOffer?.id) {
                    toast.success('Offer accepted successfully');
                  }
                })
                .catch((error) => {
                  toast.error(error.message);
                });
            }}
          >
            Accept The Offer
          </MoButton>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetail;
