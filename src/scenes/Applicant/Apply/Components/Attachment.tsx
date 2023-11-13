import React from 'react';

import { toast } from 'react-hot-toast';

import FilePond from '@/lib/filePong';
import { usePresignedUpload } from '@/lib/uploader';
import { useJobPostApplicationContext } from '@/scenes/Applicant/Apply';

import s from '../apply.module.scss';

interface Props {
  attachment?: string;
}

const Attachment = ({ attachment }: Props) => {
  const { uploadToS3 } = usePresignedUpload();
  const { formik, attachmentFilePond: filePond } =
    useJobPostApplicationContext();

  return (
    <div className={s.file_pond_wrap}>
      <FilePond
        name="resume-file"
        ref={filePond}
        allowFileSizeValidation
        maxFileSize="20MB"
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
        disabled={formik.isSubmitting}
        labelIdle={
          'Drag & Drop your Attachment Doc or <b class="filepond--label-action">Browse</b>'
        }
        onaddfile={(error, file) => {
          console.log('onAddFile :> ', file, error, file.fileType);
          if (error) {
            toast.error('Error adding resume file');
            return;
          }

          if (file?.file && error === null && !formik.values.attachment) {
            void formik.setFieldValue('attachment', file.source);
          }
        }}
        onerror={(err: any, file, status) => {
          console.log('Error attachment: ', err);
          toast.error(
            `${status.main ?? err?.main ?? 'Error processing attachment'} - ${
              status.sub ?? err?.sub ?? ''
            }`,
          );
        }}
        onremovefile={(err, file) => {
          console.log('file-pond -remove: ', err, file);

          if (err) {
            return toast.error(`Error removing attachment. ${err?.body ?? ''}`);
          }

          void formik.setFieldValue(
            'attachment',
            formik.initialValues.attachment
              ? null
              : formik.initialValues.attachment,
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
                  response.url.split('/').pop() ?? 'attachment',
                  {
                    type: blob.type,
                  },
                );

                load(file);
              })
              .catch((err) => {
                toast.error(
                  'Error loading Your attachment. Check your connection.',
                );
                console.log('attachment fetch error : ', err);
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
                void formik.setFieldValue('attachment', url);
              })
              .catch((err) => {
                abort();
                error('Error uploading attachment. Please try again.');
                toast.error('Error uploading attachment. Please try again.');
                throw err;
              });
          },
        }}
      />
    </div>
  );
};

export default Attachment;
