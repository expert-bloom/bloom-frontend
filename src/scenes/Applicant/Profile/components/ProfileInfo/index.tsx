/* eslint-disable @typescript-eslint/no-misused-promises,@typescript-eslint/restrict-template-expressions */
import React, { useEffect, useRef } from 'react';

import {
  Autocomplete,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import { isEqual } from 'lodash';
import { FilePond } from 'react-filepond';
import { toast } from 'react-hot-toast';
import Z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { EnglishLevel } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { Editor } from '@/lib/filePong';
import { usePresignedUpload } from '@/lib/uploader';
import { useProfileSettingFormContext } from '@/scenes/Applicant/Profile';
import {
  type NestedOnSubmit,
  type StepProps,
} from '@/scenes/Applicant/Profile/data';
import { skillOption } from '@/scenes/CreateJobPost/JobRequirement';
import { capitalize } from '@/utils';

import s from './profileinfo.module.scss';

interface Pro {
  image: string | undefined | null;
  about: string | undefined;
  jobPosition: string | undefined;
  salaryExpectation: string | undefined;
  workExperience: any;
  experience: any;
  skillLevel: any;
  englishLevel: any;
  accomplishment: any;
  skill: any;
}

const schema = toFormikValidationSchema(
  Z.object({
    image: Z.string().url('Invalid Image url URL'),
  }),
);

const ProfileInfo = ({ stepUtil }: StepProps) => {
  const { uploadToS3 } = usePresignedUpload();
  const { formik } = useProfileSettingFormContext();
  const { values, handleChange } = formik;
  const filePond = useRef<FilePond>(null);

  const me = useMe();

  const onSubmit: NestedOnSubmit = async (values, formikHelpers) => {
    if (!filePond.current) return null;
    // check if the default is changed
    const pond = filePond.current;
    let loadingToast = '';

    if (!filePond.current.getFile()) {
      toast.error('profile pic is required');
      return null;
    }

    console.log('on upload ----------- ', filePond.current.getFile(), values);

    try {
      // formikHelpers.setSubmitting(true);
      if (
        typeof values.account.image === 'string' &&
        values.account.image === filePond.current.getFile().source
      ) {
        return values;
      }

      let url = {
        serverId: filePond.current.getFile()?.serverId,
      };

      if (!url.serverId && pond.getFile().source instanceof File) {
        // upload thumbnail to s3
        loadingToast = toast.loading('uploading profile pic');
        url = await filePond.current.processFile();
      }

      console.log('uploaded URL :', url.serverId);

      await formik.setFieldValue('account.image', url.serverId);
      toast.dismiss(loadingToast);
      return {
        ...values,
        account: {
          ...values.account,
          image: url.serverId,
        },
      };
    } catch (err: any) {
      console.log(' err : ', err);
      toast.dismiss(loadingToast);

      if (err?.error?.body === 'Item not found') {
        console.log('filepond err : ', err);
        toast.error('Thumbnail is required');
        return null;
      }

      toast.error(err?.message ?? 'Error uploading profile picture.');
      return null;
    }
  };

  useEffect(() => {
    stepUtil.current = {
      onSubmit,
    };

    return () => {
      stepUtil.current = {
        onSubmit: async (values) => values,
      };
    };
  }, []);

  useEffect(() => {
    // if (me.me?.applicant === null || me.me?.applicant === undefined) return;
    if (!me.me?.image) return;

    if (me.me?.image !== filePond.current.getFile()?.source) {
      console.log('image values ', me.me?.image);

      void filePond.current?.addFile(me.me?.image);
    }
  }, [me.me?.image]);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Stack alignItems="center" gap="2rem">
          <fieldset className={s.wrap}>
            <legend>
              <Typography variant="h6">Profile</Typography>
            </legend>

            <Stack alignItems="center" sx={{ mb: '2rem' }}>
              <div className={s.pp}>
                <div className={clsx([s.profile_pic, 'pp'])}>
                  <FilePond
                    ref={filePond}
                    labelIdle={
                      'Drag & Drop your Profile Pic or <span class="filepond--label-action">Browse</span>'
                    }
                    name="files"
                    allowImageEdit
                    imageEditEditor={Editor}
                    acceptedFileTypes={[
                      'image/png',
                      'image/jpeg',
                      '.jpg',
                      '.png',
                      '.svg',
                    ]}
                    allowFileSizeValidation
                    maxFileSize={'5MB'}
                    labelMaxFileSize="Maximum file size is 5MB"
                    imagePreviewHeight={170}
                    imageResizeTargetWidth={200}
                    imageResizeTargetHeight={200}
                    imageCropAspectRatio="1:1"
                    instantUpload={false}
                    allowImageExifOrientation={true}
                    stylePanelLayout="compact circle"
                    styleImageEditButtonEditItemPosition="center bottom"
                    styleLoadIndicatorPosition="center bottom"
                    styleProgressIndicatorPosition="right bottom"
                    styleButtonRemoveItemPosition="left bottom"
                    styleButtonProcessItemPosition="right bottom"
                    allowProcess={false}
                    imageEditAllowEdit={
                      values.account.image !==
                      filePond.current?.getFile()?.source
                    }
                    credits={false}
                    onerror={(err: any, file, status) => {
                      toast.error(
                        `${err.main ?? 'error on image'} - ${err.sub ?? ''}`,
                      );
                    }}
                    onremovefile={async (error, file) => {
                      if (error) {
                        return toast.error(
                          `Error removing thumbnail. ${error?.body ?? ''}`,
                        );
                      }
                      // await formik.setFieldValue('image', '');
                    }}
                    onaddfile={(error, file) => {
                      console.log('onAddFile :> ', file);
                      if (error) {
                        console.log('onAdd file error : ', error);
                        return;
                      }

                      if (file?.file) {
                        void formik.setFieldValue('account.image', file.source);
                      }
                    }}
                    server={{
                      fetch: (url, load, error, progress, abort, headers) => {
                        console.log(
                          'fetch url ----------: ',
                          url,
                          process.env.NEXT_PUBLIC_URL,
                        );

                        fetch(
                          `${process.env.NEXT_PUBLIC_URL}/api/image?url=${url}`,
                        )
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
                      },

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
                          const { url, key, bucket } = await uploadToS3(
                            file as File,
                            {
                              progress,
                              endpoint: {
                                request: {
                                  body: {
                                    filePath: 'bloom',
                                  },
                                },
                              },
                            },
                          );

                          console.log('key  --------  : ', key, url);
                          await formik.setFieldValue('account.image', url);
                          load(url);
                        } catch (err: any) {
                          abort();
                          console.log('err; ', err);
                          toast.error(
                            'Error uploading thumbnail. Please try again.',
                          );
                        }

                        return {
                          abort: () => {
                            console.log('upload aborting...');
                            abort();
                          },
                        };
                      },
                    }}

                    // stylePanelLayout={'compact'}
                    // allowVideoPreview={true}
                  />
                </div>
              </div>
            </Stack>

            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>About</FormLabel>
              <TextField
                name="applicant.about"
                fullWidth
                multiline
                rows={2}
                onChange={handleChange}
                value={values.applicant.about}
                error={Boolean(formik.errors.applicant?.about)}
                helperText={formik.errors.applicant?.about as string}
              />
            </Stack>

            <Stack>
              <FormLabel>Job Position</FormLabel>
              <TextField
                name="applicant.jobPosition"
                // disabled

                fullWidth
                onChange={handleChange}
                value={values.applicant.jobPosition}
                error={Boolean(formik.errors.applicant?.jobPosition)}
                helperText={formik.errors.applicant?.jobPosition as string}
              />
            </Stack>

            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>Salary Expectation</FormLabel>
              <TextField
                name="applicant.salaryExpectation"
                type="number"
                fullWidth
                onChange={handleChange}
                value={values.applicant.salaryExpectation}
                error={Boolean(formik.errors.applicant?.salaryExpectation)}
                helperText={formik.errors.applicant?.salaryExpectation}
              />
            </Stack>

            <Stack className={s.slider}>
              <Typography color="gray" variant="body2">
                Work Experience
              </Typography>
              <Stack sx={{ width: '100%' }}>
                <Slider
                  valueLabelDisplay="auto"
                  defaultValue={0}
                  step={1}
                  min={0}
                  max={10}
                  name="applicant.experienceYear"
                  marks={true}
                  value={values.applicant.experienceYear}
                  onChange={(e, value) => {
                    void formik.setFieldValue(
                      'applicant.experienceYear',
                      value,
                    );
                  }}
                />
                <Typography className={s.slider_label}>
                  {values.applicant.experienceYear === 0
                    ? 'No Experience'
                    : values.applicant.experienceYear === 10
                    ? '10+ '
                    : `${values.applicant.experienceYear} `}{' '}
                  Years
                </Typography>
              </Stack>
            </Stack>

            <FormControl>
              <FormLabel htmlFor="skills">Skills</FormLabel>
              <Autocomplete
                id="applicant.skills"
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
                value={values.applicant.skills.map((s) => ({ label: s }))}
                onChange={(event, newValue) => {
                  console.log('newValue', newValue);
                  void formik.setFieldValue(
                    'applicant.skills',
                    newValue.map((S) => S.label),
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // disabled
                    name="skills"
                    // label="Search industry"
                    // placeholder="type ..."
                    fullWidth
                  />
                )}
              />
            </FormControl>

            <Stack gap={0.5} flex="1">
              <FormLabel htmlFor="eng-level">
                Level of English fluency
              </FormLabel>

              <Select
                id="eng-level"
                name="applicant.englishLevel"
                onChange={handleChange}
                value={values.applicant.englishLevel}
              >
                {Object.values(EnglishLevel).map((value, idx) => (
                  <MenuItem value={value} key={idx}>
                    {capitalize(value.toLowerCase()).replace('_', '-')}
                  </MenuItem>
                ))}
              </Select>
            </Stack>

            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>Accomplishment</FormLabel>
              <TextField
                name="applicant.accomplishment"
                fullWidth
                // label="Job Description"
                multiline
                rows={4}
                onChange={handleChange}
                value={values.applicant.accomplishment}
                // error={Boolean(formik.errors.accomplishment)}
                // helperText={formik.errors.accomplishment as string}
              />
            </Stack>
          </fieldset>
        </Stack>
      </div>
    </div>
  );
};

export default ProfileInfo;
