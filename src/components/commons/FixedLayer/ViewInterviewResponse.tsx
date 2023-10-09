/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React, { useEffect } from 'react';

import {
  BusinessCenter,
  CancelTwoTone,
  Language,
  MonetizationOn,
  Place,
  StarOutlineTwoTone,
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
  Typography,
} from '@mui/material';
import { capitalize } from 'lodash';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { FiExternalLink } from 'react-icons/fi';
import YouTube from 'react-youtube';

import s from '@/components/commons/FixedLayer/ApplicantDetail/applican_detail.module.scss';
import { useGetApplication } from '@/components/commons/FixedLayer/ApplicantDetail/components/DetailContent';
import Loader from '@/components/Loader';
import { useAppStore } from '@/lib/store';
import { getYoutubeIdFromURL } from '@/utils';

const ViewInterviewResponsePopup = () => {
  const [isVideoReady, setIsVideoReady] = React.useState(false);
  const { selectedJobPostId, appPopupsState, setAppPopupsState } =
    useAppStore();

  const { application, isLoading, error } = useGetApplication(
    selectedJobPostId as string,
    appPopupsState.selectedApplicationId as string,
  );

  const profile = application?.applicant;

  if (!profile) return null;

  const handleClose = () => {
    if (appPopupsState.isLoading) {
      toast.error('Please wait until the request is sent');
      return;
    }
    setAppPopupsState({
      showViewInterviewPopup: false,
      showSendInterviewPopup: false,
    });
  };

  return (
    <Dialog
      open={
        appPopupsState.showViewInterviewPopup &&
        !!appPopupsState.selectedApplicationId
      }
      onClose={handleClose}
      scroll="paper"
      className={s.interview_dialog}
      keepMounted={false}
    >
      <DialogTitle sx={{ p: '1.5rem 1rem' }}>
        Applicant Interview Response
      </DialogTitle>

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

        <Stack sx={{ p: '3rem 0' }}>
          <Stack gap=".2rem">
            <FormLabel>Interview Video Response</FormLabel>
            <Link
              href={application?.interview?.answerVideo ?? ''}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              <Button endIcon={<FiExternalLink />}>
                {application?.interview?.answerVideo}
              </Button>
            </Link>
          </Stack>

          <div className={s.vid_wrapper}>
            {!isVideoReady && (
              <div className={s.loader}>
                <Loader />
              </div>
            )}

            <YouTube
              // videoId={application?.interview?.answerVideo ?? ''}
              videoId={getYoutubeIdFromURL(
                application?.interview?.answerVideo ?? '',
              )}
              onReady={(event) => {
                setIsVideoReady(true);
              }}
              style={{ width: '100%' }}
              className={s.vid}
              iframeClassName="intro_vid_iframe"
              // onReady={onReady}
              onError={(event) => {
                toast.error('Error loading video');
              }}
            />
          </div>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          p: '1.5rem',
        }}
      >
        <Button
          variant="text"
          onClick={handleClose}
          color="error"
          sx={{
            mr: 'auto',
          }}
        >
          Cancel
        </Button>

        {application?.offer?.status === 'PENDING' && (
          <Alert severity="info" sx={{ maxWidth: '25rem' }}>
            <Typography variant="body2">
              You have already sent an offer to this applicant. Please wait for
              the applicant&apos;s response.
            </Typography>
          </Alert>
        )}

        {application?.offer === null && (
          <>
            <LoadingButton
              loading={appPopupsState.isLoading}
              color="error"
              variant="outlined"
              startIcon={<CancelTwoTone />}
              size="large"
              type="submit"
              onClick={() => {
                return null;
              }}
            >
              Decline Applicant
            </LoadingButton>

            <LoadingButton
              loading={appPopupsState.isLoading}
              variant="contained"
              startIcon={<StarOutlineTwoTone />}
              size="large"
              type="submit"
              onClick={() => {
                setAppPopupsState({
                  showSendOfferPopup: true,
                });
              }}
            >
              Send An Offer
            </LoadingButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ViewInterviewResponsePopup;
