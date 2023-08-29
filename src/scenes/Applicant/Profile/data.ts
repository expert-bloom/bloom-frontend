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
    image: '' as string,
    firstName: '' as string,
    lastName: '' as string,
    phone: '' as string,
    email: '' as string,
  },

  applicant: {
    about: '' as string,
    jobPosition: '' as string,
    salaryExpectation: '' as unknown as number | null,
    experienceYear: 0 as number,
    skillLevel: 'Beginner' as ExperienceLevel | any,
    englishLevel: 'FLUENT' as EnglishLevel | any,
    accomplishment: '' as string,
    skills: [] as string[],

    // contact info
    location: '' as string,
    linkedin: '' as string,
    github: '' as string,
    portfolio: '' as string,

    // CV & Experience
    resume: '' as string | undefined | null,
    workExperience: [] as WorkExperienceFormValuesType[],
  },
};

export interface WorkExperienceFormValuesType {
  companyName: string;
  position: string;
  companyWebsite?: string | null;
  startDate: string;
  endDate?: string;
  ongoing: boolean;
  accomplishment: string;
  skills: string[];
}

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
