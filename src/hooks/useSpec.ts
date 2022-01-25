import { SpecMap } from '@ranna-go/ranna-ts';
import { useEffect, useState } from 'react';
import { Ranna } from 'services/client';

export const useSpec = () => {
  const [spec, setSpec] = useState<SpecMap>({});

  useEffect(() => {
    Ranna.spec().then((s) => setSpec(s));
  }, []);

  return spec;
};
