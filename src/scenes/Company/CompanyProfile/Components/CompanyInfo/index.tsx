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
import { FilePond } from 'react-filepond';
import { toast } from 'react-hot-toast';
import Z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { EnglishLevel } from '@/graphql/client/gql/schema';
import useMe from '@/hooks/useMe';
import { Editor } from '@/lib/filePong';
import { usePresignedUpload } from '@/lib/uploader';
import {
  type NestedOnSubmit,
  type StepProps,
} from '@/scenes/Applicant/Profile/data';
import { useCompanyProfileSettingFormContext } from '@/scenes/Company/CompanyProfile';
import { skillOption } from '@/scenes/Company/CreateJobPost/JobRequirement';
import { capitalize } from '@/utils';

import s from './profileinfo.module.scss';

const schema = toFormikValidationSchema(
  Z.object({
    image: Z.string().url('Invalid Image url URL'),
  }),
);

const ProfileInfo = ({ stepUtil }: StepProps) => {
  const { uploadToS3 } = usePresignedUpload();
  const { formik } = useCompanyProfileSettingFormContext();
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
    if (!me.me?.image || !filePond.current) return;

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
              <Typography variant="h6">Company Info</Typography>
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
                      console.log('error : ', err, status);

                      toast.error(
                        `${
                          status.main ?? err?.main ?? 'Error loading image'
                        } - ${status.sub ?? err?.sub ?? ''}`,
                      );
                    }}
                    onremovefile={async (error, file) => {
                      if (error) {
                        return toast.error(
                          `Error removing thumbnail. ${error?.body ?? ''}`,
                        );
                      }

                      void formik.setFieldValue(
                        'account.image',
                        formik.initialValues.account.image,
                      );

                      // await formik.setFieldValue('image', '');
                    }}
                    onaddfile={(error, file) => {
                      console.log('onAddFile :> ', file, error);
                      if (error) {
                        console.log('onAdd file error : ', error);
                        return;
                      }

                      if (file?.file && error === null) {
                        void formik.setFieldValue('account.image', file.source);
                        console.log(
                          'onAddFile :> ',
                          formik.values.account.image,
                        );
                      }
                    }}
                    server={{
                      fetch: (url, load, error, progress, abort, headers) => {
                        try {
                          fetch(
                            `${process.env.NEXT_PUBLIC_URL}/api/image?url=${url}`,
                          )
                            .then(async (response) => {
                              if (!response.ok) {
                                error('Failed to load profile pic');
                                // abort();
                                return;
                              }

                              const blob = await response.blob();
                              const file = new File([blob], 'fileName', {
                                type: blob.type,
                              });

                              load(file);
                            })
                            .catch((err) => {
                              console.log('image fetch error : ', err);
                            });
                        } catch (err) {
                          console.log('image fetch error -- : ', err);
                        }
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
              <FormLabel>About Company</FormLabel>
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
