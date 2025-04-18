import { useEffect, useState } from 'react';

import { SpecMap } from '@ranna-go/ranna-ts';
import { useStore } from 'services/store';

export const useSpec = () => {
  const [spec, setSpec] = useState<SpecMap | undefined>(undefined);
  const rannaClient = useStore((e) => e.rannaClient);

  useEffect(() => {
    rannaClient.spec().then((s) => setSpec(s));
  }, []);

  return spec;
};
