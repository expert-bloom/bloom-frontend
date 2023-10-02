/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect } from 'react';

import { toast } from 'react-hot-toast';

import FilePond from '@/lib/filePong';
import { usePresignedUpload } from '@/lib/uploader';
import { useJobPostApplicationContext } from '@/scenes/Applicant/Apply';
import { type NestedOnSubmit } from '@/scenes/Applicant/Profile/data';

import s from '../apply.module.scss';

interface Props {
  resume?: string;
}

const ResumeFile = ({ resume }: Props) => {
  const { uploadToS3 } = usePresignedUpload();
  const { formik, resumeFilePond } = useJobPostApplicationContext();

  useEffect(() => {
    if (resumeFilePond.current && resume) {
      void resumeFilePond.current.addFile(resume);
    }
  }, [resume]);

  const onSubmit: NestedOnSubmit = async (values, formikHelpers) => {
    if (!resumeFilePond.current) return null;
    // check if the default is changed
    const pond = resumeFilePond.current;
    let loadingToast = '';

    if (!resumeFilePond.current.getFile()) {
      // toast.error('Resume file is required');
      return values;
    }

    console.log('nested submit : ', values, resumeFilePond.current.getFile());

    try {
      // formikHelpers.setSubmitting(true);
      if (
        typeof values.applicant.resume === 'string' &&
        values.applicant.resume === resumeFilePond.current.getFile().source
      ) {
        return values;
      }

      let url = {
        serverId: resumeFilePond.current.getFile()?.serverId,
      };

      if (!url.serverId && pond.getFile().source instanceof File) {
        // upload thumbnail to s3
        loadingToast = toast.loading('uploading resume ... ');

        url = await resumeFilePond.current.processFile();
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

  return (
    <div className={s.file_pond_wrap}>
      <FilePond
        name="resume-file"
        required
        ref={resumeFilePond}
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
        // add file extension that can be resume files
        acceptedFileTypes={['application/pdf', 'application/msword']}
        // disabled={disabled}
        labelIdle={
          'Drag & Drop your CV (Resume) or <b class="filepond--label-action">Browse</b>'
        }
        onaddfile={(error, file) => {
          console.log('onAddFile :> ', file, error, file.fileType);
          if (error) {
            toast.error('Error adding resume file');
            return;
          }

          if (file?.file && error === null) {
            void formik.setFieldValue('resume', file.source);
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
        onremovefile={(err, file) => {
          console.log('file-pond -remove: ', err, file);

          if (err) {
            return toast.error(`Error removing resume. ${err?.body ?? ''}`);
          }

          void formik.setFieldValue(
            'resume',
            formik.initialValues.resume ? null : formik.initialValues.resume,
          );
        }}
        onprocessfile={(err, file) => {
          console.log('file-pond -process: ', err, file);
        }}
        server={{
          fetch: (url, load, error, progress, abort, headers) => {
            console.log('fetch url: --- ', url);

            fetch(url)
              .then(async (response) => {
                const blob = await response.blob();
                const file = new File(
                  [blob],
                  response.url.split('/').pop() ?? 'resume',
                  {
                    type: blob.type,
                  },
                );

                load(file);
              })
              .catch((err) => {
                toast.error(
                  'Error loading Your Resume. Check your connection.',
                );
                console.log('resume fetch error : ', err);
              });
          },
          process: (
            fieldName,
            file,
            metadata,
            load,
            error,
            progress,
            abort,
          ) => {
            uploadToS3(file as File, {
              progress,
              endpoint: {
                request: {
                  body: {
                    // filePath: 'bloom/cv/',
                    filePath: 'bloom',
                  },
                },
              },
            })
              .then(({ url, key, bucket }) => {
                console.log('key  --------  : ', key, url);

                load(url);
                void formik.setFieldValue('resume', url);
              })
              .catch((err) => {
                abort();
                error('Error uploading CV. Please try again.');
                console.log('err; ', err, fieldName);
                toast.error('Error uploading CV. Please try again.', {
                  duration: 10000,
                });
                throw err;
              });
          },
        }}
      />
    </div>
  );
};

export default ResumeFile;
