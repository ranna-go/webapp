import { SystemInfo } from '@ranna-go/ranna-ts/dist/models';

export type InfoModel = SystemInfo & {
  rannaEndpoint: string;
  snippetsEndpoint: string;
};
