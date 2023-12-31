import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { toast } from 'react-hot-toast';

import FilePond, { Editor } from '@/lib/filePong';

import s from './profilepic.module.scss';

interface Props {
  pondRef: React.RefObject<FilePond>;
  url: string;
  setImgUrl: (url: string) => any;
}

const ProfilePic = ({ pondRef, url, setImgUrl }: Props) => {
  const [imgState, setImgState] = useState({
    firstTime: true,
    isDefault: true,
  });

  useEffect(() => {
    if (url && pondRef.current) {
      void pondRef.current.addFile(url);
    }
  }, [url]);

  return (
    <div className={s.pp}>
      <div className={clsx([s.profile_pic, 'pp'])}>
        <FilePond
          ref={pondRef}
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
          imageEditAllowEdit={!imgState.isDefault}
          credits={false}
          onerror={(err: any, file, status) => {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            toast.error(`${err.main} - ${err.sub}`);
          }}
          onremovefile={() => {
            setImgState((prev) => ({ ...prev, isDefault: false }));
            setImgUrl('');
          }}
          server={{
            fetch: (url, load, error, progress, abort, headers) => {
              console.log(
                'fetch url ----------: ',
                url,
                process.env.NEXT_PUBLIC_URL,
              );

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
              try {
                /* const { url, key, bucket } = await uploadToS3(file as File, {
                  progress,
                  endpoint: {
                    request: {
                      body: {
                        filePath: `${
                          session?.user?.station?.name ?? 'unknown'
                        }/programs`,
                      },
                    },
                  },
                });

                console.log('key  --------  : ', key, url);

                load(url);
                setImgUrl(url); */
                // setFiles([url]);
              } catch (err: any) {
                // error(err.toString());
                abort();
                // setErrorMsg();
                console.log('err; ', err);
                toast.error('Error uploading thumbnail. Please try again.');
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
  );
};

export default ProfilePic;
