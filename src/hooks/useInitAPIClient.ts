import { useEffect } from 'react';
import { useQuery } from './useQuery';
import { useStore } from 'services/store';

export const useInitAPIClient = () => {
  const useWS = useStore((s) => s.useWS);
  const setUseWS = useStore((s) => s.setUseWS);

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
