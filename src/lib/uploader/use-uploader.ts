import { type ProgressServerConfigFunction } from 'filepond';

import { useUploadFiles } from './use-upload-files';

interface UploadResult {
  url: string;
  bucket: string;
  key: string;
}

interface RequestOptions {
  url?: string;
  body?: Record<string, any>;
  headers?: HeadersInit;
}

interface UploadToS3Options {
  endpoint?: {
    request: RequestOptions;
  };

  progress?: ProgressServerConfigFunction;
}

type Strategy = 'presigned' | 'aws-sdk';

export type Uploader = (
  file: File,
  params: Record<string, any>,
  eventHandlers: {
    onProgress: (uploaded: number) => void;
    progress?: ProgressServerConfigFunction;
  },
) => Promise<UploadResult>;

const getUploadParams = async (
  strategy: 'presigned' | 'aws-sdk',
  file: File,
  requestOptions?: RequestOptions,
) => {
  const filename = encodeURIComponent(file.name);

  const additionalBody = requestOptions?.body ?? {};
  const additionalHeaders = requestOptions?.headers ?? {};
  const apiRouteUrl = requestOptions?.url ?? '/api/s3-upload';

  const body = {
    filename,
    filetype: file.type,
    _nextS3: {
      strategy,
    },
    ...additionalBody,
  };

  const headers = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };

  const res = await fetch(apiRouteUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  return await res.json();
};

export const useUploader = (
  strategy: Strategy,
  uploader: Uploader,
  abort: () => void,
) => {
  const {
    addFile,
    updateFileProgress,
    FileInput,
    openFileDialog,
    files,
    resetFiles,
  } = useUploadFiles();

  const uploadToS3 = async (file: File, options: UploadToS3Options = {}) => {
    const params = await getUploadParams(
      strategy,
      file,
      options.endpoint?.request,
    );

    if (params.error) {
      console.error(params.error);
      throw params.error;
    }

    console.log('getUploadParams -------->  : ', params);

    addFile(file);

    const result = await uploader(file, params, {
      onProgress: (uploaded) => {
        updateFileProgress(file, uploaded);
      },
      progress: options?.progress,
    });

    return result;
  };

  return {
    FileInput,
    openFileDialog,
    uploadToS3,
    abort,
    files,
    resetFiles,
  };
};
