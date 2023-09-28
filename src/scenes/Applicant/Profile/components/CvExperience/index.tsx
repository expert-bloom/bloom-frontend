/* eslint-disable @typescript-eslint/no-misused-promises,@typescript-eslint/prefer-nullish-coalescing,@typescript-eslint/restrict-template-expressions */
import React, { useEffect, useRef } from 'react';

import {
  AddCircle,
  CalendarMonth,
  DateRangeSharp,
  ExpandMore,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import moment from 'moment';
import { toast } from 'react-hot-toast';

import useMe from '@/hooks/useMe';
import FilePond from '@/lib/filePong';
import { usePresignedUpload } from '@/lib/uploader';
import { useProfileSettingFormContext } from '@/scenes/Applicant/Profile';
import {
  type NestedOnSubmit,
  type StepProps,
  type WorkExperienceFormValuesType,
} from '@/scenes/Applicant/Profile/data';
import { skillOption } from '@/scenes/Company/CreateJobPost/JobRequirement';

import s from './cv.module.scss';

const initialExperience: WorkExperienceFormValuesType = {
  companyName: '' as string,
  position: '' as string,
  companyWebsite: '' as string,
  ongoing: false as boolean,
  startDate: null as unknown as string,
  endDate: null as unknown as string,
  accomplishment: '' as string,
  skills: [] as string[],
};

const ProfileInfo = ({ stepUtil }: StepProps) => {
  const { formik } = useProfileSettingFormContext();
  const filePond = useRef<FilePond>(null);
  const me = useMe();
  const { uploadToS3 } = usePresignedUpload();

  const onSubmit: NestedOnSubmit = async (values, formikHelpers) => {
    if (!filePond.current) return null;
    // check if the default is changed
    const pond = filePond.current;
    let loadingToast = '';

    if (!filePond.current.getFile()) {
      // toast.error('Resume file is required');
      return values;
    }

    console.log('nested submit : ', values, filePond.current.getFile());

    try {
      // formikHelpers.setSubmitting(true);
      if (
        typeof values.applicant.resume === 'string' &&
        values.applicant.resume === filePond.current.getFile().source
      ) {
        return values;
      }

      let url = {
        serverId: filePond.current.getFile()?.serverId,
      };

      if (!url.serverId && pond.getFile().source instanceof File) {
        // upload thumbnail to s3
        loadingToast = toast.loading('uploading resume ... ');

        url = await filePond.current.processFile();
      }

      console.log('url : ', url);

      await formik.setFieldValue('applicant.resume', url.serverId);
      toast.dismiss(loadingToast);
      return {
        ...values,
        applicant: {
          ...values.applicant,
          resume: url.serverId,
        },
      };
    } catch (err: any) {
      console.log(' err : ', err);
      toast.dismiss(loadingToast);

      if (err?.error?.body === 'Item not found') {
        console.log('filepond err : ', err);
        toast.error('Resume file is required');
        return null;
      }

      toast.error(err?.message ?? 'Error uploading resume.');
      return null;
    }
  };

  useEffect(() => {
    stepUtil.current = {
      onSubmit,
    };

    return () => {
      stepUtil.current = {
        onSubmit: async (value) => value,
      };
    };
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    experienceForm.resetForm();
    setOpen(false);
  };

  const experienceForm = useFormik({
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: initialExperience, // validationSchema: currentStep?.schema,
    onSubmit: async (values, helpers) => {
      void formik.setFieldValue('applicant.workExperience', [
        ...formik.values.applicant.workExperience,
        values,
      ]);
      experienceForm.resetForm();
      setOpen(false);
    },
  });

  // console.log('experienceForm : ', me.me?.applicant);

  useEffect(() => {
    if (!filePond.current) return;

    if (
      me.me?.applicant?.resume &&
      me.me?.applicant?.resume !== filePond.current.getFile()?.source
    ) {
      console.log('image values ', me.me?.image);

      void filePond.current?.addFile(me.me?.applicant?.resume ?? '');
    }
  }, [me.me?.applicant?.resume]);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <fieldset className={s.wrap}>
          <legend>CV</legend>
          <div className={s.file_pond_wrap}>
            <FilePond
              name="resume-file"
              ref={filePond}
              allowFileSizeValidation
              maxFileSize="10MB"
              labelMaxFileSizeExceeded={'File is too large'}
              // checkValidity
              allowFileMetadata
              allowFilePoster
              allowReplace
              // forceRevert
              allowRevert
              allowMultiple={false}
              instantUpload={false}
              credits={false}
              allowProcess={false}
              // disabled={disabled}
              labelIdle={
                'Drag & Drop your CV (Resume) or <b class="filepond--label-action">Browse</b>'
              }
              onaddfile={(error, file) => {
                console.log('onAddFile :> ', file, error);
                if (error) {
                  toast.error('Error adding resume file');
                  return;
                }

                if (file?.file && error === null) {
                  void formik.setFieldValue('applicant.resume', file.source);
                }
              }}
              onerror={(err: any, file, status) => {
                console.log('Error cv resume: ', err);
                toast.error(
                  `${status.main ?? err?.main ?? 'Error loading image'} - ${
                    status.sub ?? err?.sub ?? ''
                  }`,
                );
              }}
              onremovefile={async (err, file) => {
                console.log('file-pond -remove: ', err, file);

                if (err) {
                  return toast.error(
                    `Error removing thumbnail. ${err?.body ?? ''}`,
                  );
                }

                void formik.setFieldValue(
                  'applicant.resume',
                  formik.initialValues.applicant.resume
                    ? null
                    : formik.initialValues.applicant.resume,
                );
              }}
              onprocessfile={(err, file) => {
                console.log('file-pond -process: ', err, file);
              }}
              server={{
                /* fetch: async (url, load, error, progress, abort, headers) => {
                 console.log('fetch url: --- ', url);

                 fetch(url)
                   .then(async (response) => {
                     const blob = await response.blob();
                     const file = new File([blob], 'fileName', {
                       type: blob.type,
                     });

                     load(file);
                   })
                   .catch((err) => {
                     console.log('image fetch error : ', err);
                   });
               }, */
                process: async (
                  fieldName,
                  file,
                  metadata,
                  load,
                  error,
                  progress,
                  abort,
                ) => {
                  try {
                    // progress(true, 0, 1000);
                    // console.log('process started...', files[0]);

                    const { url, key, bucket } = await uploadToS3(
                      file as File,
                      {
                        progress,
                        endpoint: {
                          request: {
                            body: {
                              // filePath: 'bloom/cv/',
                              filePath: 'bloom',
                            },
                          },
                        },
                      },
                    );

                    console.log('key  --------  : ', key, url);

                    load(url);
                    void formik.setFieldValue('applicant.resume', url);

                    return;
                  } catch (err: any) {
                    abort();
                    error('Error uploading CV. Please try again.');
                    console.log('err; ', err, fieldName);
                    toast.error('Error uploading CV. Please try again.', {
                      duration: 10000,
                    });
                    throw err;
                  }
                },
              }}
            />
          </div>
        </fieldset>

        <Stack>
          <fieldset className={s.wrap}>
            <legend>Experience</legend>
            <Stack
              spacing={0.5}
              flex="1"
              style={{ width: '100%' }}
              className={s.experience}
            >
              {formik.values.applicant.workExperience.length === 0 ? (
                <div className={s.guide}>
                  <FormLabel>Previous Work Experience</FormLabel>

                  <Typography>
                    Adding previous work experience will help you stand out.
                  </Typography>
                </div>
              ) : (
                formik.values.applicant.workExperience.map((ex, i) => (
                  <div key={i} className={s.experience_item}>
                    <Accordion>
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
                          <Typography color="gray">
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
                                  key={i}
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
                  </div>
                ))
              )}

              <Button
                className={s.add_btn}
                startIcon={<AddCircle />}
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add Experience
              </Button>
            </Stack>
          </fieldset>
        </Stack>

        <Dialog
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
          className={s.ex_dialog}
        >
          <DialogTitle>
            <Typography className={s.title} variant="h5">
              Add Your Experiences
            </Typography>
          </DialogTitle>
          <form onSubmit={experienceForm.handleSubmit}>
            <DialogContent>
              <div className={s.ex_form}>
                <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
                  <FormLabel>Job Position</FormLabel>
                  <TextField
                    name="position"
                    fullWidth
                    required
                    onChange={experienceForm.handleChange}
                    value={experienceForm.values.position}
                    error={Boolean(experienceForm.errors.position)}
                    // helperText={formik.errors.applicant?.about as string}
                  />
                </Stack>

                <Stack
                  direction="row"
                  gap=".5rem"
                  flex="1"
                  style={{ width: '100%' }}
                >
                  <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
                    <FormLabel>Company Name</FormLabel>
                    <TextField
                      name="companyName"
                      fullWidth
                      required
                      onChange={experienceForm.handleChange}
                      value={experienceForm.values.companyName}
                      error={Boolean(experienceForm.errors.companyName)}
                      // helperText={formik.errors.applicant?.about as string}
                    />
                  </Stack>

                  <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
                    <FormLabel>Company Website</FormLabel>
                    <TextField
                      name="companyWebsite"
                      fullWidth
                      onChange={experienceForm.handleChange}
                      value={experienceForm.values.companyWebsite}
                      error={Boolean(experienceForm.errors.companyWebsite)}
                      // helperText={formik.errors.applicant?.about as string}
                    />
                  </Stack>
                </Stack>

                <FormControl>
                  <FormLabel htmlFor="skills">
                    What skills did you use in this job?
                  </FormLabel>
                  <Autocomplete
                    id="skills"
                    disablePortal
                    // readOnly
                    fullWidth
                    limitTags={10}
                    multiple
                    disableCloseOnSelect
                    options={skillOption}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) =>
                      option.label === value.label
                    }
                    value={experienceForm.values.skills.map((s) => ({
                      label: s,
                    }))}
                    onChange={(event, newValue) => {
                      console.log('newValue', newValue);
                      void experienceForm.setFieldValue(
                        'skills',
                        newValue.map((S) => S.label),
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // disabled
                        // label="Search industry"
                        // placeholder="type ..."
                        fullWidth
                      />
                    )}
                  />
                </FormControl>

                <Stack
                  direction="row"
                  gap=".5rem"
                  flex="1"
                  style={{ width: '100%' }}
                >
                  <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
                    <FormLabel>Start Date</FormLabel>

                    <DatePicker
                      label="Start Date"
                      value={experienceForm.values.startDate}
                      onChange={(newValue) => {
                        void experienceForm.setFieldValue(
                          'startDate',
                          newValue,
                        );
                      }}
                      slotProps={{
                        textField: {
                          required: true,
                        },
                      }}
                    />
                  </Stack>
                  <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
                    <Stack direction="row" alignItems="center" gap="1.5rem">
                      <FormLabel>End Date</FormLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{ p: 0, pr: '.2rem' }}
                            size="small"
                            checked={experienceForm.values.ongoing}
                            onChange={(e) => {
                              void experienceForm.setFieldValue(
                                'ongoing',
                                e.target.checked,
                              );
                            }}
                            name="ongoing"
                            color="primary"
                          />
                        }
                        label="Ongoing"
                      />
                    </Stack>
                    <DatePicker
                      disabled={
                        experienceForm.values.ongoing ||
                        !experienceForm.values.startDate
                      }
                      label="End Date"
                      minDate={experienceForm.values.startDate}
                      value={experienceForm.values.endDate}
                      onChange={(newValue) => {
                        void experienceForm.setFieldValue('endDate', newValue);
                      }}
                      slotProps={{
                        textField: {
                          required: true,
                        },
                      }}
                    />
                  </Stack>
                </Stack>

                <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
                  <FormLabel>
                    List any accomplishments or awards that you&apos;ve achieved
                    at this position. (Optional)
                  </FormLabel>
                  <TextField
                    name="accomplishment"
                    placeholder="My accomplishments were ..."
                    fullWidth
                    multiline
                    rows={4}
                    onChange={experienceForm.handleChange}
                    value={experienceForm.values.accomplishment}
                    error={Boolean(experienceForm.errors.accomplishment)}
                    // helperText={formik.errors.applicant?.about as string}
                  />
                </Stack>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfileInfo;
