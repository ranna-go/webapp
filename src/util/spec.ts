import { Spec } from '@ranna-go/ranna-ts';

export function displayName(name: string, s: Spec): string {
  const l = s.language;
  if (!!l && l.toLowerCase() !== name.toLowerCase()) name += ` (${l})`;
  return name;
}
