import React, {
  type ChangeEvent,
  forwardRef,
  type InputHTMLAttributes,
  useRef,
  useState,
} from 'react';

type FileInputProps = {
  onChange: (
    file: File | undefined,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange = () => null, ...restOfProps }, forwardedRef) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      const file = event.target?.files?.[0];
      onChange(file, event);
    };

    return (
      <input
        onChange={handleChange}
        {...restOfProps}
        ref={forwardedRef}
        type="file"
      />
    );
  },
);

FileInput.displayName = 'aslkdjf';

interface TrackedFile {
  file: File;
  progress: number;
  uploaded: number;
  size: number;
}

export const useUploadFiles = () => {
  const ref = useRef<HTMLInputElement>();
  const [files, setFiles] = useState<TrackedFile[]>([]);

  const openFileDialog = () => {
    if (ref.current) {
      ref.current.value = '';
      ref.current?.click();
    }
  };

  const resetFiles = () => {
    setFiles([]);
  };

  const updateFileProgress = (file: File, uploaded: number) => {
    setFiles((files) =>
      files.map((trackedFile) =>
        trackedFile.file === file
          ? {
              file,
              uploaded,
              size: file.size,
              progress: file.size ? (uploaded / file.size) * 100 : 0,
            }
          : trackedFile,
      ),
    );
  };

  const addFile = (file: File) => {
    setFiles((files) => [
      ...files,
      { file, progress: 0, uploaded: 0, size: file.size },
    ]);
  };

  return {
    FileInput: (props: any) => (
      <FileInput {...props} ref={ref} style={{ display: 'none' }} />
    ),
    openFileDialog,
    files,
    addFile,
    updateFileProgress,
    resetFiles,
  };
};
