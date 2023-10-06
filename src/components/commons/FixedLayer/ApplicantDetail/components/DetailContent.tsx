/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React from 'react';

import {
  BusinessCenter,
  CalendarMonth,
  ExpandMore,
  Language,
  MonetizationOn,
  Place,
  QuestionAnswer,
  Send,
  StarOutlineTwoTone,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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
import moment from 'moment/moment';
import { toast } from 'react-hot-toast';
import YouTube from 'react-youtube';
import SimpleBar from 'simplebar-react';

import Loader from '@/components/Loader';
import { MotionChild } from '@/components/MotionItems';
import 'simplebar-react/dist/simplebar.min.css';
import {
  type Applicant,
  type Application,
  useGetCompanyJobApplicationsQuery,
} from '@/graphql/client/gql/schema';
import FilePond from '@/lib/filePong';
import { useAppStore } from '@/lib/store';

import s from '../applican_detail.module.scss';

const transition = {
  duration: 1,
  ease: [0.6, 0.01, 0, 0.9],
};

interface Props {
  isLoading: boolean;
  profile?: Applicant;
  application?: Application;
}

export const useGetApplication = (jobPostId: string, applicationId: string) => {
  // const { applicantDetail, selectedJobPostId } = useAppStore();
  const jobApplicationsResponse = useGetCompanyJobApplicationsQuery({
    skip: !jobPostId,
    variables: {
      input: {
        filter: {
          jobPostId,
        },
      },
    },
  });
  const {
    data: applicationsPayload,
    loading: isLoading,
    error,
  } = jobApplicationsResponse;

  if (!applicationsPayload?.getJobApplications) {
    // toast.error('No job post found with the selected id');
    return { application: null, isLoading, error };
  }

  const application = applicationsPayload.getJobApplications.edges.find(
    (ja) => ja.node.id === applicationId,
  )?.node;

  return { application: application ?? null, isLoading, error };
};

const DetailContent = () => {
  const { applicantDetail, selectedJobPostId, setInterviewPopup } =
    useAppStore();

  const { application, isLoading, error } = useGetApplication(
    selectedJobPostId as string,
    applicantDetail.selectedApplicationId as string,
  );

  const profile = application?.applicant;

  const onReady = (event: any) => {
    // Access the player instance
    const player = event.target;
  };

  const onError = (error: any) => {
    console.error('YouTube Player Error:', error);
    toast.error('Error loading Intro video');
  };

  const downloadCv = (url: string) => {
    const element: HTMLAnchorElement = document.createElement('a');

    element.href = url;
    element.download = 'one.csv';
    element.target = '_blank';
    element.click();
  };

  if (!application) {
    toast.error('No application found with the selected id');
    return null;
  }

  return (
    <>
      <SimpleBar style={{ maxHeight: '100vh' }}>
        <MotionChild className={s.content} transition={transition}>
          {isLoading && (
            <MotionChild className={s.loading_spinner}>
              <Loader />
            </MotionChild>
          )}

          {!isLoading && profile && (
            <div className={s.profile}>
              <ListItem alignItems="flex-start" className={s.list_item}>
                <ListItemIcon>
                  <Avatar className={s.avatar} src={profile?.account.image} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div className={s.primary}>
                      <Typography
                        variant="h3"
                        fontWeight="600"
                        className={s.name}
                      >
                        {profile?.account.fullName}
                      </Typography>

                      <Stack direction="row" gap=".5rem">
                        <BusinessCenter fontSize="small" />
                        <Typography variant="body2">
                          {profile.jobPosition}
                        </Typography>
                      </Stack>
                    </div>
                  }
                  secondary={
                    <Stack className={s.secondary}>
                      <div className={s.detail}>
                        <div className={s.detail_item}>
                          <Place fontSize="small" />
                          <Typography variant="body2">
                            {profile.location}
                          </Typography>
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

                      <div className={s.skills}>
                        {profile?.skills?.slice(0, 5).map((skill, idx) => (
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

                      <div className={s.actions}>
                        <Button
                          variant="contained"
                          disabled={!!application?.interview}
                          startIcon={<QuestionAnswer />}
                          onClick={() => {
                            if (application?.interview) {
                              toast.error('Interview already scheduled');
                              return;
                            }

                            setInterviewPopup({ open: true, isLoading: false });
                          }}
                        >
                          Interview
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<StarOutlineTwoTone />}
                        >
                          Send Offer
                        </Button>
                      </div>
                    </Stack>
                  }
                />
              </ListItem>

              <Divider />

              <div className={s.about}>
                <Typography variant="h5" gutterBottom>
                  Intro Video
                </Typography>

                {profile.introVideo && (
                  <YouTube
                    videoId={profile.introVideo}
                    style={{ width: '100%' }}
                    className={s.vid}
                    iframeClassName="intro_vid_iframe"
                    onReady={onReady}
                    onError={onError}
                  />
                )}
              </div>

              <Divider />

              <div className={s.cv}>
                <Typography variant="h5" gutterBottom>
                  Resume
                </Typography>

                <div className={s.file_pond_wrap}>
                  <FilePond
                    name="resume-file"
                    allowFileSizeValidation
                    maxFileSize="10MB"
                    labelMaxFileSizeExceeded={'File is too large'}
                    // checkValidity

                    allowFileMetadata
                    allowFilePoster
                    files={[
                      profile.resume ??
                        `${process.env.NEXT_PUBLIC_S3_CLOUD_FRONT_URL}/next-s3-uploads/bloom/Resume-20(1)-compressed.pdf`,
                    ]}
                    allowReplace={false}
                    allowBrowse={false}
                    // forceRevert
                    allowRevert={false}
                    // disabled
                    allowMultiple={false}
                    instantUpload={false}
                    credits={false}
                    allowProcess={false}
                    iconRemove={'cv'}
                    beforeRemoveFile={() => {
                      downloadCv(
                        profile.resume ??
                          `${process.env.NEXT_PUBLIC_S3_CLOUD_FRONT_URL}/next-s3-uploads/bloom/Resume-20(1)-compressed.pdf`,
                      );
                      return false;
                    }}
                    onactivatefile={(file) => {
                      downloadCv(
                        profile.resume ??
                          `${process.env.NEXT_PUBLIC_S3_CLOUD_FRONT_URL}/next-s3-uploads/bloom/Resume-20(1)-compressed.pdf`,
                      );
                    }}
                    // disabled={disabled}

                    onerror={(err) => {
                      console.log('Error cv resume: ', err);
                    }}
                  />
                </div>
              </div>

              <Divider />

              <div className={s.about}>
                <Typography variant="h5" gutterBottom>
                  About
                </Typography>

                <Typography className={s.txt}>{profile?.about}</Typography>
              </div>

              <Divider />

              <div className={s.about}>
                <Typography variant="h5" gutterBottom>
                  Cover Letter
                </Typography>

                <Typography className={s.txt}>
                  {application.coverLetter}
                </Typography>
              </div>

              <Divider />

              <div className={s.experience}>
                <Typography variant="h5" gutterBottom>
                  Experiences
                </Typography>

                {profile?.workExperience.map((ex, idx) => (
                  <Accordion key={idx}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{
                        borderBottom: '1px solid #e0e0e0',
                      }}
                    >
                      <Stack>
                        <Typography variant="h6" color="gray">
                          {ex.position}
                        </Typography>
                        <FormLabel>{ex.companyName}</FormLabel>
                      </Stack>

                      <Stack
                        direction="row"
                        alignItems="center"
                        gap=".3rem"
                        marginLeft="auto"
                        marginRight="1.5rem"
                      >
                        <CalendarMonth fontSize="small" color="disabled" />
                        <Typography color="gray" variant="subtitle2">
                          {moment(ex.startDate).format('MMM YYYY')} -{' '}
                          {ex.ongoing
                            ? 'Present'
                            : moment(ex.endDate).format('MMM YYYY')}
                        </Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack gap=".5rem" flex="1" style={{ width: '100%' }}>
                        <div>
                          <FormLabel>Skills</FormLabel>
                          <Stack
                            direction="row"
                            alignItems="center"
                            gap=".3rem"
                          >
                            {ex.skills.map((s, i) => (
                              <Chip
                                key={s}
                                label={s}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Stack>
                        </div>

                        <div className={s.experience_item_header}>
                          <FormLabel>Company website</FormLabel>

                          <Typography variant="body2">
                            {ex.companyWebsite || '-'}
                          </Typography>
                        </div>

                        <div className={s.experience_item_body}>
                          <FormLabel>Accomplishments and awards</FormLabel>

                          <Typography variant="body2">
                            {ex.accomplishment || '-'}
                          </Typography>
                        </div>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </div>
          )}
        </MotionChild>
      </SimpleBar>
    </>
  );
};

export default DetailContent;
