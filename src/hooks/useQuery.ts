import { useState } from 'react';

export function useQuery(
  key: string,
  def?: string
): [string | undefined, (v: string) => void] {
  const [v, setV] = useState<string | undefined>(getQueryParam(key) ?? def);

  const set = (v: string) => {
    setV(v);
    setQueryParam(key, v);
  };

  return [v, set];
}

function getQueryParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key);
}

function setQueryParam(key: string, v: string) {
  const sp = new URLSearchParams(window.location.search);
  sp.set(key, v);
  window.history.pushState('', '', `?${sp.toString()}`);
}
