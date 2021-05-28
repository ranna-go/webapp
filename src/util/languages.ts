import { StringMap } from '@ranna-go/ranna-ts';

const langMap: StringMap = {
  'python3': 'python',
  'openjdk-11': 'java',
  'deno': 'typescript',
  'golang': 'go',
  'mono': 'c# (mono)',
  'dotnet-script': 'c# (script)',
  'node': 'javascript',
};

export function mapLang(lang: string): string {
  return langMap[lang] ?? lang;
}
