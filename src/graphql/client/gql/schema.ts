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
  emailVerified: Maybe<Scalars['DateTime']['output']>;
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phone: Maybe<Scalars['String']['output']>;
};

export type AccountFilterInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type AccountPayload = {
  accountType: AccountType;
  affiliate: Maybe<AffiliateLight>;
  applicant: Maybe<Applicant>;
  company: Maybe<Company>;
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

export enum AccountSortField {
  /** Sort users by created at. */
  CreatedAt = 'CREATED_AT',
  /** Sort users by email. */
  Email = 'EMAIL',
  /** Sort users by first name. */
  FirstName = 'FIRST_NAME',
  /** Sort users by last modified at. */
  LastModifiedAt = 'LAST_MODIFIED_AT',
  /** Sort users by last name. */
  LastName = 'LAST_NAME',
}

export enum AccountType {
  Affiliate = 'AFFILIATE',
  Applicant = 'APPLICANT',
  Company = 'COMPANY',
}

export type AccountUpdate = PayloadError & {
  account: Maybe<AccountPayload>;
  errors: Array<Error>;
};

export type AccountUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<Scalars['DateTime']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Affiliate = IAccount & {
  accountType: AccountType;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Maybe<Scalars['DateTime']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  phone: Maybe<Scalars['String']['output']>;
};

export type AffiliateLight = {
  id: Scalars['String']['output'];
};

export type Applicant = Node & {
  WorkExperienceYears: Maybe<Scalars['Int']['output']>;
  about: Maybe<Scalars['String']['output']>;
  accomplishment: Maybe<Scalars['String']['output']>;
  account: Account;
  education: Maybe<Scalars['String']['output']>;
  englishLevel: Maybe<EnglishLevel>;
  experienceYear: Maybe<Scalars['Int']['output']>;
  gender: Maybe<Scalars['String']['output']>;
  github: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  introVideo: Maybe<Scalars['String']['output']>;
  jobPosition: Maybe<Scalars['String']['output']>;
  languages: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  linkedin: Maybe<Scalars['String']['output']>;
  location: Maybe<Scalars['String']['output']>;
  otherLanguages: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  portfolio: Maybe<Scalars['String']['output']>;
  resume: Maybe<Scalars['String']['output']>;
  salaryExpectation: Maybe<Scalars['Int']['output']>;
  savedJobs: Maybe<ApplicantSavedJobPostConnections>;
  skillLevel: Maybe<ExperienceLevel>;
  skills: Maybe<Array<Scalars['String']['output']>>;
  workExperience: Array<WorkExperience>;
};

export type ApplicantSavedJobsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ApplicantAccountConnections = {
  edges: Array<ApplicantAccountEdge>;
  pageInfo: PageInfo;
};

export type ApplicantAccountEdge = {
  cursor: Scalars['String']['output'];
  node: Account;
};

export type ApplicantAppliedJobPostEdge = {
  cursor: Scalars['String']['output'];
  node: JobPost;
};

export type ApplicantConnection = {
  edges: Array<ApplicantEdge>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** A total count of items in the collection. */
  totalCount: Maybe<Scalars['Int']['output']>;
};

export type ApplicantEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Applicant;
};

export type ApplicantFilter = {
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ApplicantOrdering = {
  direction: OrderDirection;
  field: AccountSortField;
};

export type ApplicantProfileUpdateInput = {
  account?: InputMaybe<AccountUpdateInput>;
  accountId: Scalars['String']['input'];
  applicant?: InputMaybe<ApplicantUpdateInput>;
};

export type ApplicantSavedJobPostConnections = {
  edges: Array<ApplicantSavedJobPostEdge>;
  pageInfo: PageInfo;
};

export type ApplicantSavedJobPostEdge = {
  cursor: Scalars['String']['output'];
  node: JobPost;
};

export type ApplicantUpdateInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  accomplishment?: InputMaybe<Scalars['String']['input']>;
  englishLevel?: InputMaybe<EnglishLevel>;
  experienceYear?: InputMaybe<Scalars['Int']['input']>;
  github?: InputMaybe<Scalars['String']['input']>;
  introVideo?: InputMaybe<Scalars['String']['input']>;
  jobPosition?: InputMaybe<Scalars['String']['input']>;
  linkedin?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  portfolio?: InputMaybe<Scalars['String']['input']>;
  resume?: InputMaybe<Scalars['String']['input']>;
  salaryExpectation?: InputMaybe<Scalars['Int']['input']>;
  skillLevel?: InputMaybe<ExperienceLevel>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  workExperience?: InputMaybe<Array<WorkExperienceInput>>;
};

