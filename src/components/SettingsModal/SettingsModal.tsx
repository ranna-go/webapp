import { StringMap } from '@ranna-go/ranna-ts';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { CheckBox } from 'components/Input/CheckBox';
import { TextBox } from 'components/Input/TextBox';
import { Controls, Modal } from 'components/Modal';
import { ThemeSwitch } from 'components/ThemeSwitch';
import { useEffect, useState } from 'react';
import { useStore } from 'services/store';
import styled from 'styled-components';

interface Props {
  onClosing: () => void;
}

const ContentContainer = styled.div`
  width: 90vw;
  max-width: 20rem;
`;

const InputLabel = styled.h5`
  margin-bottom: 0.5em;
`;

const StyledCheckBox = styled(CheckBox)`
  margin: 1rem 0;
`;

const TokenInputLabel = styled(InputLabel)`
  > a {
    margin-left: 1em;
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SettingsModal: React.FC<Props> = ({ onClosing }) => {
  const {
    args,
    setArgs,
    bypassCache,
    setBypassCache,
    apiKey,
    setApiKey,
    env,
    setEnv,
  } = useStore();

  const [envInpt, setEnvInpt] = useState('');

  function onEnvBlur() {
    const m: StringMap = {};
    envInpt
      .split('\n')
      .map((l) => l.split('='))
      .filter((s) => s.length > 1)
      .forEach((s) => (m[s.shift()!] = s.join('=')));
    setEnv(m);
  }

  useEffect(() => {
    const envParsed = Object.keys(env)
      .map((k) => `${k.trim()}=${env[k].trim()}`)
      .join('\n');
    setEnvInpt(envParsed);
  }, [env]);

  return (
    <Modal
      heading={
        <HeadingContainer>
          <span>Settings</span>
          <ThemeSwitch />
        </HeadingContainer>
      }
      onClosing={onClosing}
    >
      <ContentContainer>
        <InputLabel>Arguments</InputLabel>
        <Input
          placeholder="arg1 arg2"
          value={args.join(' ')}
          onChange={(e) => setArgs(e.currentTarget.value.split(' '))}
        />
        <InputLabel>Evironment Variables</InputLabel>
        <TextBox
          placeholder="KEY=VALUE"
          value={envInpt}
          onChange={(e) => setEnvInpt(e.currentTarget.value)}
          onBlur={onEnvBlur}
        />
        <StyledCheckBox
          checked={bypassCache}
          onChange={(e) => setBypassCache(e.currentTarget.checked)}
        >
          Bypass Cache
        </StyledCheckBox>
        <TokenInputLabel>
          Snippets Token
          <a
            href="https://app.snippets.ranna.dev/"
            target="_blank"
            rel="noreferrer"
          >
            How to I get a token?
          </a>
        </TokenInputLabel>
        <Input
          placeholder="token"
          type="password"
          value={apiKey}
          onInput={(e) => setApiKey(e.currentTarget.value)}
        />
      </ContentContainer>
      <Controls>
        <Button onClick={onClosing}>OK</Button>
      </Controls>
    </Modal>
  );
};
