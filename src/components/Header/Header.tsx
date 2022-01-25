import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { Button } from 'components/Button';
import { ExecButton } from './ExecButton';
import { useState } from 'react';
import { Select, Option } from 'components/Select';
import { SpecMap } from '@ranna-go/ranna-ts';
import { useStore } from 'services/store';
import { Info, InfoModel } from 'components/Info';
import { displayName } from 'util/spec';

interface Props {
  info?: InfoModel;
  specMap?: SpecMap;
  isEmbedded?: boolean;
  onOpenSettings?: () => void;
  onRun?: () => Promise<any>;
  onSnippet?: () => void;
}

const StyledInfo = styled(Info)`
  margin-top: 4.5rem;
`;

const InfoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 1rem;
  opacity: 0;
  pointer-events: none;
  transition: all 0.25s ease;
  z-index: 2;
  filter: blur(5px);
  transform: scale(1.02);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  &:hover ${InfoContainer} {
    opacity: 1;
    pointer-events: all;
    filter: blur(0px);
    transform: scale(1);
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  background-color: ${(p) => p.theme.accentDark};
  padding: 0.8rem;
  display: flex;
  align-items: center;
  z-index: 10;
  flex-wrap: wrap;

  > * {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const FloatingExecButton = styled(ExecButton)`
  position: absolute;
  z-index: 1;
  top: 1em;
  right: 1em;
  box-shadow: 0 0.2em 1.5em rgba(0 0 0 / 50%);
`;

const RightContainer = styled.div`
  margin-left: auto;
`;

export const Header: React.FC<Props> = ({
  info,
  isEmbedded,
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
          displayName: displayName(s, specMap[s]),
        } as Option)
    );

  return (
    <>
      {(isEmbedded && (
        <>
          <FloatingExecButton
            disabled={!code || !spec}
            active={active}
            onActivate={_run}
          />
        </>
      )) || (
        <Container>
          <LogoContainer>
            <Logo />
            {info && (
              <InfoContainer>
                <StyledInfo info={info} />
              </InfoContainer>
            )}
          </LogoContainer>
          <ExecButton
            disabled={!code || !spec}
            active={active}
            onActivate={_run}
          />
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
      )}
    </>
  );
};