export type Application = {
  applicant: Maybe<Applicant>;
  applicantId: Scalars['String']['output'];
  attachment: Maybe<Scalars['String']['output']>;
  company: Maybe<Company>;
  coverLetter: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  interview: Maybe<Interview>;
  jobPost: Maybe<JobPost>;
  jobPostId: Scalars['String']['output'];
  offer: Maybe<Offer>;
  phone: Scalars['String']['output'];
  resume: Scalars['String']['output'];
  status: ApplicationStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type ApplicationConnections = {
  edges: Array<ApplicationEdge>;
  pageInfo: PageInfo;
};

export type ApplicationEdge = {
  cursor: Scalars['String']['output'];
  node: Application;
};

export type ApplicationFilter = {
  applicantId?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  jobPostId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ApplicationStatus>;
};

export enum ApplicationStatus {
  Accepted = 'ACCEPTED',
  Interview = 'INTERVIEW',
  Offer = 'OFFER',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

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

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type Company = Node & {
  account: Account;
  companyName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  logo: Maybe<Scalars['String']['output']>;
  savedApplicants: Array<Applicant>;
};

export type CompanyJobPostsResponse = {
  errors: Array<Error>;
  jobPosts: Array<JobPost>;
};

export type CreateApplicationInput = {
  applicantId: Scalars['String']['input'];
  attachment?: InputMaybe<Scalars['String']['input']>;
  companyId: Scalars['String']['input'];
  coverLetter: Scalars['String']['input'];
  email: Scalars['String']['input'];
  jobPostId: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  resume: Scalars['String']['input'];
};

export type CreateApplicationPayload = PayloadError & {
  application: Maybe<Application>;
  errors: Array<Error>;
};

export type CreateJobPostInput = {
  affiliateId?: InputMaybe<Scalars['String']['input']>;
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

export type EditJobPostFilter = {
  companyId: Scalars['String']['input'];
  jobPostId: Scalars['String']['input'];
};

export type EditJobPostInput = {
  editedData: EditJobPostInputData;
  filter: EditJobPostFilter;
};

export type EditJobPostInputData = {
  applicationDeadline?: InputMaybe<Scalars['DateTime']['input']>;
  category?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  englishLevel?: InputMaybe<EnglishLevel>;
  experienceLevel?: InputMaybe<ExperienceLevel>;
  interviewQuestions?: InputMaybe<Array<Scalars['String']['input']>>;
  isVisible?: InputMaybe<Scalars['Boolean']['input']>;
  jobExperience?: InputMaybe<Scalars['Int']['input']>;
  jobSite?: InputMaybe<JobSite>;
  jobType?: InputMaybe<JobType>;
  location?: InputMaybe<Scalars['String']['input']>;
  otherLanguages?: InputMaybe<Array<Scalars['String']['input']>>;
  qualifications?: InputMaybe<Array<Scalars['String']['input']>>;
  salary?: InputMaybe<Array<Scalars['Int']['input']>>;
  salaryType?: InputMaybe<SalaryType>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  vacancy?: InputMaybe<Scalars['Int']['input']>;
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

export type FindAccountFilterInput = {
  accountFilter?: InputMaybe<AccountFilterInput>;
  oAuthFilter?: InputMaybe<OAuthAccountFilterInput>;
};

export type FindOnePayload = PayloadError & {
  account: Maybe<AccountPayload>;
  errors: Array<Error>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER',
}

export type GetApplicantInput = {
  id: Scalars['String']['input'];
};

export type GetApplicantsInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ApplicantFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ApplicantOrdering>>;
};

export type GetApplicationFilter = {
  id: Scalars['String']['input'];
  jobPostId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ApplicationStatus>;
};

export type GetApplicationPayload = PayloadError & {
  application: Maybe<Application>;
  errors: Array<Error>;
};

export type GetCompanyJobPostsInput = {
  companyId: Scalars['String']['input'];
};

export type GetJobApplicationsInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<ApplicationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ApplicantOrdering>>;
};

export type GetJobPostInput = {
  id: Scalars['String']['input'];
};

export type GetSavedApplicantInput = {
  companyId: Scalars['String']['input'];
};

export type IAccount = {
  accountType: AccountType;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Maybe<Scalars['DateTime']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  phone: Maybe<Scalars['String']['output']>;
};

export type Interview = Node & {
  answerText: Maybe<Scalars['String']['output']>;
  answerVideo: Maybe<Scalars['String']['output']>;
  applicantId: Scalars['String']['output'];
  attachment: Maybe<Scalars['String']['output']>;
  companyId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deadline: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  jobApplicationId: Maybe<Scalars['String']['output']>;
  jobPostId: Scalars['String']['output'];
  status: Maybe<InterviewStatus>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum InterviewStatus {
  Accepted = 'ACCEPTED',
  ApplicantRefused = 'APPLICANT_REFUSED',
  ApplicantResponded = 'APPLICANT_RESPONDED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type JobPost = Node & {
  applicationDeadline: Scalars['DateTime']['output'];
  category: Array<Scalars['String']['output']>;
  companyId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  englishLevel: EnglishLevel;
  experienceLevel: ExperienceLevel;
  id: Scalars['ID']['output'];
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

export type JobPostResponse = {
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

export type MeInput = {
  accountId: Scalars['String']['input'];
};

export type Mutation = {
  applicantProfileUpdate: AccountUpdate;
  createApplication: CreateApplicationPayload;
  createJobPost: JobPostResponse;
  editJobPost: JobPostResponse;
  logIn: AuthPayload;
  logOut: Scalars['Boolean']['output'];
  offerApplicant: Maybe<Offer>;
  profileUpdate: AccountUpdate;
  respondInterview: Maybe<Interview>;
  respondToOffer: Maybe<Offer>;
  saveApplicant: Maybe<Scalars['Boolean']['output']>;
  saveJobPost: Maybe<JobPost>;
  sendEmail: Maybe<Scalars['Boolean']['output']>;
  sendInterviewRequest: Maybe<Interview>;
  signUp: AuthPayload;
  signUpOAuth: AuthPayload;
  verifyAccount: VerifyAccountPayload;
};

export type MutationApplicantProfileUpdateArgs = {
  input: ApplicantProfileUpdateInput;
};

export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput;
};

export type MutationCreateJobPostArgs = {
  input: CreateJobPostInput;
};

export type MutationEditJobPostArgs = {
  input: EditJobPostInput;
};

export type MutationLogInArgs = {
  input: LoginInput;
};

export type MutationOfferApplicantArgs = {
  input: OfferApplicantInput;
};

export type MutationProfileUpdateArgs = {
  input: UpdateProfileInput;
};

export type MutationRespondInterviewArgs = {
  input: RespondInterviewInput;
};

export type MutationRespondToOfferArgs = {
  input: RespondOfferInput;
};

export type MutationSaveApplicantArgs = {
  input: SaveApplicantInput;
};

export type MutationSaveJobPostArgs = {
  input: SaveJobPostInput;
};

export type MutationSendInterviewRequestArgs = {
  input: SendInterviewRequestInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationSignUpOAuthArgs = {
  input: OAuthSignUpInput;
};

export type MutationVerifyAccountArgs = {
  input: VerifyAccountInput;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID']['output'];
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

export type OAuthAccountFilterInput = {
  provider?: InputMaybe<Scalars['String']['input']>;
};

export type OAuthAccountInput = {
  accountType: AccountType;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type OAuthInput = {
  accessToken: Scalars['String']['input'];
  expires: Scalars['DateTime']['input'];
  provider: Scalars['String']['input'];
  providerAccountId: Scalars['String']['input'];
  refreshToken?: InputMaybe<Scalars['String']['input']>;
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

export type Offer = Node & {
  answerText: Maybe<Scalars['String']['output']>;
  answerVideo: Maybe<Scalars['String']['output']>;
  applicantId: Scalars['String']['output'];
  companyId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deadline: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  jobApplicationId: Maybe<Scalars['String']['output']>;
  jobPostId: Scalars['String']['output'];
  status: Maybe<OfferStatus>;
  updatedAt: Scalars['DateTime']['output'];
};

export type OfferApplicantInput = {
  applicantId: Scalars['String']['input'];
  applicationId: Scalars['String']['input'];
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
};

export enum OfferStatus {
  Accepted = 'ACCEPTED',
  ApplicantRefused = 'APPLICANT_REFUSED',
  Pending = 'PENDING',
}

export enum OrderDirection {
  /** Specifies an ascending sort order. */
  Asc = 'ASC',
  /** Specifies a descending sort order. */
  Desc = 'DESC',
}

export type PageInfo = {
  endCursor: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Maybe<Scalars['String']['output']>;
};

export type PayloadError = {
  errors: Array<Error>;
};

export type Query = {
  findAccount: Maybe<FindOnePayload>;
  getApplicant: Maybe<Applicant>;
  getApplicants: Maybe<ApplicantConnection>;
  getCompanies: Array<Company>;
  getCompanyJobPosts: CompanyJobPostsResponse;
  getJobApplication: Maybe<Application>;
  getJobApplications: ApplicationConnections;
  getJobPost: Maybe<JobPost>;
  getJobPosts: Array<JobPost>;
  getSavedApplicant: Array<Applicant>;
  getSavedJobPosts: Array<JobPost>;
  me: Maybe<AccountPayload>;
  sayHi: Maybe<Scalars['String']['output']>;
};

export type QueryFindAccountArgs = {
  input: FindAccountFilterInput;
};

export type QueryGetApplicantArgs = {
  input: GetApplicantInput;
};

export type QueryGetApplicantsArgs = {
  input: GetApplicantsInput;
};

export type QueryGetCompanyJobPostsArgs = {
  input: GetCompanyJobPostsInput;
};

export type QueryGetJobApplicationArgs = {
  input: GetApplicationFilter;
};

export type QueryGetJobApplicationsArgs = {
  input: GetJobApplicationsInput;
};

export type QueryGetJobPostArgs = {
  input: GetJobPostInput;
};

export type QueryGetJobPostsArgs = {
  input?: InputMaybe<JopPostFilterInput>;
};

export type QueryGetSavedApplicantArgs = {
  input: GetSavedApplicantInput;
};

export type QueryGetSavedJobPostsArgs = {
  input: SavedJobPostsInput;
};

export type QuerySayHiArgs = {
  input?: InputMaybe<Scalars['String']['input']>;
};

export type RespondInterviewInput = {
  applicantId: Scalars['String']['input'];
  interviewId: Scalars['String']['input'];
  interviewVideoUrl?: InputMaybe<Scalars['String']['input']>;
  refuse?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RespondOfferInput = {
  applicantId: Scalars['String']['input'];
  applicationId: Scalars['String']['input'];
  offerId: Scalars['String']['input'];
  refuse?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum SalaryType {
  Hourly = 'HOURLY',
  Monthly = 'MONTHLY',
  OneTime = 'ONE_TIME',
  Yearly = 'YEARLY',
}

export type SaveApplicantInput = {
  applicantId: Scalars['String']['input'];
  companyId: Scalars['String']['input'];
  save: Scalars['Boolean']['input'];
};

export type SaveJobPostInput = {
  accountId: Scalars['String']['input'];
  jobPostId: Scalars['String']['input'];
  save: Scalars['Boolean']['input'];
};

export type SavedJobPostsInput = {
  accountId: Scalars['String']['input'];
};

export type SendInterviewRequestInput = {
  applicationId: Scalars['String']['input'];
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
};

export type SignUpInput = {
  accountType: AccountType;
  companyName?: InputMaybe<Scalars['String']['input']>;
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type UpdateProfileInput = {
  account?: InputMaybe<AccountUpdateInput>;
  accountId: Scalars['String']['input'];
  applicant?: InputMaybe<ApplicantUpdateInput>;
};

export type VerifyAccountInput = {
  token: Scalars['String']['input'];
};

export type VerifyAccountPayload = PayloadError & {
  account: Maybe<Account>;
  errors: Array<Error>;
};

export type WorkExperience = {
  accomplishment: Scalars['String']['output'];
  companyName: Scalars['String']['output'];
  companyWebsite: Maybe<Scalars['String']['output']>;
  endDate: Maybe<Scalars['DateTime']['output']>;
  ongoing: Scalars['Boolean']['output'];
  position: Scalars['String']['output'];
  skills: Array<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
};

export type WorkExperienceInput = {
  accomplishment: Scalars['String']['input'];
  companyName: Scalars['String']['input'];
  companyWebsite?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  ongoing: Scalars['Boolean']['input'];
  position: Scalars['String']['input'];
  skills: Array<Scalars['String']['input']>;
  startDate: Scalars['DateTime']['input'];
};

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;

export type UpdateProfileMutation = {
  profileUpdate: {
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
        education: string | null;
        languages: Array<string | null> | null;
        gender: string | null;
        resume: string | null;
        introVideo: string | null;
        github: string | null;
        linkedin: string | null;
        portfolio: string | null;
        workExperience: Array<{
          companyName: string;
          position: string;
          startDate: any;
          endDate: any | null;
          accomplishment: string;
          companyWebsite: string | null;
          skills: Array<string>;
          ongoing: boolean;
        }>;
        savedJobs: {
          edges: Array<{
            cursor: string;
            node: {
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
              companyId: string;
              createdAt: any;
              updatedAt: any;
            };
          }>;
          pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            endCursor: string | null;
            startCursor: string | null;
          };
        } | null;
        account: {
          id: string;
          email: string;
          emailVerified: any | null;
          accountType: AccountType;
          image: string;
          firstName: string;
          fullName: string;
          lastName: string;
          createdAt: any;
          phone: string | null;
        };
      } | null;
      company: {
        id: string;
        companyName: string | null;
        logo: string | null;
        savedApplicants: Array<{ id: string }>;
      } | null;
      oAuthClient: Array<{ id: string; provider: string }>;
      affiliate: { id: string } | null;
    } | null;
  };
};

export type SendEmailMutationVariables = Exact<{ [key: string]: never }>;

export type SendEmailMutation = { sendEmail: boolean | null };

export type AccountFragmentFragment = {
  id: string;
  email: string;
  emailVerified: any | null;
  accountType: AccountType;
  image: string;
  firstName: string;
  fullName: string;
  lastName: string;
  createdAt: any;
  phone: string | null;
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
    education: string | null;
    languages: Array<string | null> | null;
    gender: string | null;
    resume: string | null;
    introVideo: string | null;
    github: string | null;
    linkedin: string | null;
    portfolio: string | null;
    workExperience: Array<{
      companyName: string;
      position: string;
      startDate: any;
      endDate: any | null;
      accomplishment: string;
      companyWebsite: string | null;
      skills: Array<string>;
      ongoing: boolean;
    }>;
    savedJobs: {
      edges: Array<{
        cursor: string;
        node: {
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
          companyId: string;
          createdAt: any;
          updatedAt: any;
        };
      }>;
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        endCursor: string | null;
        startCursor: string | null;
      };
    } | null;
    account: {
      id: string;
      email: string;
      emailVerified: any | null;
      accountType: AccountType;
      image: string;
      firstName: string;
      fullName: string;
      lastName: string;
      createdAt: any;
      phone: string | null;
    };
  } | null;
  company: {
    id: string;
    companyName: string | null;
    logo: string | null;
    savedApplicants: Array<{ id: string }>;
  } | null;
  oAuthClient: Array<{ id: string; provider: string }>;
  affiliate: { id: string } | null;
};

export type FindAccountQueryVariables = Exact<{
  input: FindAccountFilterInput;
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
        education: string | null;
        languages: Array<string | null> | null;
        gender: string | null;
        resume: string | null;
        introVideo: string | null;
        github: string | null;
        linkedin: string | null;
        portfolio: string | null;
        workExperience: Array<{
          companyName: string;
          position: string;
          startDate: any;
          endDate: any | null;
          accomplishment: string;
          companyWebsite: string | null;
          skills: Array<string>;
          ongoing: boolean;
        }>;
        savedJobs: {
          edges: Array<{
            cursor: string;
            node: {
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
              companyId: string;
              createdAt: any;
              updatedAt: any;
            };
          }>;
          pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            endCursor: string | null;
            startCursor: string | null;
          };
        } | null;
        account: {
          id: string;
          email: string;
          emailVerified: any | null;
          accountType: AccountType;
          image: string;
          firstName: string;
          fullName: string;
          lastName: string;
          createdAt: any;
          phone: string | null;
        };
      } | null;
      company: {
        id: string;
        companyName: string | null;
        logo: string | null;
        savedApplicants: Array<{ id: string }>;
      } | null;
      oAuthClient: Array<{ id: string; provider: string }>;
      affiliate: { id: string } | null;
    } | null;
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

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
      education: string | null;
      languages: Array<string | null> | null;
      gender: string | null;
      resume: string | null;
      introVideo: string | null;
      github: string | null;
      linkedin: string | null;
      portfolio: string | null;
      workExperience: Array<{
        companyName: string;
        position: string;
        startDate: any;
        endDate: any | null;
        accomplishment: string;
        companyWebsite: string | null;
        skills: Array<string>;
        ongoing: boolean;
      }>;
      savedJobs: {
        edges: Array<{
          cursor: string;
          node: {
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
            companyId: string;
            createdAt: any;
            updatedAt: any;
          };
        }>;
        pageInfo: {
          hasNextPage: boolean;
          hasPreviousPage: boolean;
          endCursor: string | null;
          startCursor: string | null;
        };
      } | null;
      account: {
        id: string;
        email: string;
        emailVerified: any | null;
        accountType: AccountType;
        image: string;
        firstName: string;
        fullName: string;
        lastName: string;
        createdAt: any;
        phone: string | null;
      };
    } | null;
    company: {
      id: string;
      companyName: string | null;
      logo: string | null;
      savedApplicants: Array<{ id: string }>;
    } | null;
    oAuthClient: Array<{ id: string; provider: string }>;
    affiliate: { id: string } | null;
  } | null;
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
    companyId: string;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export type RespondToInterviewMutationVariables = Exact<{
  input: RespondInterviewInput;
}>;

export type RespondToInterviewMutation = {
  respondInterview: {
    id: string;
    companyId: string;
    jobPostId: string;
    applicantId: string;
    jobApplicationId: string | null;
    attachment: string | null;
    answerVideo: string | null;
    answerText: string | null;
    status: InterviewStatus | null;
    description: string;
    deadline: any | null;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export type RespondToOfferMutationVariables = Exact<{
  input: RespondOfferInput;
}>;

export type RespondToOfferMutation = {
  respondToOffer: {
    id: string;
    companyId: string;
    jobPostId: string;
    applicantId: string;
    jobApplicationId: string | null;
    answerVideo: string | null;
    answerText: string | null;
    status: OfferStatus | null;
    description: string;
    deadline: any | null;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export type CreateJobApplicationMutationVariables = Exact<{
  input: CreateApplicationInput;
}>;

export type CreateJobApplicationMutation = {
  createApplication: {
    errors: Array<{ message: string }>;
    application: {
      id: string;
      applicantId: string;
      jobPostId: string;
      createdAt: any;
    } | null;
  };
};

export type ApplicantLightFragment = {
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
};

export type ApplicantFragmentFragment = {
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
  education: string | null;
  languages: Array<string | null> | null;
  gender: string | null;
  resume: string | null;
  introVideo: string | null;
  github: string | null;
  linkedin: string | null;
  portfolio: string | null;
  workExperience: Array<{
    companyName: string;
    position: string;
    startDate: any;
    endDate: any | null;
    accomplishment: string;
    companyWebsite: string | null;
    skills: Array<string>;
    ongoing: boolean;
  }>;
  savedJobs: {
    edges: Array<{
      cursor: string;
      node: {
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
        companyId: string;
        createdAt: any;
        updatedAt: any;
      };
    }>;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      endCursor: string | null;
      startCursor: string | null;
    };
  } | null;
  account: {
    id: string;
    email: string;
    emailVerified: any | null;
    accountType: AccountType;
    image: string;
    firstName: string;
    fullName: string;
    lastName: string;
    createdAt: any;
    phone: string | null;
  };
};

export type InterviewFragmentFragment = {
  id: string;
  companyId: string;
  jobPostId: string;
  applicantId: string;
  jobApplicationId: string | null;
  attachment: string | null;
  answerVideo: string | null;
  answerText: string | null;
  status: InterviewStatus | null;
  description: string;
  deadline: any | null;
  createdAt: any;
  updatedAt: any;
};

export type OfferFragmentFragment = {
  id: string;
  companyId: string;
  jobPostId: string;
  applicantId: string;
  jobApplicationId: string | null;
  answerVideo: string | null;
  answerText: string | null;
  status: OfferStatus | null;
  description: string;
  deadline: any | null;
  createdAt: any;
  updatedAt: any;
};

export type ApplicationFragmentFragment = {
  id: string;
  createdAt: any;
  updatedAt: any;
  status: ApplicationStatus;
  resume: string;
  coverLetter: string;
  applicantId: string;
  jobPostId: string;
  attachment: string | null;
  email: string;
  phone: string;
  jobPost: {
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
    companyId: string;
    createdAt: any;
    updatedAt: any;
  } | null;
  interview: {
    id: string;
    companyId: string;
    jobPostId: string;
    applicantId: string;
    jobApplicationId: string | null;
    attachment: string | null;
    answerVideo: string | null;
    answerText: string | null;
    status: InterviewStatus | null;
    description: string;
    deadline: any | null;
    createdAt: any;
    updatedAt: any;
  } | null;
  offer: {
    id: string;
    companyId: string;
    jobPostId: string;
    applicantId: string;
    jobApplicationId: string | null;
    answerVideo: string | null;
    answerText: string | null;
    status: OfferStatus | null;
    description: string;
    deadline: any | null;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export type GetApplicantsQueryVariables = Exact<{
  input: GetApplicantsInput;
}>;

export type GetApplicantsQuery = {
  getApplicants: {
    edges: Array<{
      node: {
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
        account: {
          id: string;
          email: string;
          emailVerified: any | null;
          accountType: AccountType;
          image: string;
          firstName: string;
          fullName: string;
          lastName: string;
          createdAt: any;
          phone: string | null;
        };
      };
    }>;
  } | null;
};

export type GetApplicantQueryVariables = Exact<{
  input: GetApplicantInput;
}>;

export type GetApplicantQuery = {
  getApplicant: {
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
      endDate: any | null;
      accomplishment: string;
      companyWebsite: string | null;
      skills: Array<string>;
      ongoing: boolean;
    }>;
    savedJobs: {
      edges: Array<{
        node: {
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
          companyId: string;
          createdAt: any;
          updatedAt: any;
        };
      }>;
    } | null;
    account: {
      id: string;
      email: string;
      emailVerified: any | null;
      accountType: AccountType;
      image: string;
      firstName: string;
      fullName: string;
      lastName: string;
      createdAt: any;
      phone: string | null;
    };
  } | null;
};

export type GetJobApplicationsQueryVariables = Exact<{
  input: GetJobApplicationsInput;
  includeCompany?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type GetJobApplicationsQuery = {
  getJobApplications: {
    edges: Array<{
      node: {
        id: string;
        createdAt: any;
        updatedAt: any;
        status: ApplicationStatus;
        resume: string;
        coverLetter: string;
        applicantId: string;
        jobPostId: string;
        attachment: string | null;
        email: string;
        phone: string;
        company?: {
          id: string;
          companyName: string | null;
          logo: string | null;
        } | null;
        jobPost: {
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
          companyId: string;
          createdAt: any;
          updatedAt: any;
        } | null;
        interview: {
          id: string;
          companyId: string;
          jobPostId: string;
          applicantId: string;
          jobApplicationId: string | null;
          attachment: string | null;
          answerVideo: string | null;
          answerText: string | null;
          status: InterviewStatus | null;
          description: string;
          deadline: any | null;
          createdAt: any;
          updatedAt: any;
        } | null;
        offer: {
          id: string;
          companyId: string;
          jobPostId: string;
          applicantId: string;
          jobApplicationId: string | null;
          answerVideo: string | null;
          answerText: string | null;
          status: OfferStatus | null;
          description: string;
          deadline: any | null;
          createdAt: any;
          updatedAt: any;
        } | null;
      };
    }>;
  };
};

export type AuthAccountFragmentFragment = {
  id: string;
  email: string;
  accountType: AccountType;
  image: string | null;
  firstName: string;
  lastName: string;
  createdAt: any;
  phone: string | null;
  emailVerified: any | null;
  oAuthClient: Array<{
    id: string;
    provider: string;
    accessToken: string;
    expires: any;
    providerAccountId: string;
    tokenType: string;
    refreshToken: string | null;
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
      phone: string | null;
      emailVerified: any | null;
      oAuthClient: Array<{
        id: string;
        provider: string;
        accessToken: string;
        expires: any;
        providerAccountId: string;
        tokenType: string;
        refreshToken: string | null;
      }>;
    } | null;
  };
};

export type LogOutMutationVariables = Exact<{ [key: string]: never }>;

export type LogOutMutation = { logOut: boolean };

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
      phone: string | null;
      emailVerified: any | null;
      oAuthClient: Array<{
        id: string;
        provider: string;
        accessToken: string;
        expires: any;
        providerAccountId: string;
        tokenType: string;
        refreshToken: string | null;
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
      phone: string | null;
      emailVerified: any | null;
      oAuthClient: Array<{
        id: string;
        provider: string;
        accessToken: string;
        expires: any;
        providerAccountId: string;
        tokenType: string;
        refreshToken: string | null;
      }>;
    } | null;
  };
};

export type VerifyAccountMutationVariables = Exact<{
  input: VerifyAccountInput;
}>;

export type VerifyAccountMutation = {
  verifyAccount: {
    errors: Array<{ message: string }>;
    account: {
      id: string;
      email: string;
      emailVerified: any | null;
      accountType: AccountType;
      image: string;
      firstName: string;
      fullName: string;
      lastName: string;
      createdAt: any;
      phone: string | null;
    } | null;
  };
};

export type SaveApplicantMutationVariables = Exact<{
  input: SaveApplicantInput;
}>;

export type SaveApplicantMutation = { saveApplicant: boolean | null };

export type SendInterviewRequestMutationVariables = Exact<{
  input: SendInterviewRequestInput;
}>;

export type SendInterviewRequestMutation = {
  sendInterviewRequest: {
    id: string;
    companyId: string;
    jobPostId: string;
    applicantId: string;
    jobApplicationId: string | null;
    attachment: string | null;
    answerVideo: string | null;
    answerText: string | null;
    status: InterviewStatus | null;
    description: string;
    deadline: any | null;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export type SendAnOfferMutationVariables = Exact<{
  input: OfferApplicantInput;
}>;

export type SendAnOfferMutation = {
  offerApplicant: {
    id: string;
    companyId: string;
    jobPostId: string;
    applicantId: string;
    jobApplicationId: string | null;
    answerVideo: string | null;
    answerText: string | null;
    status: OfferStatus | null;
    description: string;
    deadline: any | null;
    createdAt: any;
    updatedAt: any;
  } | null;
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

export type EditJobPostMutationVariables = Exact<{
  input: EditJobPostInput;
}>;

export type EditJobPostMutation = {
  editJobPost: {
    errors: Array<{ message: string }>;
    jobPost: { id: string } | null;
  };
};

export type GetCompaniesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCompaniesQuery = {
  getCompanies: Array<{
    id: string;
    companyName: string | null;
    logo: string | null;
  }>;
};

export type GetSavedApplicantsQueryVariables = Exact<{
  input: GetSavedApplicantInput;
  skipSavedJobs?: InputMaybe<Scalars['Boolean']['input']>;
  skipWorkExperience?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type GetSavedApplicantsQuery = {
  getSavedApplicant: Array<{
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
    education: string | null;
    languages: Array<string | null> | null;
    gender: string | null;
    resume: string | null;
    introVideo: string | null;
    github: string | null;
    linkedin: string | null;
    portfolio: string | null;
    savedJobs?: {
      edges: Array<{
        cursor: string;
        node: {
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
          companyId: string;
          createdAt: any;
          updatedAt: any;
        };
      }>;
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        endCursor: string | null;
        startCursor: string | null;
      };
    } | null;
    workExperience?: Array<{
      companyWebsite: string | null;
      companyName: string;
      position: string;
      startDate: any;
      endDate: any | null;
      accomplishment: string;
      skills: Array<string>;
      ongoing: boolean;
    }>;
    account: {
      id: string;
      email: string;
      emailVerified: any | null;
      accountType: AccountType;
      image: string;
      firstName: string;
      fullName: string;
      lastName: string;
      createdAt: any;
      phone: string | null;
    };
  }>;
};

export type GetCompanyJobPostsQueryVariables = Exact<{
  input: GetCompanyJobPostsInput;
}>;

export type GetCompanyJobPostsQuery = {
  getCompanyJobPosts: {
    errors: Array<{ message: string }>;
    jobPosts: Array<{
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
      companyId: string;
      createdAt: any;
      updatedAt: any;
    }>;
  };
};

export type GetCompanyJobApplicationsQueryVariables = Exact<{
  input: GetJobApplicationsInput;
}>;

export type GetCompanyJobApplicationsQuery = {
  getJobApplications: {
    edges: Array<{
      node: {
        id: string;
        createdAt: any;
        updatedAt: any;
        status: ApplicationStatus;
        resume: string;
        coverLetter: string;
        applicantId: string;
        jobPostId: string;
        attachment: string | null;
        email: string;
        phone: string;
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
          education: string | null;
          languages: Array<string | null> | null;
          gender: string | null;
          resume: string | null;
          introVideo: string | null;
          github: string | null;
          linkedin: string | null;
          portfolio: string | null;
          workExperience: Array<{
            companyName: string;
            position: string;
            startDate: any;
            endDate: any | null;
            accomplishment: string;
            companyWebsite: string | null;
            skills: Array<string>;
            ongoing: boolean;
          }>;
          savedJobs: {
            edges: Array<{
              cursor: string;
              node: {
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
                companyId: string;
                createdAt: any;
                updatedAt: any;
              };
            }>;
            pageInfo: {
              hasNextPage: boolean;
              hasPreviousPage: boolean;
              endCursor: string | null;
              startCursor: string | null;
            };
          } | null;
          account: {
            id: string;
            email: string;
            emailVerified: any | null;
            accountType: AccountType;
            image: string;
            firstName: string;
            fullName: string;
            lastName: string;
            createdAt: any;
            phone: string | null;
          };
        } | null;
        jobPost: {
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
          companyId: string;
          createdAt: any;
          updatedAt: any;
        } | null;
        interview: {
          id: string;
          companyId: string;
          jobPostId: string;
          applicantId: string;
          jobApplicationId: string | null;
          attachment: string | null;
          answerVideo: string | null;
          answerText: string | null;
          status: InterviewStatus | null;
          description: string;
          deadline: any | null;
          createdAt: any;
          updatedAt: any;
        } | null;
        offer: {
          id: string;
          companyId: string;
          jobPostId: string;
          applicantId: string;
          jobApplicationId: string | null;
          answerVideo: string | null;
          answerText: string | null;
          status: OfferStatus | null;
          description: string;
          deadline: any | null;
          createdAt: any;
          updatedAt: any;
        } | null;
      };
    }>;
  };
};

export type JopPostFragmentFragment = {
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
  companyId: string;
  createdAt: any;
  updatedAt: any;
};

export type GetJobPostsQueryVariables = Exact<{
  input?: InputMaybe<JopPostFilterInput>;
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
    companyId: string;
    createdAt: any;
    updatedAt: any;
  }>;
};

export type GetJobPostQueryVariables = Exact<{
  input: GetJobPostInput;
}>;

export type GetJobPostQuery = {
  getJobPost: {
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
    companyId: string;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export const JopPostFragmentFragmentDoc = gql`
  fragment JopPostFragment on JobPost {
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
    companyId
    createdAt
    updatedAt
  }
`;
export const AccountFragmentFragmentDoc = gql`
  fragment AccountFragment on Account {
    id
    email
    emailVerified
    accountType
    image
    firstName
    fullName
    lastName
    createdAt
    phone
  }
`;
export const ApplicantFragmentFragmentDoc = gql`
  fragment ApplicantFragment on Applicant {
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
    education
    languages
    gender
    resume
    introVideo
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
      ongoing
    }
    savedJobs {
      edges {
        cursor
        node {
          ...JopPostFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
    account {
      ...AccountFragment
    }
  }
  ${JopPostFragmentFragmentDoc}
  ${AccountFragmentFragmentDoc}
`;
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
      ...ApplicantFragment
    }
    company {
      id
      companyName
      logo
      savedApplicants {
        id
      }
    }
    oAuthClient {
      id
      provider
    }
    affiliate {
      id
    }
  }
  ${ApplicantFragmentFragmentDoc}
`;
export const ApplicantLightFragmentDoc = gql`
  fragment ApplicantLight on Applicant {
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
`;
export const InterviewFragmentFragmentDoc = gql`
  fragment InterviewFragment on Interview {
    id
    companyId
    jobPostId
    applicantId
    jobApplicationId
    attachment
    answerVideo
    answerText
    status
    description
    deadline
    createdAt
    updatedAt
  }
`;
export const OfferFragmentFragmentDoc = gql`
  fragment OfferFragment on Offer {
    id
    companyId
    jobPostId
    applicantId
    jobApplicationId
    answerVideo
    answerText
    status
    description
    deadline
    createdAt
    updatedAt
  }
`;
export const ApplicationFragmentFragmentDoc = gql`
  fragment ApplicationFragment on Application {
    id
    createdAt
    updatedAt
    status
    resume
    coverLetter
    applicantId
    jobPostId
    attachment
    email
    phone
    jobPost {
      ...JopPostFragment
    }
    interview {
      ...InterviewFragment
    }
    offer {
      ...OfferFragment
    }
  }
  ${JopPostFragmentFragmentDoc}
  ${InterviewFragmentFragmentDoc}
  ${OfferFragmentFragmentDoc}
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
    phone
    emailVerified
    oAuthClient {
      id
      provider
      accessToken
      expires
      providerAccountId
      tokenType
      refreshToken
    }
  }
`;
export const UpdateProfileDocument = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    profileUpdate(input: $input) {
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
export const SendEmailDocument = gql`
  mutation SendEmail {
    sendEmail
  }
`;
export type SendEmailMutationFn = Apollo.MutationFunction<
  SendEmailMutation,
  SendEmailMutationVariables
>;

/**
 * __useSendEmailMutation__
 *
 * To run a mutation, you first call `useSendEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendEmailMutation, { data, loading, error }] = useSendEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useSendEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendEmailMutation,
    SendEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendEmailMutation, SendEmailMutationVariables>(
    SendEmailDocument,
    options,
  );
}
export type SendEmailMutationHookResult = ReturnType<
  typeof useSendEmailMutation
>;
export type SendEmailMutationResult = Apollo.MutationResult<SendEmailMutation>;
export type SendEmailMutationOptions = Apollo.BaseMutationOptions<
  SendEmailMutation,
  SendEmailMutationVariables
>;
export const FindAccountDocument = gql`
  query FindAccount($input: FindAccountFilterInput!) {
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
  query Me {
    me {
      ...AccountPayloadFragment
    }
  }
  ${AccountPayloadFragmentFragmentDoc}
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
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
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
export const SaveJobPostDocument = gql`
  mutation SaveJobPost($input: SaveJobPostInput!) {
    saveJobPost(input: $input) {
      ...JopPostFragment
    }
  }
  ${JopPostFragmentFragmentDoc}
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
export const RespondToInterviewDocument = gql`
  mutation RespondToInterview($input: RespondInterviewInput!) {
    respondInterview(input: $input) {
      ...InterviewFragment
    }
  }
  ${InterviewFragmentFragmentDoc}
`;
export type RespondToInterviewMutationFn = Apollo.MutationFunction<
  RespondToInterviewMutation,
  RespondToInterviewMutationVariables
>;

/**
 * __useRespondToInterviewMutation__
 *
 * To run a mutation, you first call `useRespondToInterviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRespondToInterviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [respondToInterviewMutation, { data, loading, error }] = useRespondToInterviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRespondToInterviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RespondToInterviewMutation,
    RespondToInterviewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RespondToInterviewMutation,
    RespondToInterviewMutationVariables
  >(RespondToInterviewDocument, options);
}
export type RespondToInterviewMutationHookResult = ReturnType<
  typeof useRespondToInterviewMutation
>;
export type RespondToInterviewMutationResult =
  Apollo.MutationResult<RespondToInterviewMutation>;
export type RespondToInterviewMutationOptions = Apollo.BaseMutationOptions<
  RespondToInterviewMutation,
  RespondToInterviewMutationVariables
>;
export const RespondToOfferDocument = gql`
  mutation RespondToOffer($input: RespondOfferInput!) {
    respondToOffer(input: $input) {
      ...OfferFragment
    }
  }
  ${OfferFragmentFragmentDoc}
`;
export type RespondToOfferMutationFn = Apollo.MutationFunction<
  RespondToOfferMutation,
  RespondToOfferMutationVariables
>;

/**
 * __useRespondToOfferMutation__
 *
 * To run a mutation, you first call `useRespondToOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRespondToOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [respondToOfferMutation, { data, loading, error }] = useRespondToOfferMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRespondToOfferMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RespondToOfferMutation,
    RespondToOfferMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RespondToOfferMutation,
    RespondToOfferMutationVariables
  >(RespondToOfferDocument, options);
}
export type RespondToOfferMutationHookResult = ReturnType<
  typeof useRespondToOfferMutation
>;
export type RespondToOfferMutationResult =
  Apollo.MutationResult<RespondToOfferMutation>;
export type RespondToOfferMutationOptions = Apollo.BaseMutationOptions<
  RespondToOfferMutation,
  RespondToOfferMutationVariables
>;
export const CreateJobApplicationDocument = gql`
  mutation CreateJobApplication($input: CreateApplicationInput!) {
    createApplication(input: $input) {
      errors {
        message
      }
      application {
        id
        applicantId
        jobPostId
        createdAt
      }
    }
  }
`;
export type CreateJobApplicationMutationFn = Apollo.MutationFunction<
  CreateJobApplicationMutation,
  CreateJobApplicationMutationVariables
>;

/**
 * __useCreateJobApplicationMutation__
 *
 * To run a mutation, you first call `useCreateJobApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJobApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJobApplicationMutation, { data, loading, error }] = useCreateJobApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateJobApplicationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateJobApplicationMutation,
    CreateJobApplicationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateJobApplicationMutation,
    CreateJobApplicationMutationVariables
  >(CreateJobApplicationDocument, options);
}
export type CreateJobApplicationMutationHookResult = ReturnType<
  typeof useCreateJobApplicationMutation
>;
export type CreateJobApplicationMutationResult =
  Apollo.MutationResult<CreateJobApplicationMutation>;
export type CreateJobApplicationMutationOptions = Apollo.BaseMutationOptions<
  CreateJobApplicationMutation,
  CreateJobApplicationMutationVariables
>;
export const GetApplicantsDocument = gql`
  query GetApplicants($input: GetApplicantsInput!) {
    getApplicants(input: $input) {
      edges {
        node {
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
          account {
            ...AccountFragment
          }
        }
      }
    }
  }
  ${AccountFragmentFragmentDoc}
`;

/**
 * __useGetApplicantsQuery__
 *
 * To run a query within a React component, call `useGetApplicantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApplicantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApplicantsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetApplicantsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetApplicantsQuery,
    GetApplicantsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetApplicantsQuery, GetApplicantsQueryVariables>(
    GetApplicantsDocument,
    options,
  );
}
export function useGetApplicantsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetApplicantsQuery,
    GetApplicantsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetApplicantsQuery, GetApplicantsQueryVariables>(
    GetApplicantsDocument,
    options,
  );
}
export type GetApplicantsQueryHookResult = ReturnType<
  typeof useGetApplicantsQuery
>;
export type GetApplicantsLazyQueryHookResult = ReturnType<
  typeof useGetApplicantsLazyQuery
>;
export type GetApplicantsQueryResult = Apollo.QueryResult<
  GetApplicantsQuery,
  GetApplicantsQueryVariables
>;
export const GetApplicantDocument = gql`
  query GetApplicant($input: GetApplicantInput!) {
    getApplicant(input: $input) {
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
        ongoing
        __typename
      }
      savedJobs {
        edges {
          node {
            ...JopPostFragment
          }
        }
      }
      account {
        ...AccountFragment
      }
    }
  }
  ${JopPostFragmentFragmentDoc}
  ${AccountFragmentFragmentDoc}
`;

/**
 * __useGetApplicantQuery__
 *
 * To run a query within a React component, call `useGetApplicantQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApplicantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApplicantQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetApplicantQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetApplicantQuery,
    GetApplicantQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetApplicantQuery, GetApplicantQueryVariables>(
    GetApplicantDocument,
    options,
  );
}
export function useGetApplicantLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetApplicantQuery,
    GetApplicantQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetApplicantQuery, GetApplicantQueryVariables>(
    GetApplicantDocument,
    options,
  );
}
export type GetApplicantQueryHookResult = ReturnType<
  typeof useGetApplicantQuery
>;
export type GetApplicantLazyQueryHookResult = ReturnType<
  typeof useGetApplicantLazyQuery
>;
export type GetApplicantQueryResult = Apollo.QueryResult<
  GetApplicantQuery,
  GetApplicantQueryVariables
>;
export const GetJobApplicationsDocument = gql`
  query GetJobApplications(
    $input: GetJobApplicationsInput!
    $includeCompany: Boolean = false
  ) {
    getJobApplications(input: $input) {
      edges {
        node {
          ...ApplicationFragment
          company @include(if: $includeCompany) {
            id
            companyName
            logo
          }
        }
      }
    }
  }
  ${ApplicationFragmentFragmentDoc}
`;

/**
 * __useGetJobApplicationsQuery__
 *
 * To run a query within a React component, call `useGetJobApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobApplicationsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      includeCompany: // value for 'includeCompany'
 *   },
 * });
 */
export function useGetJobApplicationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetJobApplicationsQuery,
    GetJobApplicationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetJobApplicationsQuery,
    GetJobApplicationsQueryVariables
  >(GetJobApplicationsDocument, options);
}
export function useGetJobApplicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetJobApplicationsQuery,
    GetJobApplicationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetJobApplicationsQuery,
    GetJobApplicationsQueryVariables
  >(GetJobApplicationsDocument, options);
}
export type GetJobApplicationsQueryHookResult = ReturnType<
  typeof useGetJobApplicationsQuery
>;
export type GetJobApplicationsLazyQueryHookResult = ReturnType<
  typeof useGetJobApplicationsLazyQuery
>;
export type GetJobApplicationsQueryResult = Apollo.QueryResult<
  GetJobApplicationsQuery,
  GetJobApplicationsQueryVariables
>;
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
export const LogOutDocument = gql`
  mutation LogOut {
    logOut
  }
`;
export type LogOutMutationFn = Apollo.MutationFunction<
  LogOutMutation,
  LogOutMutationVariables
>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogOutMutation,
    LogOutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(
    LogOutDocument,
    options,
  );
}
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<
  LogOutMutation,
  LogOutMutationVariables
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
export const VerifyAccountDocument = gql`
  mutation VerifyAccount($input: VerifyAccountInput!) {
    verifyAccount(input: $input) {
      errors {
        message
      }
      account {
        ...AccountFragment
      }
    }
  }
  ${AccountFragmentFragmentDoc}
`;
export type VerifyAccountMutationFn = Apollo.MutationFunction<
  VerifyAccountMutation,
  VerifyAccountMutationVariables
