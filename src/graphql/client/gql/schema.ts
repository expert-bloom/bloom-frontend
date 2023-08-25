import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any };
};

export type Account = IAccount & {
  accountType: AccountType;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  phone: Maybe<Scalars['String']['output']>;
};

export type AccountFilterInput = {
  email: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  phone: InputMaybe<Scalars['String']['input']>;
};

export type AccountInput = {
  email: InputMaybe<Scalars['String']['input']>;
  id: InputMaybe<Scalars['ID']['input']>;
  phone: InputMaybe<Scalars['String']['input']>;
};

export type AccountPayload = {
  accountType: AccountType;
  affiliate: Maybe<AffiliateLight>;
  applicant: Maybe<ApplicantLight>;
  company: Maybe<CompanyLight>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Maybe<Scalars['DateTime']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  oAuthClient: Array<OAuth>;
  phone: Maybe<Scalars['String']['output']>;
};

export enum AccountType {
  Affiliate = 'AFFILIATE',
  Applicant = 'APPLICANT',
  Company = 'COMPANY',
}

export type AccountUpdateInput = {
  email: InputMaybe<Scalars['String']['input']>;
  firstName: InputMaybe<Scalars['String']['input']>;
  image: InputMaybe<Scalars['String']['input']>;
  lastName: InputMaybe<Scalars['String']['input']>;
  phone: InputMaybe<Scalars['String']['input']>;
};

export type AccountUpdatePayload = PayloadError & {
  account: Maybe<AccountPayload>;
  errors: Array<Error>;
};

export type Affiliate = IAccount & {
  accountType: AccountType;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  phone: Maybe<Scalars['String']['output']>;
};

export type AffiliateLight = {
  id: Scalars['String']['output'];
};

export type Applicant = {
  WorkExperienceYears: Maybe<Scalars['Int']['output']>;
  about: Maybe<Scalars['String']['output']>;
  accomplishment: Maybe<Scalars['String']['output']>;
  education: Maybe<Scalars['String']['output']>;
  englishLevel: Maybe<EnglishLevel>;
  experienceYear: Maybe<Scalars['Int']['output']>;
  gender: Maybe<Scalars['String']['output']>;
  github: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  jobPosition: Maybe<Scalars['String']['output']>;
  languages: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  linkedin: Maybe<Scalars['String']['output']>;
  location: Maybe<Scalars['String']['output']>;
  otherLanguages: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  portfolio: Maybe<Scalars['String']['output']>;
  resume: Maybe<Scalars['String']['output']>;
  salaryExpectation: Maybe<Scalars['Int']['output']>;
  savedJobs: Array<JobPost>;
  skillLevel: Maybe<ExperienceLevel>;
  skills: Maybe<Array<Scalars['String']['output']>>;
  workExperience: Array<WorkExperience>;
};

export type ApplicantLight = {
  WorkExperienceYears: Maybe<Scalars['Int']['output']>;
  about: Maybe<Scalars['String']['output']>;
  accomplishment: Maybe<Scalars['String']['output']>;
  education: Maybe<Scalars['String']['output']>;
  englishLevel: Maybe<EnglishLevel>;
  experienceYear: Maybe<Scalars['Int']['output']>;
  gender: Maybe<Scalars['String']['output']>;
  github: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  jobPosition: Maybe<Scalars['String']['output']>;
  languages: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  linkedin: Maybe<Scalars['String']['output']>;
  location: Maybe<Scalars['String']['output']>;
  otherLanguages: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  portfolio: Maybe<Scalars['String']['output']>;
  resume: Maybe<Scalars['String']['output']>;
  salaryExpectation: Maybe<Scalars['Int']['output']>;
  skillLevel: Maybe<ExperienceLevel>;
  skills: Maybe<Array<Scalars['String']['output']>>;
};

