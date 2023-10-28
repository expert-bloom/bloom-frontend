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

import {
  ApolloClient,
  ApolloLink,
  type FetchResult,
  InMemoryCache,
  Observable,
  type Operation,
  split,
} from '@apollo/client';
import { YogaLink } from '@graphql-yoga/apollo-link';
import { getOperationAST, print } from 'graphql';

type SSELinkOptions = EventSourceInit & { uri: string };

class SSELink extends ApolloLink {
  constructor(private readonly options: SSELinkOptions) {
    super();
  }

  request(operation: Operation): Observable<FetchResult> {
    const url = new URL(this.options.uri);
    url.searchParams.append('query', print(operation.query));

    if (operation.operationName) {
      url.searchParams.append('operationName', operation.operationName);
    }
    if (operation.variables) {
      url.searchParams.append('variables', JSON.stringify(operation.variables));
    }
    if (operation.extensions) {
      url.searchParams.append(
        'extensions',
        JSON.stringify(operation.extensions),
      );
    }

    return new Observable((sink) => {
      const eventsource = new EventSource(url.toString(), this.options);
      eventsource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        sink.next(data);
        if (eventsource.readyState === 2) {
          sink.complete();
        }
      };
      eventsource.onerror = function (error) {
        sink.error(error);
      };
      return () => {
        eventsource.close();
      };
    });
  }
}

const uri = `${
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (function () {
    throw new Error('API URL is EMPTY !!!');
  })()
}/graphql`;

const sseLink = new SSELink({
  uri,
});

const link = split(
  ({ query, operationName }) => {
    const definition = getOperationAST(query, operationName);
    return (
      definition?.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  sseLink,
  new YogaLink({
    endpoint: uri,
  }),
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
