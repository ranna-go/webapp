export default class InputTimeout {
  private timerRef: any;

  constructor(private timeout: number) {}

  public do(cb: () => void) {
    if (this.timerRef > 0) clearTimeout(this.timerRef);
    this.timerRef = setTimeout(cb, this.timeout);
  }
}
