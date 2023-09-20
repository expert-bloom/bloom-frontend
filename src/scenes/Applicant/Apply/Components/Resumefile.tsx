import React, { useEffect, useRef } from 'react';

import s from '@/components/commons/FixedLayer/ProfileView/job_detail_slider.module.scss';
import FilePond from '@/lib/filePong';

interface Props {
  resume?: string;
}

const ResumeFile = ({ resume }: Props) => {
  const filePond = useRef<FilePond>(null);

  useEffect(() => {
    if (filePond.current && resume) {
      void filePond.current.addFile(resume);
    }
  }, [resume]);

  return (
    <div className={s.file_pond_wrap}>
      <FilePond
        ref={filePond}
        name="resume-file"
        allowFileSizeValidation
        maxFileSize="10MB"
        labelMaxFileSizeExceeded={'File is too large'}
        required
        allowFileMetadata
        allowFilePoster
        files={[]}
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
        onactivatefile={(file) => {
          console.log('file : ', file);
        }}
        // disabled={disabled}

        onerror={(err) => {
          console.log('Error cv resume: ', err);
        }}
      />
    </div>
  );
};

export default ResumeFile;
