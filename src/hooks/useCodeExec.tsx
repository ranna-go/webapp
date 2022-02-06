import { Event, ExecutionRequest, WsError } from '@ranna-go/ranna-ts';
import { NotificationType } from 'components/SnackBar';
import { useSnackBar } from 'components/SnackBar/useSnackBar';
import { catchError, filter, of, tap } from 'rxjs';
import { useStore } from 'services/store';

export function useCodeExec() {
  const { rannaClient, code, spec, args, env, bypassCache } = useStore();
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
        catchError((e) => handleError(e)),
        filter((e) => !!e),
        tap((e) => console.log('tap', e))
      );

  const handleError = (event: Event<WsError>) => {
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
  };
}
