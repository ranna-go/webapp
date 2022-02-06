import { SpecMap } from '@ranna-go/ranna-ts';
import { useEffect, useState } from 'react';
import { useStore } from 'services/store';

export const useSpec = () => {
  const [spec, setSpec] = useState<SpecMap>({});
  const rannaClient = useStore((e) => e.rannaClient);

  useEffect(() => {
    rannaClient.spec().then((s) => setSpec(s));
  }, []);

  return spec;
};
