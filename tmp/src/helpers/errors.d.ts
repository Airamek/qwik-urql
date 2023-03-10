import { CombinedError as UrqlCombinedError } from '@urql/core';
import { CombinedError } from '../types';
export declare const serializeError: (error?: UrqlCombinedError) => CombinedError | undefined;
