import { Client, SnippetsClient } from '@ranna-go/ranna-ts';

export const RANNA_ENDPOINT = 'https://public.ranna.zekro.de';
export const SNIPPETS_ENDPOINT = 'https://snippets.ranna.zekro.de';

export const Ranna = new Client(RANNA_ENDPOINT);

export const Snippets = new SnippetsClient(
  process.env.NODE_ENV === 'production'
    ? SNIPPETS_ENDPOINT
    : 'http://localhost:8080'
);
