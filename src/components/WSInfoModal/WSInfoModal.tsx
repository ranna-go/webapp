import { Button } from 'components/Button';
import { Embed } from 'components/Embed';
import { Controls, Modal } from 'components/Modal';
import { useIsEmbedded } from 'hooks/useIsEmbedded';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { useStore } from 'services/store';
import styled from 'styled-components';

const StyledMain = styled.main`
  max-width: 600px;
`;

export const WSInfoModal: React.FC<{}> = () => {
  const useWS = useStore((s) => s.useWS);
  const [wsInfoShown, setWsInfoShown] = useLocalStorage(
    'ranna.wsinfoshown',
    false
  );
  const [wsInfoOpen, setWsInfoOpen] = useState(false);
  const isEmbedded = useIsEmbedded();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (!isEmbedded && !wsInfoShown && useWS) {
      setWsInfoOpen(true);
    }
  }, [useWS, isEmbedded, wsInfoShown]);

  const _hide = () => {
    setWsInfoShown(dontShowAgain);
    setWsInfoOpen(false);
  };

  return (
    <>
      {wsInfoOpen && (
        <Modal onClosing={_hide} heading="WebSocket API Info">
          <StyledMain>
            The{' '}
            <a
              href="https://github.com/ranna-go/ranna/blob/master/docs/api/wsapi.md"
              target="_blank"
              rel="noreferrer"
            >
              WebSocket API
            </a>{' '}
            is now enabled. This allows to stop currently running executions as
            well as displaying the output of the execution in real time (i.e. if
            you want to output something every x seconds periodically).
            <br />
            <br />
            Currently, the WebSocket API does not support caching. Also, you
            might experience stricter rate limitations on the WebSocket API.
            <br />
            <br />
            If you want to use the WebSocket API inside embeds, attach the{' '}
            <Embed>ws=1</Embed> query parameterto your embed URL. For example
            like this: <Embed>https://app.ranna.dev/?s=laXUu3&amp;ws=1</Embed>
          </StyledMain>
          <Controls>
            <input
              id="dontshowagain"
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.currentTarget.checked)}
            />
            <label htmlFor="dontshowagain">
              Don't show this message again.
            </label>
            <Button onClick={_hide}>OK</Button>
          </Controls>
        </Modal>
      )}
    </>
  );
};
