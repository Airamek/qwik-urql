import { Exchange, Operation, OperationResult } from '@urql/core';
import { OptimisticMutationConfig } from '@urql/exchange-graphcache';
export type Cache = {
    dependencies: Record<string, number[]>;
    triggers: Record<number, {
        value: number;
    }>;
};
/**
 * This exchange allows us to resume SSR query subscriptions on the client
 * and watch the cache for updates to queries.
 */
export declare class QwikExchange {
    private readonly cache;
    constructor(cache: Cache);
    /**
     * Process outgoing requests.
     * On the server we simply add Urql Operations to a store for resuming on the
     * client.
     */
    processRequest(operation: Operation): void;
    /** Process response by updating watch stores or triggering watch refetches */
    processResponse(result: OperationResult): void;
    /**
     * Traverse through results and store a lookup of which queries are dependant
     * on which objects. These are then used to trigger refetches if the target
     * objects are ever updated.
     */
    private setDependencies;
    /**
     * Loop through query results and trigger a refetch for any dependant queries
     */
    triggerDependencies(data: any, hits: Set<number>): void;
    run: Exchange;
}
export type QwikExhangeOptions = {
    cache: Cache;
    optimistic?: OptimisticMutationConfig;
};
export declare const qwikExchange: (options: QwikExhangeOptions) => Exchange;