export type ApplicantUpdateInput = {
  about: InputMaybe<Scalars['String']['input']>;
  accomplishment: InputMaybe<Scalars['String']['input']>;
  englishLevel: InputMaybe<EnglishLevel>;
  experienceYear: InputMaybe<Scalars['Int']['input']>;
  github: InputMaybe<Scalars['String']['input']>;
  jobPosition: InputMaybe<Scalars['String']['input']>;
  linkedin: InputMaybe<Scalars['String']['input']>;
  location: InputMaybe<Scalars['String']['input']>;
  portfolio: InputMaybe<Scalars['String']['input']>;
  resume: InputMaybe<Scalars['String']['input']>;
  salaryExpectation: InputMaybe<Scalars['Int']['input']>;
  skillLevel: InputMaybe<ExperienceLevel>;
  skills: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AuthAccountPayload = {
  accountType: AccountType;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Maybe<Scalars['DateTime']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  oAuthClient: Array<OAuth>;
  phone: Maybe<Scalars['String']['output']>;
};

export type AuthApplicant = {
  experienceYear: Maybe<Scalars['Int']['output']>;
  gender: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  resume: Maybe<Scalars['String']['output']>;
};

export type AuthPayload = PayloadError & {
  account: Maybe<AuthAccountPayload>;
  errors: Array<Error>;
};

export type Company = IAccount & {
  accountType: AccountType;
  companyName: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  logo: Maybe<Scalars['String']['output']>;
  phone: Maybe<Scalars['String']['output']>;
};

export type CompanyLight = {
  companyName: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  logo: Maybe<Scalars['String']['output']>;
};

export type CreateJobPostInput = {
  affiliateId: InputMaybe<Scalars['String']['input']>;
  applicationDeadline: Scalars['DateTime']['input'];
  category: Array<Scalars['String']['input']>;
  companyId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  englishLevel: EnglishLevel;
  experienceLevel: ExperienceLevel;
  interviewQuestions: Array<Scalars['String']['input']>;
  isVisible: Scalars['Boolean']['input'];
  jobExperience: Scalars['Int']['input'];
  jobSite: JobSite;
  jobType: JobType;
  location: Scalars['String']['input'];
  otherLanguages: Array<Scalars['String']['input']>;
  postedBy: Scalars['String']['input'];
  qualifications: Array<Scalars['String']['input']>;
  salary: Array<Scalars['Int']['input']>;
  salaryType: SalaryType;
  skills: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  vacancy: Scalars['Int']['input'];
};

export enum EnglishLevel {
  Basic = 'BASIC',
  Conversational = 'CONVERSATIONAL',
  Fluent = 'FLUENT',
  Native = 'NATIVE',
}

export type Error = {
  message: Scalars['String']['output'];
};

export enum ExperienceLevel {
  Beginner = 'Beginner',
  Expert = 'Expert',
  Intermediate = 'Intermediate',
  Junior = 'Junior',
  Senior = 'Senior',
}

export type FindOnePayload = PayloadError & {
  account: Maybe<AccountPayload>;
  errors: Array<Error>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
}

export type IAccount = {
  accountType: AccountType;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  phone: Maybe<Scalars['String']['output']>;
};

export type JobPost = {
  applicationDeadline: Scalars['DateTime']['output'];
  category: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  englishLevel: EnglishLevel;
  experienceLevel: ExperienceLevel;
  id: Scalars['String']['output'];
  interviewQuestions: Array<Scalars['String']['output']>;
  isVisible: Scalars['Boolean']['output'];
  jobExperience: Scalars['Int']['output'];
  jobSite: JobSite;
  jobType: JobType;
  location: Scalars['String']['output'];
  otherLanguages: Array<Scalars['String']['output']>;
  qualifications: Array<Scalars['String']['output']>;
  salary: Array<Scalars['Int']['output']>;
  salaryType: SalaryType;
  skills: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  vacancy: Scalars['Int']['output'];
};

export type JobPostPayload = {
  errors: Array<Error>;
  jobPost: Maybe<JobPost>;
};

export enum JobSite {
  Hybrid = 'HYBRID',
  Onsite = 'ONSITE',
  Remote = 'REMOTE',
}

export enum JobType {
  Contractual = 'CONTRACTUAL',
  FullTime = 'FULL_TIME',
  Internship = 'INTERNSHIP',
  PartTime = 'PART_TIME',
}

export type JopPostFilterInput = {
  companyId: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MeAccountPayload = {
  accountType: AccountType;
  affiliate: Maybe<AffiliateLight>;
  applicant: Maybe<Applicant>;
  company: Maybe<CompanyLight>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Maybe<Scalars['DateTime']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  oAuthClient: Array<OAuth>;
  phone: Maybe<Scalars['String']['output']>;
};

export type MeInput = {
  accountId: Scalars['String']['input'];
};

export type Mutation = {
  createJobPost: JobPostPayload;
  logIn: AuthPayload;
  saveJobPost: Maybe<JobPost>;
  sayHi: Scalars['String']['output'];
  signUp: AuthPayload;
  signUpOAuth: AuthPayload;
  updateProfile: AccountUpdatePayload;
};

export type MutationCreateJobPostArgs = {
  input: CreateJobPostInput;
};

export type MutationLogInArgs = {
  input: LoginInput;
};

export type MutationSaveJobPostArgs = {
  input: SaveJobPostInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationSignUpOAuthArgs = {
  input: OAuthSignUpInput;
};

export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};

export type OAuth = {
  accessToken: Scalars['String']['output'];
  expires: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  provider: Scalars['String']['output'];
  providerAccountId: Scalars['String']['output'];
  refreshToken: Maybe<Scalars['String']['output']>;
  tokenType: Scalars['String']['output'];
};

export type OAuthAccount = {
  provider: InputMaybe<Scalars['String']['input']>;
};

export type OAuthAccountInput = {
  accountType: AccountType;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  image: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  userName: InputMaybe<Scalars['String']['input']>;
};

export type OAuthInput = {
  accessToken: Scalars['String']['input'];
  expires: Scalars['DateTime']['input'];
  provider: Scalars['String']['input'];
  providerAccountId: Scalars['String']['input'];
  refreshToken: InputMaybe<Scalars['String']['input']>;
  tokenType: Scalars['String']['input'];
};

export type OAuthLoginInput = {
  OAuth: OAuthInput;
  account: SignUpInput;
};

export type OAuthSignUpInput = {
  OAuth: OAuthInput;
  account: OAuthAccountInput;
};

export type PayloadError = {
  errors: Array<Error>;
};

export type Query = {
  findAccount: Maybe<FindOnePayload>;
  getCompanies: Array<Company>;
  getJobPosts: Array<JobPost>;
  getSavedJobPosts: Array<JobPost>;
  me: Maybe<MeAccountPayload>;
  sayHi: Maybe<Scalars['String']['output']>;
};

export type QueryFindAccountArgs = {
  input: AccountInput;
};

export type QueryGetJobPostsArgs = {
  input: InputMaybe<JopPostFilterInput>;
};

export type QueryGetSavedJobPostsArgs = {
  input: SavedJobPostsInput;
};

export type QueryMeArgs = {
  input: MeInput;
};

export enum SalaryType {
  Hourly = 'HOURLY',
  Monthly = 'MONTHLY',
  OneTime = 'ONE_TIME',
  Yearly = 'YEARLY',
}

export type SaveJobPostInput = {
  accountId: Scalars['String']['input'];
  jobPostId: Scalars['String']['input'];
  save: Scalars['Boolean']['input'];
};

export type SavedJobPostsInput = {
  accountId: Scalars['String']['input'];
};

export type SignUpInput = {
  accountType: AccountType;
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  image: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  name: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type UpdateProfileInput = {
  account: InputMaybe<AccountUpdateInput>;
  accountId: Scalars['String']['input'];
  applicant: InputMaybe<ApplicantUpdateInput>;
};

export type WorkExperience = {
  accomplishment: Scalars['String']['output'];
  companyName: Scalars['String']['output'];
  companyWebsite: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTime']['output'];
  position: Scalars['String']['output'];
  skills: Array<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
};

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;

export type UpdateProfileMutation = {
  updateProfile: {
    errors: Array<{ message: string }>;
    account: {
      id: string;
      email: string;
      emailVerified: any | null;
      accountType: AccountType;
      image: string | null;
      firstName: string;
      lastName: string;
      createdAt: any;
      phone: string | null;
      applicant: {
        id: string;
        about: string | null;
        jobPosition: string | null;
        salaryExpectation: number | null;
        WorkExperienceYears: number | null;
        location: string | null;
        englishLevel: EnglishLevel | null;
        otherLanguages: Array<string | null> | null;
        accomplishment: string | null;
        skillLevel: ExperienceLevel | null;
        skills: Array<string> | null;
        experienceYear: number | null;
        resume: string | null;
        github: string | null;
        linkedin: string | null;
        portfolio: string | null;
      } | null;
      company: {
        id: string;
        companyName: string | null;
        logo: string | null;
      } | null;
      oAuthClient: Array<{ id: string; provider: string }>;
      affiliate: { id: string } | null;
    } | null;
  };
};

export type AccountPayloadFragmentFragment = {
  id: string;
  email: string;
  emailVerified: any | null;
  accountType: AccountType;
  image: string | null;
  firstName: string;
  lastName: string;
  createdAt: any;
  phone: string | null;
  applicant: {
    id: string;
    about: string | null;
    jobPosition: string | null;
    salaryExpectation: number | null;
    WorkExperienceYears: number | null;
    location: string | null;
    englishLevel: EnglishLevel | null;
    otherLanguages: Array<string | null> | null;
    accomplishment: string | null;
    skillLevel: ExperienceLevel | null;
    skills: Array<string> | null;
    experienceYear: number | null;
    resume: string | null;
    github: string | null;
    linkedin: string | null;
    portfolio: string | null;
  } | null;
  company: {
    id: string;
    companyName: string | null;
    logo: string | null;
  } | null;
  oAuthClient: Array<{ id: string; provider: string }>;
  affiliate: { id: string } | null;
};

export type MePayloadFragmentFragment = {
  id: string;
  email: string;
  emailVerified: any | null;
  accountType: AccountType;
  image: string | null;
  firstName: string;
  lastName: string;
  createdAt: any;
  phone: string | null;
  applicant: {
    id: string;
    about: string | null;
    jobPosition: string | null;
    salaryExpectation: number | null;
    WorkExperienceYears: number | null;
    location: string | null;
    englishLevel: EnglishLevel | null;
    otherLanguages: Array<string | null> | null;
    accomplishment: string | null;
    skillLevel: ExperienceLevel | null;
    skills: Array<string> | null;
    experienceYear: number | null;
    resume: string | null;
    github: string | null;
    linkedin: string | null;
    portfolio: string | null;
    workExperience: Array<{
      __typename: 'WorkExperience';
      companyName: string;
      position: string;
      startDate: any;
      endDate: any;
      accomplishment: string;
      companyWebsite: string | null;
      skills: Array<string>;
    }>;
    savedJobs: Array<{
      id: string;
      title: string;
      applicationDeadline: any;
      description: string;
      location: string;
      salary: Array<number>;
      salaryType: SalaryType;
      jobType: JobType;
      category: Array<string>;
      vacancy: number;
      email: string;
      jobSite: JobSite;
      isVisible: boolean;
      jobExperience: number;
      experienceLevel: ExperienceLevel;
      englishLevel: EnglishLevel;
      otherLanguages: Array<string>;
      skills: Array<string>;
      qualifications: Array<string>;
      interviewQuestions: Array<string>;
      createdAt: any;
      updatedAt: any;
    }>;
  } | null;
  company: {
    id: string;
    companyName: string | null;
    logo: string | null;
  } | null;
  oAuthClient: Array<{ id: string; provider: string }>;
  affiliate: { id: string } | null;
};

export type FindAccountQueryVariables = Exact<{
  input: AccountInput;
}>;

export type FindAccountQuery = {
  findAccount: {
    errors: Array<{ message: string }>;
    account: {
      id: string;
      email: string;
      emailVerified: any | null;
      accountType: AccountType;
      image: string | null;
      firstName: string;
      lastName: string;
      createdAt: any;
      phone: string | null;
      applicant: {
        id: string;
        about: string | null;
        jobPosition: string | null;
        salaryExpectation: number | null;
        WorkExperienceYears: number | null;
        location: string | null;
        englishLevel: EnglishLevel | null;
        otherLanguages: Array<string | null> | null;
        accomplishment: string | null;
        skillLevel: ExperienceLevel | null;
        skills: Array<string> | null;
        experienceYear: number | null;
        resume: string | null;
        github: string | null;
        linkedin: string | null;
        portfolio: string | null;
      } | null;
      company: {
        id: string;
        companyName: string | null;
        logo: string | null;
      } | null;
      oAuthClient: Array<{ id: string; provider: string }>;
      affiliate: { id: string } | null;
    } | null;
  } | null;
};

export type MeQueryVariables = Exact<{
  input: MeInput;
}>;

export type MeQuery = {
  me: {
    id: string;
    email: string;
    emailVerified: any | null;
    accountType: AccountType;
    image: string | null;
    firstName: string;
    lastName: string;
    createdAt: any;
    phone: string | null;
    applicant: {
      id: string;
      about: string | null;
      jobPosition: string | null;
      salaryExpectation: number | null;
      WorkExperienceYears: number | null;
      location: string | null;
      englishLevel: EnglishLevel | null;
      otherLanguages: Array<string | null> | null;
      accomplishment: string | null;
      skillLevel: ExperienceLevel | null;
      skills: Array<string> | null;
      experienceYear: number | null;
      resume: string | null;
      github: string | null;
      linkedin: string | null;
      portfolio: string | null;
      workExperience: Array<{
        __typename: 'WorkExperience';
        companyName: string;
        position: string;
        startDate: any;
        endDate: any;
        accomplishment: string;
        companyWebsite: string | null;
        skills: Array<string>;
      }>;
      savedJobs: Array<{
        id: string;
        title: string;
        applicationDeadline: any;
        description: string;
        location: string;
        salary: Array<number>;
        salaryType: SalaryType;
        jobType: JobType;
        category: Array<string>;
        vacancy: number;
        email: string;
        jobSite: JobSite;
        isVisible: boolean;
        jobExperience: number;
        experienceLevel: ExperienceLevel;
        englishLevel: EnglishLevel;
        otherLanguages: Array<string>;
        skills: Array<string>;
        qualifications: Array<string>;
        interviewQuestions: Array<string>;
        createdAt: any;
        updatedAt: any;
      }>;
    } | null;
    company: {
      id: string;
      companyName: string | null;
      logo: string | null;
    } | null;
    oAuthClient: Array<{ id: string; provider: string }>;
    affiliate: { id: string } | null;
  } | null;
};

export type AccountFragmentFragment = {
  id: string;
  email: string;
  accountType: AccountType;
  image: string | null;
  firstName: string;
  lastName: string;
  createdAt: any;
};

export type AuthAccountFragmentFragment = {
  id: string;
  email: string;
  accountType: AccountType;
  image: string | null;
  firstName: string;
  lastName: string;
  createdAt: any;
  oAuthClient: Array<{
    id: string;
    provider: string;
    accessToken: string;
    expires: any;
    providerAccountId: string;
    tokenType: string;
  }>;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  logIn: {
    errors: Array<{ message: string }>;
    account: {
      id: string;
      email: string;
      accountType: AccountType;
      image: string | null;
      firstName: string;
      lastName: string;
      createdAt: any;
      oAuthClient: Array<{
        id: string;
        provider: string;
        accessToken: string;
        expires: any;
        providerAccountId: string;
        tokenType: string;
      }>;
    } | null;
  };
};

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignUpMutation = {
  signUp: {
    errors: Array<{ message: string }>;
    account: {
      id: string;
      email: string;
      accountType: AccountType;
      image: string | null;
      firstName: string;
      lastName: string;
      createdAt: any;
      oAuthClient: Array<{
        id: string;
        provider: string;
        accessToken: string;
        expires: any;
        providerAccountId: string;
        tokenType: string;
      }>;
    } | null;
  };
};

export type SignUpOAuthMutationVariables = Exact<{
  input: OAuthSignUpInput;
}>;

export type SignUpOAuthMutation = {
  signUpOAuth: {
    errors: Array<{ message: string }>;
    account: {
      id: string;
      email: string;
      accountType: AccountType;
      image: string | null;
      firstName: string;
      lastName: string;
      createdAt: any;
      oAuthClient: Array<{
        id: string;
        provider: string;
        accessToken: string;
        expires: any;
        providerAccountId: string;
        tokenType: string;
      }>;
    } | null;
  };
};

export type GetCompaniesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCompaniesQuery = {
  getCompanies: Array<{
    id: string;
    companyName: string | null;
    firstName: string;
    lastName: string;
    phone: string | null;
    email: string;
    logo: string | null;
    createdAt: any;
  }>;
};

export type CreateJobPostMutationVariables = Exact<{
  input: CreateJobPostInput;
}>;

export type CreateJobPostMutation = {
  createJobPost: {
    errors: Array<{ message: string }>;
    jobPost: { id: string } | null;
  };
};

export type SaveJobPostMutationVariables = Exact<{
  input: SaveJobPostInput;
}>;

export type SaveJobPostMutation = {
  saveJobPost: {
    id: string;
    title: string;
    applicationDeadline: any;
    description: string;
    location: string;
    salary: Array<number>;
    salaryType: SalaryType;
    jobType: JobType;
    category: Array<string>;
    vacancy: number;
    email: string;
    jobSite: JobSite;
    isVisible: boolean;
    jobExperience: number;
    experienceLevel: ExperienceLevel;
    englishLevel: EnglishLevel;
    otherLanguages: Array<string>;
    skills: Array<string>;
    qualifications: Array<string>;
    interviewQuestions: Array<string>;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export type JopPostFragment = {
  id: string;
  title: string;
  applicationDeadline: any;
  description: string;
  location: string;
  salary: Array<number>;
  salaryType: SalaryType;
  jobType: JobType;
  category: Array<string>;
  vacancy: number;
  email: string;
  jobSite: JobSite;
  isVisible: boolean;
  jobExperience: number;
  experienceLevel: ExperienceLevel;
  englishLevel: EnglishLevel;
  otherLanguages: Array<string>;
  skills: Array<string>;
  qualifications: Array<string>;
  interviewQuestions: Array<string>;
  createdAt: any;
  updatedAt: any;
};

export type GetJobPostsQueryVariables = Exact<{
  input: InputMaybe<JopPostFilterInput>;
}>;

export type GetJobPostsQuery = {
  getJobPosts: Array<{
    id: string;
    title: string;
    applicationDeadline: any;
    description: string;
    location: string;
    salary: Array<number>;
    salaryType: SalaryType;
    jobType: JobType;
    category: Array<string>;
    vacancy: number;
    email: string;
    jobSite: JobSite;
    isVisible: boolean;
    jobExperience: number;
    experienceLevel: ExperienceLevel;
    englishLevel: EnglishLevel;
    otherLanguages: Array<string>;
    skills: Array<string>;
    qualifications: Array<string>;
    interviewQuestions: Array<string>;
    createdAt: any;
    updatedAt: any;
  }>;
};

export const AccountPayloadFragmentFragmentDoc = gql`
  fragment AccountPayloadFragment on AccountPayload {
    id
    email
    emailVerified
    accountType
    image
    firstName
    lastName
    createdAt
    phone
    applicant {
      id
      about
      jobPosition
      salaryExpectation
      WorkExperienceYears
      location
      englishLevel
      otherLanguages
      accomplishment
      skillLevel
      skills
      experienceYear
      resume
      github
      linkedin
      portfolio
    }
    company {
      id
      companyName
      logo
    }
    oAuthClient {
      id
      provider
    }
    affiliate {
      id
    }
  }
`;
export const JopPostFragmentDoc = gql`
  fragment JopPost on JobPost {
    id
    title
    applicationDeadline
    description
    location
    salary
    salaryType
    jobType
    category
    vacancy
    email
    jobSite
    isVisible
    jobExperience
    experienceLevel
    englishLevel
    otherLanguages
    skills
    qualifications
    interviewQuestions
    createdAt
    updatedAt
  }
`;
export const MePayloadFragmentFragmentDoc = gql`
  fragment MePayloadFragment on MeAccountPayload {
    id
    email
    emailVerified
    accountType
    image
    firstName
    lastName
    createdAt
    phone
    applicant {
      id
      about
      jobPosition
      salaryExpectation
      WorkExperienceYears
      location
      englishLevel
      otherLanguages
      accomplishment
      skillLevel
      skills
      experienceYear
      resume
      github
      linkedin
      portfolio
      workExperience {
        companyName
        position
        startDate
        endDate
        accomplishment
        companyWebsite
        skills
        __typename
      }
      savedJobs {
        ...JopPost
      }
    }
    company {
      id
      companyName
      logo
    }
    oAuthClient {
      id
      provider
    }
    affiliate {
      id
    }
  }
  ${JopPostFragmentDoc}
`;
export const AccountFragmentFragmentDoc = gql`
  fragment AccountFragment on Account {
    id
    email
    accountType
    image
    firstName
    lastName
    createdAt
  }
`;
export const AuthAccountFragmentFragmentDoc = gql`
  fragment AuthAccountFragment on AuthAccountPayload {
    id
    email
    accountType
    image
    firstName
    lastName
    createdAt
    oAuthClient {
      id
      provider
      accessToken
      expires
      providerAccountId
      tokenType
    }
  }
`;
export const UpdateProfileDocument = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      errors {
        message
      }
      account {
        ...AccountPayloadFragment
      }
    }
  }
  ${AccountPayloadFragmentFragmentDoc}
`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument, options);
}
export type UpdateProfileMutationHookResult = ReturnType<
  typeof useUpdateProfileMutation
>;
export type UpdateProfileMutationResult =
  Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
export const FindAccountDocument = gql`
  query FindAccount($input: AccountInput!) {
    findAccount(input: $input) {
      errors {
        message
      }
      account {
        ...AccountPayloadFragment
      }
    }
  }
  ${AccountPayloadFragmentFragmentDoc}
`;

/**
 * __useFindAccountQuery__
 *
 * To run a query within a React component, call `useFindAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAccountQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindAccountQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindAccountQuery,
    FindAccountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindAccountQuery, FindAccountQueryVariables>(
    FindAccountDocument,
    options,
  );
}
export function useFindAccountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindAccountQuery,
    FindAccountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindAccountQuery, FindAccountQueryVariables>(
    FindAccountDocument,
    options,
  );
}
export type FindAccountQueryHookResult = ReturnType<typeof useFindAccountQuery>;
export type FindAccountLazyQueryHookResult = ReturnType<
  typeof useFindAccountLazyQuery
>;
export type FindAccountQueryResult = Apollo.QueryResult<
  FindAccountQuery,
  FindAccountQueryVariables
>;
export const MeDocument = gql`
  query Me($input: MeInput!) {
    me(input: $input) {
      ...MePayloadFragment
    }
  }
  ${MePayloadFragmentFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMeQuery(
  baseOptions: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    logIn(input: $input) {
      errors {
        message
      }
      account {
        ...AuthAccountFragment
      }
    }
  }
  ${AuthAccountFragmentFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const SignUpDocument = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      errors {
        message
      }
      account {
        ...AuthAccountFragment
      }
    }
  }
  ${AuthAccountFragmentFragmentDoc}
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options,
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
export const SignUpOAuthDocument = gql`
  mutation SignUpOAuth($input: OAuthSignUpInput!) {
    signUpOAuth(input: $input) {
      errors {
        message
      }
      account {
        ...AuthAccountFragment
      }
    }
  }
  ${AuthAccountFragmentFragmentDoc}
`;
export type SignUpOAuthMutationFn = Apollo.MutationFunction<
  SignUpOAuthMutation,
  SignUpOAuthMutationVariables
>;

/**
 * __useSignUpOAuthMutation__
 *
 * To run a mutation, you first call `useSignUpOAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpOAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpOAuthMutation, { data, loading, error }] = useSignUpOAuthMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpOAuthMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpOAuthMutation,
    SignUpOAuthMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpOAuthMutation, SignUpOAuthMutationVariables>(
    SignUpOAuthDocument,
    options,
  );
}
export type SignUpOAuthMutationHookResult = ReturnType<
  typeof useSignUpOAuthMutation
