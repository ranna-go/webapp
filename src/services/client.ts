import { Client, SnippetsClient } from '@ranna-go/ranna-ts';

const client = new Client('https://public.ranna.zekro.de');
const snippets = new SnippetsClient(
  process.env.NODE_ENV === 'production'
    ? 'https://snippets.ranna.zekro.de'
    : 'http://localhost:8080'
);

export { client, snippets };
