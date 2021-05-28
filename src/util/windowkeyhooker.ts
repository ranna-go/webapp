export type Handler = (e: KeyboardEvent) => void;

export default class WindowKeyHookBuilder {
  private handlers: { [key: string]: Handler } = {};

  public on(keys: string, handler: Handler) {
    this.handlers[keys.toLowerCase()] = handler;
    return this;
  }

  public build() {
    return (e: KeyboardEvent) => {
      const key = (
        (e.altKey ? 'alt+' : '') +
        (e.shiftKey ? 'shift+' : '') +
        e.key
      ).toLowerCase();
      const handler = this.handlers[key];
      if (!!handler) {
        e.preventDefault();
        handler(e);
      }
    };
  }
}
