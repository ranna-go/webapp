import { useState } from 'react';
import { getQueryParam, setQueryParam } from 'util/query';

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
