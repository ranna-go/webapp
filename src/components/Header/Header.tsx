import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { Button } from 'components/Button';
import { ExecButton } from './ExecButton';
import { useEffect, useState } from 'react';
import { Select, Option } from 'components/Select';
import { SpecMap } from '@ranna-go/ranna-ts';
import { mapLang } from 'util/languages';
import { useStore } from 'services/store';

interface Props {
  specMap?: SpecMap;
  onOpenSettings?: () => void;
  onRun?: () => Promise<any>;
  onSnippet?: () => void;
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  background-color: ${(p) => p.theme.accentDark};
  padding: 0.8rem;
  display: flex;
  align-items: center;
  z-index: 10;

  > * {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const RightContainer = styled.div`
  margin-left: auto;
`;

export const Header: React.FC<Props> = ({
  specMap = {},
  onOpenSettings = () => {},
  onRun = async () => {},
  onSnippet = () => {},
}) => {
  const [active, setActive] = useState(false);
  const { spec, setSpec, code } = useStore();

  const _run = () => {
    setActive(true);
    onRun().finally(() => setActive(false));
  };

  const _specOptions = Object.keys(specMap)
    .filter((s) => !specMap[s].use)
    .map(
      (s) =>
        ({
          value: s,
          displayName: mapLang(s).display,
        } as Option)
    );

  return (
    <Container>
      <Logo />
      <ExecButton disabled={!code || !spec} active={active} onActivate={_run} />
      <Select
        value={spec}
        options={_specOptions}
        onChange={(e) => setSpec(e.currentTarget.value)}
      />
      <Button icon={'⚙️'} onClick={onOpenSettings}>
        Settings
      </Button>
      <RightContainer>
        <Button icon={'🔗'} disabled={!code || !spec} onClick={onSnippet}>
          Share Snippet
        </Button>
      </RightContainer>
    </Container>
  );
};
