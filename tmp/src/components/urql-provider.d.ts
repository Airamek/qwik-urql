import { QRL } from '@builder.io/qwik';
import { type Cache } from '../exchange/qwik-exchange';
import { ClientFactory, ClientStore, UrqlAuthTokens, UrqlOptions } from '../types';
export declare const UrqlQwikContext: import("@builder.io/qwik").ContextId<Cache>;
export declare const UrqlAuthContext: import("@builder.io/qwik").ContextId<UrqlAuthTokens>;
export declare const UrqlClientContext: import("@builder.io/qwik").ContextId<ClientStore>;
export declare const UrqlOptionsContext: import("@builder.io/qwik").ContextId<UrqlOptions>;
export type UrqlProviderProps = {
    auth?: UrqlAuthTokens;
    client: QRL<ClientFactory>;
    options?: UrqlOptions;
};
export declare const idCounter: {
    current: number;
};
export declare const UrqlProvider: import("@builder.io/qwik").Component<UrqlProviderProps>;