>;
export type SignUpOAuthMutationResult =
  Apollo.MutationResult<SignUpOAuthMutation>;
export type SignUpOAuthMutationOptions = Apollo.BaseMutationOptions<
  SignUpOAuthMutation,
  SignUpOAuthMutationVariables
>;
export const GetCompaniesDocument = gql`
  query GetCompanies {
    getCompanies {
      id
      companyName
      firstName
      lastName
      phone
      email
      logo
      createdAt
    }
  }
`;

/**
 * __useGetCompaniesQuery__
 *
 * To run a query within a React component, call `useGetCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCompaniesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCompaniesQuery,
    GetCompaniesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(
    GetCompaniesDocument,
    options,
  );
}
export function useGetCompaniesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCompaniesQuery,
    GetCompaniesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCompaniesQuery, GetCompaniesQueryVariables>(
    GetCompaniesDocument,
    options,
  );
}
export type GetCompaniesQueryHookResult = ReturnType<
  typeof useGetCompaniesQuery
>;
export type GetCompaniesLazyQueryHookResult = ReturnType<
  typeof useGetCompaniesLazyQuery
>;
export type GetCompaniesQueryResult = Apollo.QueryResult<
  GetCompaniesQuery,
  GetCompaniesQueryVariables
>;
export const CreateJobPostDocument = gql`
  mutation CreateJobPost($input: CreateJobPostInput!) {
    createJobPost(input: $input) {
      errors {
        message
      }
      jobPost {
        id
      }
    }
  }
`;
export type CreateJobPostMutationFn = Apollo.MutationFunction<
  CreateJobPostMutation,
  CreateJobPostMutationVariables
>;

/**
 * __useCreateJobPostMutation__
 *
 * To run a mutation, you first call `useCreateJobPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJobPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJobPostMutation, { data, loading, error }] = useCreateJobPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateJobPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateJobPostMutation,
    CreateJobPostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateJobPostMutation,
    CreateJobPostMutationVariables
  >(CreateJobPostDocument, options);
}
export type CreateJobPostMutationHookResult = ReturnType<
  typeof useCreateJobPostMutation
>;
export type CreateJobPostMutationResult =
  Apollo.MutationResult<CreateJobPostMutation>;
export type CreateJobPostMutationOptions = Apollo.BaseMutationOptions<
  CreateJobPostMutation,
  CreateJobPostMutationVariables
>;
export const SaveJobPostDocument = gql`
  mutation SaveJobPost($input: SaveJobPostInput!) {
    saveJobPost(input: $input) {
      ...JopPost
    }
  }
  ${JopPostFragmentDoc}
`;
export type SaveJobPostMutationFn = Apollo.MutationFunction<
  SaveJobPostMutation,
  SaveJobPostMutationVariables
>;

/**
 * __useSaveJobPostMutation__
 *
 * To run a mutation, you first call `useSaveJobPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveJobPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveJobPostMutation, { data, loading, error }] = useSaveJobPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveJobPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveJobPostMutation,
    SaveJobPostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SaveJobPostMutation, SaveJobPostMutationVariables>(
    SaveJobPostDocument,
    options,
  );
}
export type SaveJobPostMutationHookResult = ReturnType<
  typeof useSaveJobPostMutation
>;
export type SaveJobPostMutationResult =
  Apollo.MutationResult<SaveJobPostMutation>;
export type SaveJobPostMutationOptions = Apollo.BaseMutationOptions<
  SaveJobPostMutation,
  SaveJobPostMutationVariables
>;
export const GetJobPostsDocument = gql`
  query GetJobPosts($input: JopPostFilterInput) {
    getJobPosts(input: $input) {
      ...JopPost
    }
  }
  ${JopPostFragmentDoc}
`;

/**
 * __useGetJobPostsQuery__
 *
 * To run a query within a React component, call `useGetJobPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobPostsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetJobPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetJobPostsQuery,
    GetJobPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetJobPostsQuery, GetJobPostsQueryVariables>(
    GetJobPostsDocument,
    options,
  );
}
export function useGetJobPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetJobPostsQuery,
    GetJobPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetJobPostsQuery, GetJobPostsQueryVariables>(
    GetJobPostsDocument,
    options,
  );
}
export type GetJobPostsQueryHookResult = ReturnType<typeof useGetJobPostsQuery>;
export type GetJobPostsLazyQueryHookResult = ReturnType<
  typeof useGetJobPostsLazyQuery
>;
export type GetJobPostsQueryResult = Apollo.QueryResult<
  GetJobPostsQuery,
  GetJobPostsQueryVariables
>;
