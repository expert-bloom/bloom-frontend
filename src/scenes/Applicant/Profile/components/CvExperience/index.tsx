import React, { useRef, useState } from 'react';

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

import { EnglishLevel } from '@/graphql/client/gql/schema';
import FilePond from '@/lib/filePong';
import Poster from '@/public/vercel.svg';
import { useCountries } from '@/scenes/Search/SearchFilter/country-list';
import { useIndustry } from '@/scenes/Search/SearchFilter/industry-list';
import { capitalize } from '@/utils';

import s from './cv.module.scss';

const ProfileInfo = () => {
  const countryListOptions = useCountries();
  const industry = useIndustry();

  const filePond = useRef<FilePond>(null);
  const [files, setFiles] = useState<any>([]);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Stack>
          <fieldset className={s.wrap}>
            <legend>Information</legend>
            <Stack direction="row" gap=".5rem">
              <Stack flex="1">
                <FormLabel htmlFor="fullname">Fullname</FormLabel>
                <TextField
                  id="fullname"
                  name="description"
                  // disabled
                  required
                  fullWidth
                  // label="Job Description"
                  // onChange={handleChange}
                  // value={values.description}
                  // error={Boolean(formik.errors.description)}
                  // helperText={formik.errors.description as string}
                />
              </Stack>

              <Stack flex="1">
                <FormLabel htmlFor="fullname">Phone number</FormLabel>
                <TextField
                  id="phone"
                  name="description"
                  type="number"
                  // disabled
                  required
                  fullWidth
                  // label="Job Description"
                  // onChange={handleChange}
                  // value={values.description}
                  // error={Boolean(formik.errors.description)}
                  // helperText={formik.errors.description as string}
                />
              </Stack>
            </Stack>

            <Stack>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                // disabled
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
        </Stack>

        <fieldset className={s.wrap}>
          <legend>CV (max 3)</legend>
          <div className={s.file_pond_wrap}>
            <FilePond
              ref={filePond}
              name="interview-file"
              // files={files}
              // onupdatefiles={setFiles}
              allowFileSizeValidation
              maxFileSize="15MB"
              labelMaxFileSizeExceeded={'File is too large'}
              checkValidity
              allowFilePoster={true}
              allowReorder
              allowMultiple
              maxFiles={3}
              allowFileMetadata
              instantUpload={false}
              credits={false}
              allowProcess={false}
              allowReplace={true}
              forceRevert={true}
              allowRevert={true}
              // disabled={disabled}
              labelIdle={
                'Drag & Drop your CV (Resume) or <b class="filepond--label-action">Browse</b>'
              }
              acceptedFileTypes={[
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel',
                'text/csv',
                'application/vnd.oasis.opendocument.spreadsheet',
                'application/vnd.oasis.opendocument.spreadsheet-template',
              ]}
              onaddfile={(error, file) => {
                console.log('onAddFile', error, file);
                if (!error) {
                  // setDisabled(false);
                }
              }}
              onprocessfilestart={() => {
                // setLoading(true);
              }}
              onerror={(err) => {
                console.log('errro: ', err);
                // void formik.setFieldValue('interviewQuestions', []);
                // setDisabled(true);
              }}
            />
          </div>
        </fieldset>

        <Stack>
          <fieldset className={s.wrap}>
            <legend>Links</legend>
            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>Linkedin</FormLabel>
              <TextField
                name="description"
                type="number"
                required
                fullWidth
                label="Job Description"
                // onChange={handleChange}
                // value={values.description}
                // error={Boolean(formik.errors.description)}
                // helperText={formik.errors.description as string}
              />
            </Stack>

            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>Github</FormLabel>
              <TextField
                name="description"
                type="number"
                required
                fullWidth
                label="Job Description"
                // onChange={handleChange}
                // value={values.description}
                // error={Boolean(formik.errors.description)}
                // helperText={formik.errors.description as string}
              />
            </Stack>

            <Stack spacing={0.5} flex="1" style={{ width: '100%' }}>
              <FormLabel>Portfolio</FormLabel>
              <TextField
                name="description"
                type="number"
                required
                fullWidth
                label="Job Description"
                // onChange={handleChange}
                // value={values.description}
                // error={Boolean(formik.errors.description)}
                // helperText={formik.errors.description as string}
              />
            </Stack>
          </fieldset>
        </Stack>
      </div>
    </div>
  );
};

export default ProfileInfo;
