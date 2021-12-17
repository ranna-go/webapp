import { ExecutionResponse } from '@ranna-go/ranna-ts';
import { useState } from 'react';
import { Ranna } from 'services/client';
import { useStore } from 'services/store';

export type Result = ExecutionResponse;

export function useCodeExec() {
  const { code, spec, args, env, bypassCache } = useStore();
  const [result, setResult] = useState<Result>();

  const run = async () => {
    try {
      const res = await Ranna.exec(
        {
          code,
          language: spec,
          arguments: args,
          environment: env,
        },
        bypassCache
      );
      setResult(res);
    } catch {}
  };

  const reset = () => {
    setResult(undefined);
  };

  return {
    result,
    run,
    reset,
  };
}
