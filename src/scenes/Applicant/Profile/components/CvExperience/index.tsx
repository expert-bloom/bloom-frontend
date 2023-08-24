/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useRef } from 'react';

import { toast } from 'react-hot-toast';

import FilePond from '@/lib/filePong';
import { usePresignedUpload } from '@/lib/uploader';
import { useProfileSettingFormContext } from '@/scenes/Applicant/Profile';
import {
  type NestedOnSubmit,
  type StepProps,
} from '@/scenes/Applicant/Profile/data';

import s from './cv.module.scss';

const ProfileInfo = ({ stepUtil }: StepProps) => {
  const { formik } = useProfileSettingFormContext();
  const filePond = useRef<FilePond>(null);

  const { uploadToS3 } = usePresignedUpload();

  const onSubmit: NestedOnSubmit = async (values, formikHelpers) => {
    if (!filePond.current) return null;
    // check if the default is changed
    const pond = filePond.current;
    let loadingToast = '';

    if (!filePond.current.getFile()) {
      toast.error('Resume file is required');
      return null;
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

      // await formik.setFieldValue('applicant.resume', url.serverId);
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
              acceptedFileTypes={[
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                '.doc',
                '.docx',
                'text/csv',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              ]}
              onaddfile={(error, file) => {
                console.log('onAddFile :> ', file, error);
                if (error) {
                  toast.error('Error adding resume file');
                  return;
                }

                if (file?.file) {
                  void formik.setFieldValue('applicant.resume', file.source);
                }
              }}
              onerror={(err) => {
                console.log('Error cv resume: ', err);
              }}
              onremovefile={(err, file) => {
                console.log('file-pond -remove: ', err, file);
                void formik.setFieldValue(
                  'applicant.resume',
                  formik.initialValues.applicant.resume,
                );
              }}
              onprocessfile={(err, file) => {
                console.log('file-pond -process: ', err, file);
              }}
              server={{
                /* fetch: async (url, load, error, progress, abort, headers) => {
                  console.log('fetch url: ', url);

                  fetch(`${process.env.NEXT_PUBLIC_URL}/api/image?url=${url}`)
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
                              filePath: 'bloom/cv/',
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

        {/* <Stack>
          <fieldset className={s.wrap}>
            <legend>Experience</legend>
            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>Previous Work Experience</FormLabel>
              <TextField
                name="description"
                type="number"
                required
                fullWidth
                // label="Job Description"
                // onChange={handleChange}
                // value={values.description}
                // error={Boolean(formik.errors.description)}
                // helperText={formik.errors.description as string}
              />
            </Stack>
          </fieldset>
        </Stack> */}
      </div>
    </div>
  );
};

export default ProfileInfo;
