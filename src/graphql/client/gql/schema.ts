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
  __typename?: 'Account';
  accountType: AccountType;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
};

export type AccountInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export enum AccountType {
  Affiliate = 'AFFILIATE',
  Applicant = 'APPLICANT',
  Company = 'COMPANY',
}

export type Affiliate = IAccount & {
  __typename?: 'Affiliate';
  accountType: AccountType;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
};

export type AffiliateLight = {
  __typename?: 'AffiliateLight';
  id: Scalars['String']['output'];
};

export type Applicant = IAccount & {
  __typename?: 'Applicant';
  accountType: AccountType;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  experienceYear?: Maybe<Scalars['Int']['output']>;
  firstName: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  resume?: Maybe<Scalars['String']['output']>;
};

export type ApplicantLight = {
  __typename?: 'ApplicantLight';
  experienceYear?: Maybe<Scalars['Int']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  resume?: Maybe<Scalars['String']['output']>;
};

export type AuthAccountPayload = IAccount & {
  __typename?: 'AuthAccountPayload';
  accountType: AccountType;
  affiliate?: Maybe<AffiliateLight>;
  applicant?: Maybe<ApplicantLight>;
  company?: Maybe<CompanyLight>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
};

export type AuthPayload = PayloadError & {
  __typename?: 'AuthPayload';
  account?: Maybe<AuthAccountPayload>;
  errors: Array<Error>;
};

