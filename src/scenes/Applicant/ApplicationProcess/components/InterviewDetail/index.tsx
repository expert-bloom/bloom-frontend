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
  useRespondToInterviewMutation,
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
  const [respondToInterview, respondToInterviewResponse] =
    useRespondToInterviewMutation();

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

  if (!application?.interview) {
    return (
      <div className={s.container}>
        <Alert severity="warning">
          <AlertTitle>
            <Typography variant="h6">No Interview</Typography>
          </AlertTitle>
          <Typography variant="body1">
            You have not been invited to an interview yet
          </Typography>
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

      {application?.interview?.status ===
        InterviewStatus.ApplicantResponded && (
        <Alert severity="info">
          <AlertTitle>
            <Typography variant="h6">Interview Video Submitted</Typography>
          </AlertTitle>
          <Typography variant="body1">
            Your interview video has been submitted, you will be notified when
            the employer responds
          </Typography>
        </Alert>
      )}

      {application?.interview?.status === InterviewStatus.Pending && (
        <Alert severity="info" variant="filled">
          Upload your interview video answering the following job-post interview
          questions to youtube and paste the link here
        </Alert>
      )}

      <Stack gap=".7rem" flex="1" style={{ width: '100%' }}>
        <FormLabel>Jop Post Interview questions</FormLabel>
        <Paper elevation={2}>
          <SimpleBar
            style={{ maxHeight: '10rem' }}
            forceVisible
            autoHide={false}
          >
            <div className={s.question_list}>
              {application?.jobPost?.interviewQuestions?.map((q, i) => (
                <Stack direction="row" key={q} alignItems="center" gap=".5rem">
                  -<Typography>{q}</Typography>
                </Stack>
              ))}
            </div>
          </SimpleBar>
        </Paper>
      </Stack>

      <div className={s.intro_vid}>
        <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
          <FormLabel>Link to your YouTube video</FormLabel>
          <TextField
            fullWidth
            required
            disabled={
              application?.interview?.status ===
              InterviewStatus.ApplicantResponded
            }
            InputProps={{
              readOnly:
                application?.interview?.status ===
                InterviewStatus.ApplicantResponded,
            }}
            // make this read only

            // placeholder="Ex. https://www.youtube.com/watch?v=1234567890"
            onChange={(e) => {
              setInterviewVideoLink((prev) => ({
                error: false,
                errorMsg: '',
                url: e.target.value,
              }));
            }}
            value={interviewVideoLink}
            error={interviewVideoLink.error}
            helperText={interviewVideoLink.errorMsg}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Preivew"
            disabled={Boolean(
              !interviewVideoLink && !application?.interview?.answerVideo,
            )}
            onChange={(e, checked) => {
              setShowPreview(checked);
            }}
          />
        </Stack>

        {showPreview && interviewVideoLink?.url?.length > 0 && (
          <YouTube
            videoId={getYoutubeIdFromURL(interviewVideoLink.url)}
            style={{ width: '100%' }}
            className={s.vid}
            iframeClassName="interview_vid_iframe"
            // onReady={onReady}
            // onError={onError}
          />
        )}
      </div>

      {application?.interview?.status === 'PENDING' && (
        <div className={s.action}>
          <MoButton
            variant="outlined"
            color="error"
            size="large"
            startIcon={<Cancel />}
            loading={respondToInterviewResponse.loading}
            onClick={() => {
              if (!interviewVideoLink) {
                toast.error('Please paste your interview video link');
                return;
              }

              respondToInterview({
                refetchQueries: [
                  GetJobApplicationsDocument,
                  GetCompanyJobApplicationsDocument,
                ],
                awaitRefetchQueries: true,
                variables: {
                  input: {
                    interviewId: application?.interview?.id ?? '',
                    applicantId: me?.applicant?.id ?? '',
                    refuse: true,
                  },
                },
              })
                .then((res) => {
                  if (res.data?.respondInterview?.id) {
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
            loading={respondToInterviewResponse.loading}
            onClick={() => {
              if (!interviewVideoLink.url) {
                toast.error('Please paste your interview video link');
                return;
              }

              if (!getYoutubeIdFromURL(interviewVideoLink.url)) {
                toast.error('The supplied URL is not a valid youtube URL');
                return;
              }

              respondToInterview({
                refetchQueries: [
                  GetJobApplicationsDocument,
                  GetCompanyJobApplicationsDocument,
                ],
                awaitRefetchQueries: true,
                variables: {
                  input: {
                    interviewId: application?.interview?.id ?? '',
                    interviewVideoUrl: interviewVideoLink?.url,
                    applicantId: me?.applicant?.id ?? '',
                  },
                },
              })
                .then((res) => {
                  if (res.data?.respondInterview?.id) {
                    toast.success('Interview video submitted successfully');
                  }
                })
                .catch((error) => {
                  toast.error(error.message);
                });
            }}
          >
            Submit Interview Video
          </MoButton>
        </div>
      )}

      {application?.interview?.status ===
        InterviewStatus.ApplicantResponded && (
        <Alert severity="warning" className={s.alert}>
          <Typography variant="body1">
            Please wait for the recruiter to respond for your interview
            response.
          </Typography>
        </Alert>
      )}

      {application?.interview?.status === InterviewStatus.Accepted && (
        <Alert severity="success" className={s.alert}>
          <Typography variant="body1">
            Congratulations! Your interview has been accepted. Please proceed to
            the next step.
          </Typography>
        </Alert>
      )}
    </div>
  );
};

export default ApplicationDetail;
