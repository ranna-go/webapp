import {
  Event,
  EventCode,
  ExecutionRequest,
  RunID,
  WsError,
} from '@ranna-go/ranna-ts';
import { catchError, filter, tap } from 'rxjs';

import { NotificationType } from 'components/SnackBar';
import { useShallow } from 'zustand/react/shallow';
import { useSnackBar } from 'components/SnackBar/useSnackBar';
import { useState } from 'react';
import { useStore } from 'services/store';

export function useCodeExec() {
  const [runID, setRunID] = useState('');
  const [rannaClient, code, spec, args, env, bypassCache] = useStore(
    useShallow((s) => [
      s.rannaClient,
      s.code,
      s.spec,
      s.args,
      s.env,
      s.bypassCache,
    ])
  );
  const { show } = useSnackBar();

  const run = () =>
    rannaClient
      .exec(
        {
          code,
          language: spec,
          arguments: args,
          environment: env,
        } as ExecutionRequest,
        bypassCache
      )
      .pipe(
        catchError((e) => _handleError(e)),
        filter((e) => !!e),
        tap((e) => {
          if (e.code === EventCode.SPAWN) setRunID((e.data as RunID).runid);
          if (e.code === EventCode.STOP) setRunID('');
        })
      );

  const stop = () => {
    if (!!runID) {
      rannaClient.stop(runID);
      setRunID('');
    }
  };

  const _handleError = (event: Event<WsError>) => {
    const err = event.data;
    if (err.code === 429) {
      show(
        <span>
          You are being rate limited.
          <br />
          Please try again in a few seconds.
        </span>,
        NotificationType.ERROR
      );
    } else if (err.code >= 400 && err.code < 500) {
      show(
        <span>
          Code execution failed. ({err.code})
          {err.message && (
            <>
              <br />
              <code>{err.message}</code>
            </>
          )}
        </span>,
        NotificationType.ERROR
      );
    } else {
      show(
        <span>
          Request failed unexpectedly. ({err.code})
          {err.message && (
            <>
              <br />
              <code>{err.message}</code>
            </>
          )}
        </span>,
        NotificationType.ERROR
      );
    }
    throw err;
  };

  return {
    run,
    stop,
    runID,
  };
}