>;

/**
 * __useVerifyAccountMutation__
 *
 * To run a mutation, you first call `useVerifyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAccountMutation, { data, loading, error }] = useVerifyAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerifyAccountMutation,
    VerifyAccountMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    VerifyAccountMutation,
    VerifyAccountMutationVariables
  >(VerifyAccountDocument, options);
}
export type VerifyAccountMutationHookResult = ReturnType<
  typeof useVerifyAccountMutation
>;
export type VerifyAccountMutationResult =
  Apollo.MutationResult<VerifyAccountMutation>;
export type VerifyAccountMutationOptions = Apollo.BaseMutationOptions<
  VerifyAccountMutation,
  VerifyAccountMutationVariables
>;
export const SaveApplicantDocument = gql`
  mutation SaveApplicant($input: SaveApplicantInput!) {
    saveApplicant(input: $input)
  }
`;
export type SaveApplicantMutationFn = Apollo.MutationFunction<
  SaveApplicantMutation,
  SaveApplicantMutationVariables
>;

/**
 * __useSaveApplicantMutation__
 *
 * To run a mutation, you first call `useSaveApplicantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveApplicantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveApplicantMutation, { data, loading, error }] = useSaveApplicantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveApplicantMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveApplicantMutation,
    SaveApplicantMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SaveApplicantMutation,
    SaveApplicantMutationVariables
  >(SaveApplicantDocument, options);
}
export type SaveApplicantMutationHookResult = ReturnType<
  typeof useSaveApplicantMutation
>;
export type SaveApplicantMutationResult =
  Apollo.MutationResult<SaveApplicantMutation>;
export type SaveApplicantMutationOptions = Apollo.BaseMutationOptions<
  SaveApplicantMutation,
  SaveApplicantMutationVariables
>;
export const SendInterviewRequestDocument = gql`
  mutation SendInterviewRequest($input: SendInterviewRequestInput!) {
    sendInterviewRequest(input: $input) {
      ...InterviewFragment
    }
  }
  ${InterviewFragmentFragmentDoc}
`;
export type SendInterviewRequestMutationFn = Apollo.MutationFunction<
  SendInterviewRequestMutation,
  SendInterviewRequestMutationVariables
>;

/**
 * __useSendInterviewRequestMutation__
 *
 * To run a mutation, you first call `useSendInterviewRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendInterviewRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendInterviewRequestMutation, { data, loading, error }] = useSendInterviewRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendInterviewRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendInterviewRequestMutation,
    SendInterviewRequestMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SendInterviewRequestMutation,
    SendInterviewRequestMutationVariables
  >(SendInterviewRequestDocument, options);
}
export type SendInterviewRequestMutationHookResult = ReturnType<
  typeof useSendInterviewRequestMutation
>;
export type SendInterviewRequestMutationResult =
  Apollo.MutationResult<SendInterviewRequestMutation>;
export type SendInterviewRequestMutationOptions = Apollo.BaseMutationOptions<
  SendInterviewRequestMutation,
  SendInterviewRequestMutationVariables
>;
export const SendAnOfferDocument = gql`
  mutation SendAnOffer($input: OfferApplicantInput!) {
    offerApplicant(input: $input) {
      ...OfferFragment
    }
  }
  ${OfferFragmentFragmentDoc}
`;
export type SendAnOfferMutationFn = Apollo.MutationFunction<
  SendAnOfferMutation,
  SendAnOfferMutationVariables
>;

/**
 * __useSendAnOfferMutation__
 *
 * To run a mutation, you first call `useSendAnOfferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendAnOfferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendAnOfferMutation, { data, loading, error }] = useSendAnOfferMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendAnOfferMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendAnOfferMutation,
    SendAnOfferMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendAnOfferMutation, SendAnOfferMutationVariables>(
    SendAnOfferDocument,
    options,
  );
}
export type SendAnOfferMutationHookResult = ReturnType<
  typeof useSendAnOfferMutation
>;
export type SendAnOfferMutationResult =
  Apollo.MutationResult<SendAnOfferMutation>;
export type SendAnOfferMutationOptions = Apollo.BaseMutationOptions<
  SendAnOfferMutation,
  SendAnOfferMutationVariables
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
export const EditJobPostDocument = gql`
  mutation EditJobPost($input: EditJobPostInput!) {
    editJobPost(input: $input) {
      errors {
        message
      }
      jobPost {
        id
      }
    }
  }
`;
export type EditJobPostMutationFn = Apollo.MutationFunction<
  EditJobPostMutation,
  EditJobPostMutationVariables
>;

/**
 * __useEditJobPostMutation__
 *
 * To run a mutation, you first call `useEditJobPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditJobPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editJobPostMutation, { data, loading, error }] = useEditJobPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditJobPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditJobPostMutation,
    EditJobPostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditJobPostMutation, EditJobPostMutationVariables>(
    EditJobPostDocument,
    options,
  );
}
export type EditJobPostMutationHookResult = ReturnType<
  typeof useEditJobPostMutation
>;
export type EditJobPostMutationResult =
  Apollo.MutationResult<EditJobPostMutation>;
export type EditJobPostMutationOptions = Apollo.BaseMutationOptions<
  EditJobPostMutation,
  EditJobPostMutationVariables
>;
export const GetCompaniesDocument = gql`
  query GetCompanies {
    getCompanies {
      id
      companyName
      logo
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
export const GetSavedApplicantsDocument = gql`
  query GetSavedApplicants(
    $input: GetSavedApplicantInput!
    $skipSavedJobs: Boolean = true
    $skipWorkExperience: Boolean = true
  ) {
    getSavedApplicant(input: $input) {
      ...ApplicantFragment
      savedJobs @skip(if: $skipSavedJobs) {
        edges {
          node {
            id
          }
        }
      }
      workExperience @skip(if: $skipWorkExperience) {
        companyWebsite
      }
    }
  }
  ${ApplicantFragmentFragmentDoc}
`;

/**
 * __useGetSavedApplicantsQuery__
 *
 * To run a query within a React component, call `useGetSavedApplicantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSavedApplicantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSavedApplicantsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      skipSavedJobs: // value for 'skipSavedJobs'
 *      skipWorkExperience: // value for 'skipWorkExperience'
 *   },
 * });
 */
