import { QRL } from '@builder.io/qwik';
import { Client } from '@urql/core';
import { Cache } from '../exchange/qwik-exchange';
import { ClientFactory, UrqlAuthTokens } from '../types';
/**
 * Stores an instance of the Urql client against a unique ID so that server
 * requests can reuse the same instance for each render.
 * The client is stored on the Window on the client.
 */
declare class ClientCache {
    private readonly cache;
    getClient(args: {
        factory: QRL<ClientFactory>;
        qwikStore: Cache;
        authTokens?: UrqlAuthTokens;
        id: number;
    }): Promise<Client>;
    /** Removes references to a client to clean up after SSR */
    gc(id: number): void;
    private set;
    private get;
    private has;
}
export declare const clientCache: ClientCache;
export {};
