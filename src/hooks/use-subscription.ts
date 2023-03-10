import { useResource$, useStore, useSignal, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { pipe, subscribe } from 'wonka';
import { isServer } from '@builder.io/qwik/build';
import {
    UrqlAuthContext,
    UrqlClientContext,
    UrqlOptionsContext,
    UrqlQwikContext,
  } from '../components/urql-provider';
  
import { clientCache } from '../client/client-cache';


export function useSubscription(query) {
        let output = useStore({data: {}}, {recursive: true});
		const clientStore = useContext(UrqlClientContext);
        const qwikStore = useContext(UrqlQwikContext);
        const tokens = useContext(UrqlAuthContext);

		let track = useSignal(false);

        //transfer subscription to the browser
		useVisibleTask$(async ({cleanup}) => {
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
            cleanup(() => {
                if(unsubscribe) unsubscribe();
            })
		});

		return useResource$(async (ctx) => {
			
            let unsubscribe;
			if (isServer) {
				ctx.track(() => track.value)
                
				
                const result = await new Promise(resolve => {
					unsubscribe = pipe(
						client.subscription(query),
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
		}, () => unsubscribe());
	}
