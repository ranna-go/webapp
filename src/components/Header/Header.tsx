import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { Button } from 'components/Button';
import { ExecButton } from './ExecButton';
import { useState } from 'react';
import { Select, Option } from 'components/Select';
import { SpecMap } from '@ranna-go/ranna-ts';
import { mapLang } from 'util/languages';

interface Props {
  spec?: SpecMap;
  onSelectSpec?: (v: string) => void;
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  background-color: ${(p) => p.theme.accentDark};
  padding: 0.8rem;
  display: flex;
  align-items: center;

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
  spec = {},
  onSelectSpec = () => {},
}) => {
  const [active, setActive] = useState(false);

  const _specOptions = Object.keys(spec)
    .filter((s) => !spec[s].use)
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
      <ExecButton active={active} onActivate={() => setActive(true)} />
      <Select
        options={_specOptions}
        onChange={(e) => onSelectSpec(e.currentTarget.value)}
      />
      <Button icon={'⚙️'}>Settings</Button>
      <RightContainer>
        <Button icon={'🔗'}>Share Snippet</Button>
      </RightContainer>
    </Container>
  );
};
