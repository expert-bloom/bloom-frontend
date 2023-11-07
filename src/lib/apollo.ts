/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/*

import * as apolloImport from '@apollo/client';
import * as yogaLink from '@graphql-yoga/apollo-link';

const { YogaLink } = yogaLink;

const prod: any = 'http://localhost:3000/api/graphql';
const dev: any = 'http://localhost:3000/api/graphql';
const uri: any = process.env.NODE_ENV === 'production' ? prod : dev;

const { ApolloClient, InMemoryCache } = apolloImport;

const apolloClient = new ApolloClient({
  uri: 'api/graphql',
  link: new YogaLink({
    endpoint: 'api/graphql',
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
*/

import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { YogaLink } from '@graphql-yoga/apollo-link';
import { getOperationAST } from 'graphql';

import { SSELink } from '@/lib/SSELink';

const uri = `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`;

const sseLink = new SSELink({
  uri,
  withCredentials: true,
});

const httpLink = new YogaLink({
  endpoint: uri,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  // console.log(' headers ------------------------ --- : ', headers);

  return {
    headers: {
      ...headers, // authorization: 'Bearer dummy-data',
      'x-graphql-yoga-csrf': 'test',
    },
  };
});

const link = split(
  ({ query, operationName, setContext }) => {
    const definition = getOperationAST(query, operationName);
    return (
      definition?.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  sseLink,
  httpLink,
);

const client = new ApolloClient({
  link: authLink.concat(link),
  credentials: 'include',
  cache: new InMemoryCache(),
});

export default client;
