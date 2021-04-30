import { Client, SnippetsClient } from '@ranna-go/ranna-ts';

const client = new Client('https://public.ranna.zekro.de');
const snippets = new SnippetsClient('https://snippets.ranna.zekro.de');

export { client, snippets };
