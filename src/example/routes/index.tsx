import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      Home page
      <br />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Home',
};
