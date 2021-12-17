import { useLayoutEffect, useRef } from 'react';

export function useIsEmbedded() {
  const isEmbed = useRef<boolean>();

  useLayoutEffect(() => {
    isEmbed.current = window.self !== window.top;
  }, []);

  return isEmbed.current;
}
