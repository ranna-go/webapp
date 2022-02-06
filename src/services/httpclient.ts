import {
  Client,
  ExecutionRequest,
  Event,
  SpecMap,
  RunID,
  EventCode,
  LogData,
  WsError,
  ResponseError,
  APIError,
  StopData,
} from '@ranna-go/ranna-ts';
import { SystemInfo } from '@ranna-go/ranna-ts/dist/models';
import { Observable } from 'rxjs';
import { Result } from 'types/restapi';
import { RannaClient } from './rannaclient';

export class RannaHttpClient implements RannaClient {
  protected httpClient: Client;

  constructor(endpoint: string) {
    this.httpClient = new Client(endpoint);
  }

  spec(): Promise<SpecMap> {
    return this.httpClient.spec();
  }

  info(): Promise<SystemInfo> {
    return this.httpClient.info();
  }

  exec(req: ExecutionRequest, bypassCache?: boolean): Observable<Event<any>> {
    return new Observable((subscriber) => {
      subscriber.next({
        code: EventCode.SPAWN,
        data: {
          runid: 'NOT_SUPPORTED',
        },
      } as Event<RunID>);
      this.httpClient
        .exec(req, bypassCache)
        .then((res) => {
          subscriber.next({
            code: EventCode.LOG,
            data: {
              stderr: res.stderr,
              stdout: res.stdout,
              runid: 'NOT_SUPPORTED',
            },
          } as Event<LogData>);
          subscriber.next({
            code: EventCode.STOP,
            data: {
              ...res,
              runid: 'NOT_SUPPORTED',
            } as Result,
          } as Event<StopData>);
          subscriber.complete();
        })
        .catch((err) => subscriber.error(mapError(err)));
    });
  }

  // Unimplemented

  close(): void {}
  stop(id: string): void {}
}

function mapError(err: Error): Event<WsError> {
  const event = {
    code: EventCode.ERROR,
    data: {},
  } as Event<WsError>;
  if (err instanceof ResponseError) {
    event.data.code = err.response.status;
    event.data.message = err.message;
  } else if (err instanceof APIError) {
    event.data = err;
  } else {
    event.data.message = err.message;
  }
  return event;
}
