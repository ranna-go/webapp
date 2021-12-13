import { StringMap } from '@ranna-go/ranna-ts';
import create from 'zustand';
import LocalStorageUtil from 'util/localstorage';

export interface Store {
  showSettings: boolean;
  setShowSettings: (v: boolean) => void;

  args: string[];
  setArgs: (v: string[]) => void;

  env: StringMap;
  setEnv: (v: StringMap) => void;

  bypassCache: boolean;
  setBypassCache: (v: boolean) => void;

  apiKey: string;
  setApiKey: (v: string) => void;
}

export const useStore = create<Store>((set) => ({
  showSettings: false,
  setShowSettings: (showSettings) => set({ showSettings }),

  args: [],
  setArgs: (args) => set({ args }),

  env: {},
  setEnv: (env) => set({ env }),

  bypassCache: false,
  setBypassCache: (bypassCache) => set({ bypassCache }),

  apiKey: LocalStorageUtil.get('snippets.apiKey', '')!,
  setApiKey: (apiKey) => set({ apiKey }),
}));
