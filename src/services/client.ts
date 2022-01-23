import { Client, SnippetsClient } from '@ranna-go/ranna-ts';

export const RANNA_ENDPOINT =
  process.env.REACT_APP_RANNA_ENDPOINT ?? 'https://public.ranna.dev';
export const SNIPPETS_ENDPOINT =
  process.env.REACT_APP_SNIPPETS_ENDPOINT ?? 'https://snippets.ranna.dev';

export const Ranna = new Client(RANNA_ENDPOINT);

export const Snippets = new SnippetsClient(SNIPPETS_ENDPOINT);
