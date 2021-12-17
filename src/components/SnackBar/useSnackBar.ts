import { useRef } from 'react';
import { Timeout } from 'types/timer';
import create from 'zustand';
import { NotificationType, Props } from './types';

interface Store {
  active: boolean;
  setActive: (v: boolean) => void;

  props: Props;
  setPorps: (v: Props) => void;
}

export const useSnackBarStore = create<Store>((set) => ({
  active: false,
  setActive: (active) => set({ active }),

  props: {} as Props,
  setPorps: (props) => set({ props }),
}));

export function useSnackBar() {
  const { setActive, setPorps } = useSnackBarStore();
  const hideRef = useRef<Timeout | null>();

  const _clearTimer = () => {
    if (hideRef.current) {
      clearTimeout(hideRef.current);
      hideRef.current = null;
    }
  };

  const show = (
    content: string | JSX.Element,
    type: NotificationType = NotificationType.INFO,
    duration: number = 4000,
    closable: boolean = true
  ) => {
    setPorps({ content, type, closable });
    setActive(true);
    _clearTimer();
    if (duration > 0) hideRef.current = setTimeout(() => hide(), duration);
  };

  const hide = () => {
    setActive(false);
    // Await duration of animations, so that the
    // snack bar will not be cleared before it is
    // fully hidden.
    setTimeout(() => setPorps({} as Props), 500);
    _clearTimer();
  };

  return { show, hide };
}
