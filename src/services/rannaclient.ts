import { ExecutionRequest, SpecMap } from '@ranna-go/ranna-ts';
import { SystemInfo } from '@ranna-go/ranna-ts/dist/models';
import { Event } from '@ranna-go/ranna-ts/dist/ws/models';
import { Observable } from 'rxjs';

export interface RannaClient {
  spec(): Promise<SpecMap>;
  info(): Promise<SystemInfo>;
  exec(req: ExecutionRequest, bypassCache?: boolean): Observable<Event<any>>;
  stop(id: string): void;
  close(): void;
}
