import { QRL } from '@builder.io/qwik';
import { AnyVariables, OperationContext, OperationResult, TypedDocumentNode } from '@urql/core';
export declare const useMutationResource: <Variables extends AnyVariables, Data = any>(queryQrl: QRL<() => TypedDocumentNode<Data, Variables> & {
    kind: string;
}>, vars: Variables, context?: Partial<Omit<OperationContext, 'fetch'>>) => import("@builder.io/qwik").ResourceReturn<OperationResult<Data, Variables>>;
