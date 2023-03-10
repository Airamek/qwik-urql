import { $, useResource$, useStore, useSignal, useContext, useVisibleTask$, QRL } from '@builder.io/qwik';
import { pipe, subscribe } from 'wonka';
import { isServer } from '@builder.io/qwik/build';
import { AnyVariables, OperationContext, TypedDocumentNode } from '@urql/core';
import {
    UrqlAuthContext,
    UrqlClientContext,
    UrqlOptionsContext,
    UrqlQwikContext,
  } from '../components/urql-provider';
  
import { clientCache } from '../client/client-cache';



export function useSubscription(
    queryQrl: QRL<() => TypedDocumentNode<Data, Variables> & { kind: string;}>,
    Vars?: Partial<Variables>) {
        const output = useStore({data: {}}, {deep: true});
		const clientStore = useContext(UrqlClientContext);
        const qwikStore = useContext(UrqlQwikContext);
        const tokens = useContext(UrqlAuthContext);

		const track = useSignal(false);

       
        //transfer subscription to the browser
		useVisibleTask$(async ({cleanup}) => {
            const [client, query] = await Promise.all([
                clientCache.getClient({
                  factory: clientStore.factory,
                  qwikStore,
                  authTokens: tokens,
                  id: clientStore.id,
                }),
                queryQrl(),
              ]);
            const unsubscribe = pipe(
                client.subscription(query),
                subscribe(result => {
                    if (JSON.stringify(result.data) != JSON.stringify(output.data)) {
                        track.value = true;
                        output.data = result.data;
                        console.log("[DEBUG] transferred to client")
                    }
                     setTimeout(() => {}, 10)
                })
            );
		});

		return useResource$(async (ctx) => {
            let unsubscribe;
			if (isServer) {
				ctx.track(() => track.value)
                
				const [client, query] = await Promise.all([
                    clientCache.getClient({
                      factory: clientStore.factory,
                      qwikStore,
                      authTokens: tokens,
                      id: clientStore.id,
                    }),
                    queryQrl(),
                  ]);

                const result: any = await new Promise(resolve => {
					unsubscribe = pipe(
						client.subscription(query, {}),
						subscribe(result => {
							resolve(result); // { data: ... }
						})
					);
				}); 
                output.data = result.data;
			}
            else {
                ctx.track(() => output.data);
            }
            
			//console.log(`result = ${JSON.stringify(result)}`);
			return output;
		});
	}
