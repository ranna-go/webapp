export interface LangName {
  editor: string;
  display: string;
}

const langMap: { [key: string]: string[] } = {
  'python3': ['python'],
  'openjdk-11': ['java'],
  'deno': ['typescript'],
  'golang': ['go'],
  'mono': ['csharp', 'c# (mono)'],
  'dotnet-script': ['csharp', 'c# (script)'],
  'node': ['javascript'],
  'kotlin-script': ['kotlin', 'kotlin (script)'],
};

export function mapLang(lang: string): LangName {
  const e = langMap[lang] ?? [lang];
  const editor = e[0];
  const display = e[1] ?? editor;
  return { editor, display };
}
