import type React from 'react';

import {
  AccountCircle,
  Contacts,
  PendingActions,
  Settings,
} from '@mui/icons-material';
import { type FormikHelpers } from 'formik/dist/types';

import {
  type EnglishLevel,
  type ExperienceLevel,
  JobSite,
  JobType,
  SalaryType,
} from '@/graphql/client/gql/schema';

export const settingCategories = [
  {
    label: 'Profile',
    Icon: AccountCircle,
    value: '1',
  },
  {
    label: 'Contact Info',
    Icon: Contacts,
    value: '2',
  },
  {
    label: 'CV & Experience',
    Icon: PendingActions,
    value: '3',
  },
  {
    label: 'Account Setting',
    Icon: Settings,
    value: '4',
  },
];

export const initialValues = {
  // profile

  account: {
    image: '' as string | undefined | null,
    firstName: '' as string,
    lastName: '' as string,
    phone: '' as string,
    email: '',
  },

  applicant: {
    about: '' as string,
    jobPosition: '' as string,
    salaryExpectation: '' as unknown as number | null,
    experienceYear: 0 as number,
    skillLevel: 'Beginner' as ExperienceLevel,
    englishLevel: 'FLUENT' as EnglishLevel,
    accomplishment: '' as string,
    skills: [] as string[],

    // contact info
    location: '' as string,
    linkedin: '' as string,
    github: '' as string,
    portfolio: '' as string,

    // CV & Experience
    resume: '' as string | undefined | null,
  },
};

export type SettingFormValuesType = typeof initialValues;

export type NestedOnSubmit = (
  values: SettingFormValuesType,
  formikHelpers: FormikHelpers<SettingFormValuesType>,
) => Promise<SettingFormValuesType | null>;

export interface StepProps {
  stepUtil: React.MutableRefObject<{
    onSubmit: NestedOnSubmit;
  }>;
}