export type Company = IAccount & {
  __typename?: 'Company';
  accountType: AccountType;
  companyName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type CompanyLight = {
  __typename?: 'CompanyLight';
  companyName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  logo?: Maybe<Scalars['String']['output']>;
};

export type CreateJobPostInput = {
  company: Scalars['String']['input'];
  compensation: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  englishLevel?: InputMaybe<Scalars['String']['input']>;
  isVisible: Scalars['Boolean']['input'];
  jobCategory: Array<InputMaybe<Scalars['String']['input']>>;
  jobDeadline: Scalars['String']['input'];
  jobExperience: Scalars['Int']['input'];
  jobSkills: Array<Scalars['String']['input']>;
  jobType: Scalars['String']['input'];
  jobVacancy: Scalars['Int']['input'];
  otherLanguages: Array<InputMaybe<Scalars['String']['input']>>;
  salary: Array<InputMaybe<Scalars['Int']['input']>>;
  title: Scalars['String']['input'];
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String']['output'];
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
  image?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
};

export type JobPost = {
  __typename?: 'JobPost';
  _id: Scalars['String']['output'];
  compensation: Scalars['String']['output'];
  description: Scalars['String']['output'];
  englishLevel?: Maybe<Scalars['String']['output']>;
  isVisible: Scalars['Boolean']['output'];
  jobCategory: Array<Maybe<Scalars['String']['output']>>;
  jobDeadline: Scalars['DateTime']['output'];
  jobExperience: Scalars['Int']['output'];
  jobSkills: Array<Scalars['String']['output']>;
  jobType: Scalars['String']['output'];
  jobVacancy: Scalars['Int']['output'];
  otherLanguages: Array<Scalars['String']['output']>;
  salary: Array<Maybe<Scalars['Int']['output']>>;
  title: Scalars['String']['output'];
};

export type JopPostFilterInput = {
  company?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createJobPost?: Maybe<JobPost>;
  logIn: AuthPayload;
  logInOAuth: AuthPayload;
  signUp: AuthPayload;
  signUpOAuth: AuthPayload;
};

export type MutationCreateJobPostArgs = {
  input: CreateJobPostInput;
};

export type MutationLogInArgs = {
  input: LoginInput;
};

export type MutationLogInOAuthArgs = {
  input: LoginInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationSignUpOAuthArgs = {
  input: OAuthSignUpInput;
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

export type PayloadError = {
  errors: Array<Error>;
};

export type Query = {
  __typename?: 'Query';
  findAccount?: Maybe<AuthPayload>;
  getJobPosts: Array<JobPost>;
  me?: Maybe<Scalars['String']['output']>;
  sayHi?: Maybe<Scalars['String']['output']>;
};

export type QueryFindAccountArgs = {
  input: AccountInput;
};

export type QueryGetJobPostsArgs = {
  input: JopPostFilterInput;
};

export type SignUpInput = {
  accountType: AccountType;
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type AccountFragmentFragment = {
  __typename?: 'Account';
  id: string;
  email: string;
  accountType: AccountType;
  image?: string | null;
  firstName: string;
  lastName: string;
  createdAt: any;
};

export type AuthAccountPayloadFragment = {
  __typename?: 'AuthAccountPayload';
  id: string;
  email: string;
  accountType: AccountType;
  image?: string | null;
  firstName: string;
  lastName: string;
  createdAt: any;
  applicant?: { __typename?: 'ApplicantLight'; id: string } | null;
  company?: {
    __typename?: 'CompanyLight';
    id: string;
    companyName?: string | null;
    logo?: string | null;
  } | null;
  affiliate?: { __typename?: 'AffiliateLight'; id: string } | null;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  logIn: {
    __typename?: 'AuthPayload';
    errors: Array<{ __typename?: 'Error'; message: string }>;
    account?: {
      __typename?: 'AuthAccountPayload';
      id: string;
      email: string;
      accountType: AccountType;
      image?: string | null;
      firstName: string;
      lastName: string;
      createdAt: any;
      applicant?: { __typename?: 'ApplicantLight'; id: string } | null;
      company?: {
        __typename?: 'CompanyLight';
        id: string;
        companyName?: string | null;
        logo?: string | null;
      } | null;
      affiliate?: { __typename?: 'AffiliateLight'; id: string } | null;
    } | null;
  };
};

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  signUp: {
    __typename?: 'AuthPayload';
    errors: Array<{ __typename?: 'Error'; message: string }>;
    account?: {
      __typename?: 'AuthAccountPayload';
      id: string;
      email: string;
      accountType: AccountType;
      image?: string | null;
      firstName: string;
      lastName: string;
      createdAt: any;
      applicant?: { __typename?: 'ApplicantLight'; id: string } | null;
      company?: {
        __typename?: 'CompanyLight';
        id: string;
        companyName?: string | null;
        logo?: string | null;
      } | null;
      affiliate?: { __typename?: 'AffiliateLight'; id: string } | null;
    } | null;
  };
};

export type SignUpOAuthMutationVariables = Exact<{
  input: OAuthSignUpInput;
}>;

export type SignUpOAuthMutation = {
  __typename?: 'Mutation';
  signUpOAuth: {
    __typename?: 'AuthPayload';
    errors: Array<{ __typename?: 'Error'; message: string }>;
    account?: {
      __typename?: 'AuthAccountPayload';
      id: string;
      email: string;
      accountType: AccountType;
      image?: string | null;
      firstName: string;
      lastName: string;
      createdAt: any;
      applicant?: { __typename?: 'ApplicantLight'; id: string } | null;
      company?: {
        __typename?: 'CompanyLight';
        id: string;
        companyName?: string | null;
        logo?: string | null;
      } | null;
      affiliate?: { __typename?: 'AffiliateLight'; id: string } | null;
    } | null;
  };
};

export type FindAccountQueryVariables = Exact<{
  input: AccountInput;
}>;

export type FindAccountQuery = {
  __typename?: 'Query';
  findAccount?: {
    __typename?: 'AuthPayload';
    errors: Array<{ __typename?: 'Error'; message: string }>;
    account?: {
      __typename?: 'AuthAccountPayload';
      id: string;
      email: string;
      accountType: AccountType;
      image?: string | null;
      firstName: string;
      lastName: string;
      createdAt: any;
      applicant?: { __typename?: 'ApplicantLight'; id: string } | null;
      company?: {
        __typename?: 'CompanyLight';
        id: string;
        companyName?: string | null;
        logo?: string | null;
      } | null;
      affiliate?: { __typename?: 'AffiliateLight'; id: string } | null;
    } | null;
  } | null;
};

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
export const AuthAccountPayloadFragmentDoc = gql`
  fragment AuthAccountPayload on AuthAccountPayload {
    id
    email
    accountType
    image
    firstName
    lastName
    createdAt
    applicant {
      id
    }
    company {
      id
      companyName
      logo
    }
    affiliate {
      id
    }
  }
`;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    logIn(input: $input) {
      errors {
        message
      }
      account {
        ...AuthAccountPayload
      }
    }
  }
  ${AuthAccountPayloadFragmentDoc}
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
        ...AuthAccountPayload
      }
    }
  }
  ${AuthAccountPayloadFragmentDoc}
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
        ...AuthAccountPayload
      }
    }
  }
  ${AuthAccountPayloadFragmentDoc}
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
export const FindAccountDocument = gql`
  query FindAccount($input: AccountInput!) {
    findAccount(input: $input) {
      errors {
        message
      }
      account {
        ...AuthAccountPayload
      }
    }
  }
  ${AuthAccountPayloadFragmentDoc}
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