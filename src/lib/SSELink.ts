import {
  ApolloLink,
  type FetchResult,
  Observable,
  type Operation,
} from '@apollo/client';
import { print } from 'graphql/index';

type SSELinkOptions = EventSourceInit & { uri: string };

export class SSELink extends ApolloLink {
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
