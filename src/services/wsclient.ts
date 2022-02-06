import {
  Event,
  EventCode,
  ExecutionRequest,
  OpCode,
  WebSocketClient,
} from '@ranna-go/ranna-ts';
import { Observable } from 'rxjs';
import { Optional } from 'types/optional';
import { RannaHttpClient } from './httpclient';
import { RannaClient } from './rannaclient';

type UnregisterFunc = () => void;

export class RannaWSClient extends RannaHttpClient implements RannaClient {
  private wsClient: WebSocketClient;

  constructor(endpoint: string) {
    super(endpoint);
    this.wsClient = this.httpClient.connectWs();
  }

  override exec(req: ExecutionRequest, _?: boolean): Observable<Event<any>> {
    const nonce = this.randomNonce;
    const nondeFilter = getNonceFilter(nonce);
    return new Observable((subscriber) => {
      const unreg: UnregisterFunc[] = [];
      unreg.push(
        this.wsClient.onEvent(
          EventCode.ERROR,
          nondeFilter((e) => subscriber.error(e))
        )
      );
      unreg.push(
        this.wsClient.onEvent(
          EventCode.SPAWN,
          nondeFilter((e) => subscriber.next(e))
        )
      );
      unreg.push(
        this.wsClient.onEvent(
          EventCode.LOG,
          nondeFilter((e) => subscriber.next(e))
        )
      );
      unreg.push(
        this.wsClient.onEvent(
          EventCode.STOP,
          nondeFilter((e) => {
            subscriber.next(e);
            subscriber.complete();
            unreg.forEach((f) => f());
          })
        )
      );

      this.wsClient.op(OpCode.EXEC, req, nonce);
    });
  }

  private get randomNonce(): number {
    return Math.floor(Math.random() * 10000);
  }
}

function getNonceFilter<T>(
  nonce: number
): (
  handler: (e: Optional<Event<T>>) => void
) => (e: Optional<Event<T>>) => void {
  return (handler) => {
    return (e) => {
      if (e && e.nonce === nonce) handler(e);
    };
  };
}
