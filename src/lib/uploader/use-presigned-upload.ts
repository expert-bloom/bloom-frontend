/* eslint-disable @typescript-eslint/restrict-template-expressions,prefer-promise-reject-errors */
import { type Uploader, useUploader } from './use-uploader';

function withAbort() {
  return {
    // upload,
    // abort,
  };
}

const upload: Uploader = async (file, params, { onProgress, progress }) => {
  const { url, key, bucket, region, endpoint } = params;
  const buffer = await file.arrayBuffer();

  // convert the file to blob
  const blob = new Blob([buffer], { type: file.type });

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const abort = () => {
      xhr.abort();
    };

    xhr.upload.onprogress = (event: ProgressEvent) => {
      onProgress(event.loaded);
      if (progress) {
        progress(event.lengthComputable, event.loaded, event.total);
      }
    };

    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.setRequestHeader('Cache-Control', 'max-age=630720000');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject('error happened uploading ');
        }
      }
    };

    xhr.send(blob);
  });

  const resultUrl = endpoint
    ? `${endpoint}/${bucket}/${key}`
    : `${process.env.NEXT_PUBLIC_S3_CLOUD_FRONT_URL}/${key}`;

  return {
    url: resultUrl,
    bucket,
    key,
  };
};

export const usePresignedUpload = () => {
  // const {upload} = withAbort()

  const hook = useUploader('presigned', upload, () => null);
  return hook;
};
