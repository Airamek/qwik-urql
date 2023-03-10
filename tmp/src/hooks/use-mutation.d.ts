import { QRL, Signal } from '@builder.io/qwik';
import { AnyVariables, OperationContext, TypedDocumentNode } from '@urql/core';
import { CombinedError } from '../types';
/**
 * The mutate function needs to be a QRL
 * We're trying to make it callable without a resource
 */
export type MutationResult<Variables extends AnyVariables, Data = any> = {
    loading: Signal<boolean>;
    data?: Data;
    error?: CombinedError;
    mutate$: QRL<(vars: Variables) => void>;
};
export declare const useMutation: <Variables extends AnyVariables, Data = any>(queryQrl: QRL<() => TypedDocumentNode<Data, Variables> & {
    kind: string;
}>, initialVars?: Partial<Variables> | undefined, context?: Partial<Omit<OperationContext, 'fetch'>>) => MutationResult<Variables, Data>;
