/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React, { useEffect } from 'react';

import {
  BusinessCenter,
  Language,
  MonetizationOn,
  Place,
  Send,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { capitalize } from 'lodash';
import { toast } from 'react-hot-toast';

import s from '@/components/commons/FixedLayer/ApplicantDetail/applican_detail.module.scss';
import { useGetApplication } from '@/components/commons/FixedLayer/ApplicantDetail/components/DetailContent';
import {
  GetCompanyJobApplicationsDocument,
  GetJobApplicationsDocument,
  useSendInterviewRequestMutation,
} from '@/graphql/client/gql/schema';
import { useAppStore } from '@/lib/store';

const message = 'a;ksldjf';

const SendInterviewPopup = () => {
  const [interviewMessage, setInterviewMessage] = React.useState('');
  const { selectedJobPostId, appPopupsState, setAppPopupsState } =
    useAppStore();

  const handleClose = () => {
    if (appPopupsState.isLoading) {
      toast.error('Please wait until the request is sent');
      return;
    }
    setAppPopupsState({
      showSendInterviewPopup: false,
    });
  };

  const [sendInterviewRequest, sendInterviewRequestRespond] =
    useSendInterviewRequestMutation();

  const { application, isLoading, error } = useGetApplication(
    selectedJobPostId as string,
    appPopupsState.selectedApplicationId as string,
  );

  const profile = application?.applicant;

  useEffect(() => {
    if (!interviewMessage && !isLoading) {
      setInterviewMessage(`Hello ${profile?.account.fullName ?? '-'},
We would like to invite you to an interview to learn more about your background and discuss the position. Please replay with your video answering the interview questions.
Thank you, 
henok
henzzo-org`);
    }
  }, []);

  const onSendInterview = () => {
    setAppPopupsState({
      isLoading: true,
    });

    sendInterviewRequest({
      refetchQueries: [
        GetCompanyJobApplicationsDocument,
        GetJobApplicationsDocument,
      ],
      variables: {
        input: {
          date: new Date(),
          applicationId: appPopupsState.selectedApplicationId as string,
          description: interviewMessage,
        },
      },
    })
      .then((res) => {
        console.log('send interview res : ', res);

        if (res.data?.sendInterviewRequest?.id) {
          toast.success('Interview request sent successfully');
          setAppPopupsState({
            showSendInterviewPopup: false,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log('sendInterview errror : ', error);
        toast.error('Failed to send interview request');
      });
  };

  if (!profile) return null;

  return (
    <Dialog
      open={
        appPopupsState.showSendInterviewPopup &&
        !!appPopupsState.selectedApplicationId
      }
      onClose={handleClose}
      scroll="paper"
      className={s.interview_dialog}
      keepMounted={false}
    >
      <DialogTitle sx={{ p: '1.5rem 1rem' }}>Request An Interview</DialogTitle>

      <DialogContent dividers sx={{ p: '.5rem 3rem' }}>
        <ListItem alignItems="flex-start" className={s.list_item}>
          <ListItemIcon>
            <Avatar className={s.avatar} src={profile?.account.image} />
          </ListItemIcon>
          <ListItemText
            primary={
              <div className={s.primary}>
                <Typography variant="h5" fontWeight="600" className={s.name}>
                  {profile?.account.fullName}
                </Typography>
              </div>
            }
            secondary={
              <Stack className={s.secondary}>
                <div className={s.detail}>
                  <div className={s.detail_item}>
                    <Place fontSize="small" />
                    <Typography variant="body2">{profile.location}</Typography>
                  </div>
                  -
                  <div className={s.detail_item}>
                    <MonetizationOn fontSize="small" />
                    <Typography variant="body2">
                      {profile.salaryExpectation?.toLocaleString()}
                      /mo
                    </Typography>
                  </div>
                  -
                  <div className={s.detail_item}>
                    <BusinessCenter fontSize="small" />
                    <Typography variant="body2">
                      {profile.jobPosition}
                    </Typography>
                  </div>
                  -
                  <div className={s.detail_item}>
                    <BusinessCenter fontSize="small" />
                    <Typography variant="body2">
                      {profile.skillLevel || '-'}
                    </Typography>
                  </div>
                  -
                  <div className={s.detail_item}>
                    <Language fontSize="small" />
                    <Typography variant="body2">
                      {capitalize(profile.englishLevel ?? '-')}
                    </Typography>
                  </div>
                </div>
              </Stack>
            }
          />
        </ListItem>

        <Stack sx={{ p: '3.5rem 0' }} gap="1rem">
          <Alert severity="info">
            <Typography variant="body2">
              You are about to send an interview request to{' '}
              <Typography variant="body2" fontWeight="600" component="span">
                {profile?.account.fullName}
              </Typography>
              . Please review your message before sending.
            </Typography>
          </Alert>

          <Stack gap="1.5rem">
            <Stack>
              <FormLabel>Response Deadline (optional)</FormLabel>
              <DateTimePicker
                label="Deadline"
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </Stack>

            <TextField
              autoFocus
              id="name"
              label="Message"
              type="text"
              helperText="Customize your message to include anything specific you would like the candidate to know"
              variant="outlined"
              fullWidth
              multiline
              value={interviewMessage}
              onChange={(e) => {
                setInterviewMessage(e.target.value);
              }}
              required
            />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          p: '1.5rem',
        }}
      >
        <Button variant="outlined" onClick={handleClose} color="error">
          Cancel
        </Button>

        <LoadingButton
          loading={
            appPopupsState.isLoading || sendInterviewRequestRespond.loading
          }
          variant="contained"
          startIcon={<Send />}
          size="large"
          type="submit"
          onClick={() => {
            if (!interviewMessage) {
              toast.error('Please enter your message');
              return;
            }

            onSendInterview();
          }}
        >
          Send Interview Request
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default SendInterviewPopup;
