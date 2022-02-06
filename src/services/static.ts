import { Client, SnippetsClient } from '@ranna-go/ranna-ts';
import { RannaHttpClient } from './httpclient';
import { RannaClient } from './rannaclient';
import { RannaWSClient } from './wsclient';

export const RANNA_ENDPOINT =
  process.env.REACT_APP_RANNA_ENDPOINT ?? 'https://public.ranna.dev';
export const SNIPPETS_ENDPOINT =
  process.env.REACT_APP_SNIPPETS_ENDPOINT ?? 'https://snippets.ranna.dev';

export const Snippets = new SnippetsClient(SNIPPETS_ENDPOINT);

export function newRannaClient(useWS: boolean): RannaClient {
  return useWS
    ? new RannaWSClient(RANNA_ENDPOINT)
    : new RannaHttpClient(RANNA_ENDPOINT);
}
