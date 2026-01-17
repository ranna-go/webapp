import { SystemInfo } from 'ranna-ts/dist/models';

export type InfoModel = SystemInfo & {
  rannaEndpoint: string;
  snippetsEndpoint: string;
};
