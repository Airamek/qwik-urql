import { QRL, ResourceReturn } from '@builder.io/qwik';
import { AnyVariables, OperationContext, OperationResult, TypedDocumentNode } from '@urql/core';
import { DeepOmit } from 'ts-essentials';
export type UseQueryResponse<D, V extends AnyVariables> = DeepOmit<OperationResult<D, V>, {
    operation: never;
    error: never;
}>;
export type UseQueryResource<D, V extends AnyVariables> = ResourceReturn<UseQueryResponse<D, V>>;
type OptionalVars<D, V extends AnyVariables> = [
    queryQrl: QRL<() => TypedDocumentNode<D, V> & {
        kind: string;
    }>,
    vars?: V,
    context?: Partial<Omit<OperationContext, 'fetch'>> & {
        watch: boolean;
    }
];
type RequiredVars<D, V extends AnyVariables> = [
    queryQrl: QRL<() => TypedDocumentNode<D, V> & {
        kind: string;
    }>,
    vars: V,
    context?: Partial<Omit<OperationContext, 'fetch'>> & {
        watch: boolean;
    }
];
/**
 * Setting the context.watch option to false with not create a subscription
 * which can reduce the serialized load and give a very minor performance
 * benefit.
 *
 * @param query TypedDocumentNode created using gql`...`
 * @param vars Input variables for the query.
 * @param context Optional context to pass to Urql.
 *
 * @returns Qwik ResourceReturn to be used with a <Resource /> component
 */
export declare const useQuery: <D, V extends AnyVariables>(...args: {} extends V ? OptionalVars<D, V> : RequiredVars<D, V>) => UseQueryResource<D, V>;
export {};
