export default class LocalStorageUtil {
  public static set<T>(key: string, val: T) {
    window.localStorage.setItem(key, JSON.stringify(val));
  }

  public static get<T>(key: string): T | undefined;
  public static get<T>(key: string, def: T): T;
  public static get<T>(key: string, def?: T) {
    const valStr = window.localStorage.getItem(key);
    if (valStr) return this.parseSafe(valStr, def);
    return def;
  }

  public static del(key: string) {
    window.localStorage.removeItem(key);
  }

  private static parseSafe<T>(val: string, def?: T): T | undefined {
    try {
      return JSON.parse(val);
    } catch {
      return def;
    }
  }
}