export function useGetSavedApplicantsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSavedApplicantsQuery,
    GetSavedApplicantsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSavedApplicantsQuery,
    GetSavedApplicantsQueryVariables
  >(GetSavedApplicantsDocument, options);
}
export function useGetSavedApplicantsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSavedApplicantsQuery,
    GetSavedApplicantsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSavedApplicantsQuery,
    GetSavedApplicantsQueryVariables
  >(GetSavedApplicantsDocument, options);
}
export type GetSavedApplicantsQueryHookResult = ReturnType<
  typeof useGetSavedApplicantsQuery
>;
export type GetSavedApplicantsLazyQueryHookResult = ReturnType<
  typeof useGetSavedApplicantsLazyQuery
>;
export type GetSavedApplicantsQueryResult = Apollo.QueryResult<
  GetSavedApplicantsQuery,
  GetSavedApplicantsQueryVariables
>;
export const GetCompanyJobPostsDocument = gql`
  query GetCompanyJobPosts($input: GetCompanyJobPostsInput!) {
    getCompanyJobPosts(input: $input) {
      errors {
        message
      }
      jobPosts {
        ...JopPostFragment
      }
    }
  }
  ${JopPostFragmentFragmentDoc}
`;

/**
 * __useGetCompanyJobPostsQuery__
 *
 * To run a query within a React component, call `useGetCompanyJobPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyJobPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyJobPostsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCompanyJobPostsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCompanyJobPostsQuery,
    GetCompanyJobPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCompanyJobPostsQuery,
    GetCompanyJobPostsQueryVariables
  >(GetCompanyJobPostsDocument, options);
}
export function useGetCompanyJobPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCompanyJobPostsQuery,
    GetCompanyJobPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCompanyJobPostsQuery,
    GetCompanyJobPostsQueryVariables
  >(GetCompanyJobPostsDocument, options);
}
export type GetCompanyJobPostsQueryHookResult = ReturnType<
  typeof useGetCompanyJobPostsQuery
>;
export type GetCompanyJobPostsLazyQueryHookResult = ReturnType<
  typeof useGetCompanyJobPostsLazyQuery
>;
export type GetCompanyJobPostsQueryResult = Apollo.QueryResult<
  GetCompanyJobPostsQuery,
  GetCompanyJobPostsQueryVariables
>;
export const GetCompanyJobApplicationsDocument = gql`
  query GetCompanyJobApplications($input: GetJobApplicationsInput!) {
    getJobApplications(input: $input) {
      edges {
        node {
          ...ApplicationFragment
          applicant {
            ...ApplicantFragment
          }
        }
      }
    }
  }
  ${ApplicationFragmentFragmentDoc}
  ${ApplicantFragmentFragmentDoc}
`;

/**
 * __useGetCompanyJobApplicationsQuery__
 *
 * To run a query within a React component, call `useGetCompanyJobApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyJobApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyJobApplicationsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCompanyJobApplicationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCompanyJobApplicationsQuery,
    GetCompanyJobApplicationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCompanyJobApplicationsQuery,
    GetCompanyJobApplicationsQueryVariables
  >(GetCompanyJobApplicationsDocument, options);
}
export function useGetCompanyJobApplicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCompanyJobApplicationsQuery,
    GetCompanyJobApplicationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCompanyJobApplicationsQuery,
    GetCompanyJobApplicationsQueryVariables
  >(GetCompanyJobApplicationsDocument, options);
}
export type GetCompanyJobApplicationsQueryHookResult = ReturnType<
  typeof useGetCompanyJobApplicationsQuery
>;
export type GetCompanyJobApplicationsLazyQueryHookResult = ReturnType<
  typeof useGetCompanyJobApplicationsLazyQuery
>;
export type GetCompanyJobApplicationsQueryResult = Apollo.QueryResult<
  GetCompanyJobApplicationsQuery,
  GetCompanyJobApplicationsQueryVariables
>;
export const GetJobPostsDocument = gql`
  query GetJobPosts($input: JopPostFilterInput) {
    getJobPosts(input: $input) {
      ...JopPostFragment
    }
  }
  ${JopPostFragmentFragmentDoc}
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
export const GetJobPostDocument = gql`
  query GetJobPost($input: GetJobPostInput!) {
    getJobPost(input: $input) {
      ...JopPostFragment
    }
  }
  ${JopPostFragmentFragmentDoc}
`;

/**
 * __useGetJobPostQuery__
 *
 * To run a query within a React component, call `useGetJobPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobPostQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetJobPostQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetJobPostQuery,
    GetJobPostQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetJobPostQuery, GetJobPostQueryVariables>(
    GetJobPostDocument,
    options,
  );
}
export function useGetJobPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetJobPostQuery,
    GetJobPostQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetJobPostQuery, GetJobPostQueryVariables>(
    GetJobPostDocument,
    options,
  );
}
export type GetJobPostQueryHookResult = ReturnType<typeof useGetJobPostQuery>;
export type GetJobPostLazyQueryHookResult = ReturnType<
  typeof useGetJobPostLazyQuery
>;
export type GetJobPostQueryResult = Apollo.QueryResult<
  GetJobPostQuery,
  GetJobPostQueryVariables
>;
