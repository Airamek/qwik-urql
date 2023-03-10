import { component$ } from '@builder.io/qwik';
import { DocumentHead, Link } from '@builder.io/qwik-city';

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
