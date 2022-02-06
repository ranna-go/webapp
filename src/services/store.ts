import { StringMap } from '@ranna-go/ranna-ts';
import create from 'zustand';
import LocalStorageUtil from 'util/localstorage';
import { AppTheme } from 'theme/theme';
import { RannaClient } from './rannaclient';
import { newRannaClient } from './static';

export interface Store {
  spec: string;
  setSpec: (v: string) => void;

  code: string;
  setCode: (v: string) => void;

  args: string[];
  setArgs: (v: string[]) => void;

  env: StringMap;
  setEnv: (v: StringMap) => void;

  bypassCache: boolean;
  setBypassCache: (v: boolean) => void;

  apiKey: string;
  setApiKey: (v: string) => void;

  theme: AppTheme;
  setTheme: (v: AppTheme) => void;

  useWS: boolean;
  setUseWS: (v: boolean) => void;

  rannaClient: RannaClient;
}

export const useStore = create<Store>((set, get) => ({
  spec: '',
  setSpec: (spec) => set({ spec }),

  code: '',
  setCode: (code) => set({ code }),

  args: [],
  setArgs: (args) => set({ args }),

  env: {},
  setEnv: (env) => set({ env }),

  bypassCache: false,
  setBypassCache: (bypassCache) => set({ bypassCache }),

  apiKey: LocalStorageUtil.get('snippets.apiKey', '')!,
  setApiKey: (apiKey) => {
    set({ apiKey });
    LocalStorageUtil.set('snippets.apiKey', apiKey);
  },

  theme: LocalStorageUtil.get(
    'ranna.theme',
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? AppTheme.DARK
      : AppTheme.LIGHT
  )!,
  setTheme: (theme) => {
    set({ theme });
    LocalStorageUtil.set('ranna.theme', theme);
  },

  useWS: false,
  setUseWS: (useWS) => {
    get().rannaClient.close();
    const rannaClient = newRannaClient(useWS);
    set({ useWS, rannaClient });
  },

  rannaClient: newRannaClient(false),
}));
