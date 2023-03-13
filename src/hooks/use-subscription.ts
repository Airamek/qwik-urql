import {
  useResource$,
  useStore,
  useSignal,
  useContext,
  useVisibleTask$,
  QRL,
} from '@builder.io/qwik';
import { pipe, subscribe } from 'wonka';
import { isServer } from '@builder.io/qwik/build';
import { AnyVariables, TypedDocumentNode } from '@urql/core';
import {
  UrqlAuthContext,
  UrqlClientContext,
  UrqlQwikContext,
} from '../components/urql-provider';

import { clientCache } from '../client/client-cache';

type Data = any;
type Variables = AnyVariables;

export const useSubscription = (
  queryQrl: QRL<() => TypedDocumentNode<Data, Variables> & { kind: string }>,
  vars?: Partial<Variables>
) => {
  const output = useStore({ data: {} }, { deep: true });
  const clientStore = useContext(UrqlClientContext);
  const qwikStore = useContext(UrqlQwikContext);
  const tokens = useContext(UrqlAuthContext);

  const track = useSignal(false);

  //transfer subscription to the browser
  useVisibleTask$(async ({ cleanup }) => {
    const [client, query] = await Promise.all([
      clientCache.getClient({
        factory: clientStore.factory,
        qwikStore,
        authTokens: tokens,
        id: clientStore.id,
      }),
      queryQrl(),
    ]);
    const subsciption = pipe(
      client.subscription(query, vars ?? ({} as Variables)),
      subscribe((result) => {
        if (JSON.stringify(result.data) != JSON.stringify(output.data)) {
          track.value = true;
          output.data = result.data;
          console.log('[DEBUG] transferred to client');
        }
        setTimeout(() => {}, 10);
      })
    );
    cleanup(() => {
      if (subsciption) subsciption.unsubscribe();
    });
  });

  return useResource$(async (ctx) => {
    let subsciption: any;
    if (isServer) {
      ctx.track(() => track.value);

      const [client, query] = await Promise.all([
        clientCache.getClient({
          factory: clientStore.factory,
          qwikStore,
          authTokens: tokens,
          id: clientStore.id,
        }),
        queryQrl(),
      ]);

      const result: any = await new Promise((resolve) => {
        subsciption = pipe(
          client.subscription(query, {}),
          subscribe((result) => {
            resolve(result); // { data: ... }
          })
        );
      });
      output.data = result.data;
    } else {
      ctx.track(() => output.data);
    }
    ctx.cleanup(() => {
      if (subsciption) subsciption.unsubscribe();
    });
    //console.log(`result = ${JSON.stringify(result)}`);
    return output;
  });
}
