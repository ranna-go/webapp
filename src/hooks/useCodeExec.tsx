import { APIError, ExecutionResponse, ResponseError } from '@ranna-go/ranna-ts';
import { NotificationType } from 'components/SnackBar';
import { useSnackBar } from 'components/SnackBar/useSnackBar';
import { useState } from 'react';
import { Ranna } from 'services/client';
import { useStore } from 'services/store';

export type Result = ExecutionResponse;

export function useCodeExec() {
  const { code, spec, args, env, bypassCache } = useStore();
  const [result, setResult] = useState<Result>();
  const { show } = useSnackBar();

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
    } catch (e: any) {
      if (e instanceof ResponseError) {
        if (e.response.status === 429) {
          show(
            <span>
              You are being rate limited.
              <br />
              Please try again in a few seconds.
            </span>,
            NotificationType.ERROR
          );
        } else {
          show(
            <span>
              Request failed unexpectedly. ({e.response.status})
              {e.message && (
                <>
                  <br />
                  <code>{e.message}</code>
                </>
              )}
            </span>,
            NotificationType.ERROR
          );
        }
      } else if (e instanceof APIError) {
        show(
          <span>
            Code execution failed. ({e.code})
            {e.message && (
              <>
                <br />
                <code>{e.message}</code>
              </>
            )}
          </span>,
          NotificationType.ERROR
        );
      }
    }
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
