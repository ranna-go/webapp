export enum NotificationType {
  INFO = 1,
  SUCCESS = 2,
  WARN = 3,
  ERROR = 4,
}

export interface Props {
  content: string | JSX.Element;
  type: NotificationType;
  closable: boolean;
}
