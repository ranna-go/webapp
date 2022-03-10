import { useEffect } from 'react';
import { useStore } from 'services/store';
import { useQuery } from './useQuery';

export const useInitAPIClient = () => {
  const [useWS, setUseWS] = useStore((s) => [s.useWS, s.setUseWS]);
  const [wsQuery, setWsQuery] = useQuery('ws');

  useEffect(() => {
    setUseWS(parseBool(wsQuery));
  }, []);

  useEffect(() => {
    setWsQuery(toBool(useWS));
  }, [useWS]);
};

function parseBool(v: string | undefined) {
  return !!v && parseInt(v) >= 1;
}

function toBool(v: boolean): string {
  return v ? '1' : '';
}
