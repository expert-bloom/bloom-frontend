import React, { useEffect, useState } from 'react';

import {
  AddCircleOutlineTwoTone,
  CircleTwoTone,
  Delete,
  Edit,
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { EnglishLevel } from '@/graphql/client/gql/schema';
import { type FormValuesType } from '@/scenes/Company/CreateJobPost';
import { useProfileSettingFormContext } from '@/scenes/Company/EditJobPost';
import { capitalize } from '@/utils';

import s from './jobrequirment.module.scss';

const jobExperience = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const skillOption = [
  {
    label: 'React.js',
  },
  { label: 'Vue.js' },
  { label: 'php' },
  { label: 'Wordpress' },
  { label: 'C++' },
];

const languageLevel = ['Fluent', 'Conversational', 'Basic'];
const languages = [
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Russian',
  'Chinese',
  'Japanese',
  'Arabic',
  'Hindi',
];

export const schema = toFormikValidationSchema(z.object({}));

const JobRequirement = () => {
  const [qualification, setQualification] = useState('');
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState<number | string>('');

  const { formik } = useProfileSettingFormContext();
  const { values } = formik;

  const [selectedLanguage, setSelectedLanguage] = useState({
    language: '',
    level: '',
  });

  const [isError, setIsError] = useState({
    language: false,
    level: false,
  });

  const handleClose = () => {
    setOpen(false);
    setSelectedLanguage({ language: '', level: '' });
    setIsError({ language: false, level: false });
  };

  useEffect(() => {
    console.log('job-req formik: ', formik.values);
  }, [values]);

  return (
    <div className={s.container}>
      <Typography className={s.step_title} gutterBottom>
        Job Requirements
      </Typography>

      <Stack gap={3} direction="row">
        <Stack gap={0.5} flex="1" justifyContent="space-between">
          <FormLabel htmlFor="skills">List of Skills required</FormLabel>

          <Autocomplete
            id="skills"
            multiple
            limitTags={10}
            options={skillOption}
            disableCloseOnSelect
            sx={{ width: 500 }}
            // getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            value={values.skill}
            onChange={(event, newValue) => {
              void formik.setFieldValue('skill', newValue);
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                name="skill"
                label="job skills"
                placeholder="Skills"
              />
            )}
          />
        </Stack>

        <Stack gap={0.5} flex="1" justifyContent="space-between">
          <FormLabel>Job Experience</FormLabel>

          <Select
            value={formik.values.experience}
            onChange={formik.handleChange}
            name="experience"
          >
            {jobExperience.map((value, idx) => (
              <MenuItem value={value} key={idx}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      <Stack gap={3} direction="row">
        <Stack gap={0.5} flex="1">
          <FormLabel htmlFor="eng-level">Level of English fluency</FormLabel>

          <Select
            id="eng-level"
            name="englishLevel"
            onChange={formik.handleChange}
            value={formik.values.englishLevel}
          >
            {Object.values(EnglishLevel).map((value, idx) => (
              <MenuItem value={value} key={idx}>
                {capitalize(value.toLowerCase()).replace('_', '-')}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        <Stack gap={0.5} flex="1">
          <FormLabel>Skill Level</FormLabel>

          <Select
            value={formik.values.skillLevel}
            onChange={formik.handleChange}
            name="skillLevel"
          >
            {[
              'Beginner',
              'Intermediate',
              'Advanced',
              'Expert',
              'Junior',
              'Senior',
            ].map((value, idx) => (
              <MenuItem value={value} key={idx}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      <Stack>
        <FormLabel htmlFor="qualification" inputMode="text">
          Enter Job Qualifications
        </FormLabel>
        <div className={s.qualifications}>
          <List dense={true}>
            {formik.values.qualifications.map((item, idx) => (
              <ListItem
                key={idx}
                secondaryAction={
                  <Stack direction="row">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        setQualification(item);
                        const newQualifications =
                          formik.values.qualifications.filter(
                            (_, index) => index !== idx,
                          );

                        void formik.setFieldValue(
                          'qualifications',
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
                          formik.values.qualifications.filter(
                            (_, index) => index !== idx,
                          );

                        void formik.setFieldValue(
                          'qualifications',
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
            variant="standard"
            label="type qualification here ..."
            value={qualification}
            fullWidth
            onKeyDownCapture={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                event.nativeEvent.stopPropagation();

                void formik.setFieldValue('qualifications', [
                  ...formik.values.qualifications,
                  qualification,
                ]);
                setQualification('');
              }
            }}
            onChange={(value) => {
              setQualification(value.target.value);
            }}
            helperText={'max 100'}
          />
        </div>
      </Stack>

      <Stack>
        <FormLabel htmlFor="qualification" inputMode="text">
          Other additional languages ( optional )
        </FormLabel>

        <div className={s.additional_lang}>
          {formik.values.otherLanguages.map((lang, idx) => (
            <Chip
              key={idx}
              label={lang.language + ' - ' + lang.level}
              onDelete={() => {
                const newLangs = formik.values.otherLanguages.filter(
                  (_, index) => index !== idx,
                );

                void formik.setFieldValue('otherLanguages', newLangs);
              }}
            />
          ))}

          <Button
            size="small"
            startIcon={
              <AddCircleOutlineTwoTone fontSize="small" color="primary" />
            }
            onClick={() => {
              setOpen(true);
            }}
            variant="outlined"
          >
            Add Language
          </Button>

          <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Add other required languages</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                sx={{ display: 'flex', flexWrap: 'wrap', width: '25rem' }}
              >
                <FormControl sx={{ m: 1, flex: 0.8 }} error={isError.language}>
                  <InputLabel id="language">Language</InputLabel>

                  <Select
                    labelId="lang-label"
                    id="lang"
                    value={selectedLanguage.language}
                    onChange={(event) => {
                      setIsError((prev) => ({
                        ...prev,
                        language: false,
                      }));

                      setSelectedLanguage({
                        ...selectedLanguage,
                        language: event.target.value,
                      });
                    }}
                    input={<OutlinedInput label="Language" />}
                  >
                    {languages.map((lang, idx) => (
                      <MenuItem value={lang} key={idx}>
                        {lang}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, flex: 1.2 }} error={isError.level}>
                  <InputLabel id="level-label">Level</InputLabel>
                  <Select
                    labelId="level-label"
                    id="level"
                    value={selectedLanguage.level}
                    onChange={(event) => {
                      setIsError((prev) => ({
                        ...prev,
                        level: false,
                      }));

                      setSelectedLanguage({
                        ...selectedLanguage,
                        level: event.target.value,
                      });
                    }}
                    input={<OutlinedInput label="Age" />}
                  >
                    {languageLevel.map((level, idx) => (
                      <MenuItem value={level} key={idx}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() => {
                  // add it to formik
                  if (!selectedLanguage.language) {
                    setIsError((prev) => ({
                      ...prev,
                      language: true,
                    }));
                    return;
                  }

                  if (!selectedLanguage.level) {
                    setIsError((prev) => ({
                      ...prev,
                      level: true,
                    }));
                    return;
                  }

                  void formik.setFieldValue('otherLanguages', [
                    ...formik.values.otherLanguages,
                    selectedLanguage,
                  ]);

                  setSelectedLanguage({
                    language: '',
                    level: '',
                  });

                  handleClose();
                }}
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Stack>
    </div>
  );
};

export default JobRequirement;
