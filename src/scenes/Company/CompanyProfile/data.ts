import type React from 'react';

import {
  AccountCircle,
  Contacts,
  PendingActions,
  Settings,
} from '@mui/icons-material';
import { type FormikHelpers } from 'formik/dist/types';

export const settingCategories = [
  {
    label: 'Profile',
    Icon: AccountCircle,
    value: '1',
  },
  {
    label: 'Company Info',
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

  company: {
    companyName: '' as string,
    about: '' as string,
    skills: [] as string[],

    location: '' as string,
    linkedin: '' as string,
    github: '' as string,
    portfolio: '' as string,
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
