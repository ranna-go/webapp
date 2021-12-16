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
}) => {
  const [active, setActive] = useState(false);
  const [spec, setSpec] = useStore((s) => [s.spec, s.setSpec]);

  const _run = () => {
    setActive(true);
    onRun().finally(() => setActive(false));
  };

  useEffect(() => {
    if (!spec) setSpec(Object.keys(specMap)[0]);
  }, []);

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
      <ExecButton active={active} onActivate={_run} />
      <Select
        value={spec}
        options={_specOptions}
        onChange={(e) => setSpec(e.currentTarget.value)}
      />
      <Button icon={'⚙️'} onClick={onOpenSettings}>
        Settings
      </Button>
      <RightContainer>
        <Button icon={'🔗'}>Share Snippet</Button>
      </RightContainer>
    </Container>
  );
};
