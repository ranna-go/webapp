import { Client, SnippetsClient } from '@ranna-go/ranna-ts';

export const Ranna = new Client('https://public.ranna.zekro.de');

export const Snippets = new SnippetsClient(
  process.env.NODE_ENV === 'production'
    ? 'https://snippets.ranna.zekro.de'
    : 'http://localhost:8080'
);
