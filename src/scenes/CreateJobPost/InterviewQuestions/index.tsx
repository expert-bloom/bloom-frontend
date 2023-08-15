import React, { useRef, useState } from 'react';

import { CircleTwoTone, Delete, Edit } from '@mui/icons-material';
import {
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { toast } from 'react-hot-toast';
import { read, utils } from 'xlsx';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import FilePond from '@/lib/filePong';
import { type FormValuesType } from 'src/scenes/CreateJobPost';

import s from './interview_q.module.scss';

export const schema = toFormikValidationSchema(z.object({}));

const InterviewQuestions = () => {
  const formik = useFormikContext<FormValuesType>();
  const [disabled, setDisabled] = useState(false);
  const [interviewQuestion, setInterviewQuestion] = useState('');
  const filePond = useRef<FilePond>(null);

  const [files, setFiles] = useState<any>([]);

  async function handleFileUpload(file: File): Promise<boolean> {
    const reader = new FileReader();

    const data = await file.arrayBuffer();
    const bitArray = new Uint8Array(data);
    const workbook = read(bitArray, { type: 'array' });
    console.log('workbook: ', workbook);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = utils.sheet_to_json(worksheet);

    console.log('jsonData : ', jsonData);

    if (
      jsonData.length <= 0 ||
      typeof jsonData[0] === 'undefined' ||
      typeof jsonData[0] !== 'object'
    ) {
      toast.error('Invalid or Empty file imported');
      return false;
    }

    const keys = Object.keys(jsonData[0] as any);

    if (keys.length !== 1) {
      toast.error(
        'Invalid file format, make sure the file content match the sample file format',
      );
      return false;
    }

    if (keys[0].toLowerCase() !== 'questions') {
      toast.error(
        'Invalid file format, make sure the file contain only questions column',
      );
      return false;
    }

    const questions = jsonData.map((item: any) => Object.values(item)[0]);
    void formik.setFieldValue('interviewQuestions', questions);

    return true;
  }

  return (
    <div className={s.container}>
      <Typography className={s.step_title} gutterBottom>
        Interview Questions
      </Typography>

      <div className={s.file_pond_wrap}>
        <FilePond
          ref={filePond}
          name="interview-file"
          files={files}
          onupdatefiles={setFiles}
          allowFileSizeValidation
          maxFileSize="2MB"
          instantUpload={false}
          labelMaxFileSizeExceeded={'File is too large'}
          checkValidity
          credits={false}
          allowProcess={false}
          // disabled={disabled}
          allowReplace={true}
          allowMultiple={false}
          forceRevert={true}
          allowRevert={true}
          labelIdle={
            'Drag & Drop your files or <b class="filepond--label-action">Browse</b>'
          }
          acceptedFileTypes={[
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv',
            'application/vnd.oasis.opendocument.spreadsheet',
            'application/vnd.oasis.opendocument.spreadsheet-template',
          ]}
          onaddfile={(error, file) => {
            console.log('onAddFile', error);
            if (!error) {
              setDisabled(false);
            }
          }}
          beforeAddFile={async (file) => {
            const result = await handleFileUpload(file.file as any);
            console.log('result : ', result);
            if (result) {
              setFiles([file]);
              return true;
            } else {
              setFiles(['invalid-file-format']);
              return false;
            }
          }}
          onprocessfilestart={() => {
            // setLoading(true);
          }}
          onremovefile={(error, file) => {
            // setLoading(false);
            // setDisabled(true);

            console.log('error', error);
            void formik.setFieldValue('interviewQuestions', []);
          }}
          onerror={(err) => {
            console.log('errro: ', err);
            void formik.setFieldValue('interviewQuestions', []);
            // setDisabled(true);
          }}
        />
      </div>

      <Stack>
        <FormLabel htmlFor="qualification" inputMode="text">
          Enter Job Qualifications
        </FormLabel>
        <div className={s.qualifications}>
          <List dense={true}>
            {formik.values.interviewQuestions.map((item, idx) => (
              <ListItem
                key={idx}
                secondaryAction={
                  <Stack direction="row">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        setInterviewQuestion(item);
                        const newQualifications =
                          formik.values.interviewQuestions.filter(
                            (_, index) => index !== idx,
                          );

                        void formik.setFieldValue(
                          'interviewQuestions',
                          newQualifications,
                        );
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        const newQualifications =
                          formik.values.interviewQuestions.filter(
                            (_, index) => index !== idx,
                          );

                        void formik.setFieldValue(
                          'interviewQuestions',
                          newQualifications,
                        );
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                }
              >
                <CircleTwoTone fontSize="small" />
                <ListItemText
                  primary={
                    <Typography variant="body1" className={s.q_item}>
                      {item}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>

          <TextField
            id="qualification"
            name="vacancy"
            label="type qualification here ..."
            value={interviewQuestion}
            fullWidth
            onKeyDownCapture={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                event.nativeEvent.stopPropagation();

                void formik.setFieldValue('interviewQuestions', [
                  ...formik.values.interviewQuestions,
                  interviewQuestion,
                ]);
                setInterviewQuestion('');
              }
            }}
            onChange={(value) => {
              setInterviewQuestion(value.target.value);
            }}
            helperText={'max 100'}
          />
        </div>
      </Stack>
    </div>
  );
};

export default InterviewQuestions;
