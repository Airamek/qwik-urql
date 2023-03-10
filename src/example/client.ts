import { createClient, dedupExchange, fetchExchange, subscriptionExchange } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';
import { executeExchange } from '@urql/exchange-execute';
import { cacheExchange } from '@urql/exchange-graphcache';
import { ClientFactory, UrqlAuthTokens } from '../types';
import { WebSocket } from 'ws';
import { createClient as createWSClient } from 'graphql-ws';
import { isServer } from '@builder.io/qwik/build';


const wsClient = createWSClient({
  webSocketImpl: (isServer ? WebSocket : undefined),
  url: 'ws://localhost:8080/v1/graphql',
  connectionParams: async () => {
    return {
      headers: { "x-hasura-admin-secret": "devsecret" }
    };
  },
});


export const clientFactory: ClientFactory = () => {
  return createClient({
      url: 'http://localhost:8080/v1/graphql',
      exchanges: [
        dedupExchange,
        cacheExchange({}),
        fetchExchange,
        subscriptionExchange({
          forwardSubscription: (operation) => ({
            subscribe: (sink) => ({
              unsubscribe: wsClient.subscribe(
                { query: operation.query, variables: operation.variables },
                sink
              ),
            }),
          }),
        }),
      ],
      fetchOptions: () => {
        return {
          headers: { "x-hasura-admin-secret": "devsecret" },
        };
      },
    })};


