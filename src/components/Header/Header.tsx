import { DesktopeView, MobileView } from 'components/ResponsiveViews';
import { Info, InfoModel } from 'components/Info';
import { Option, Select } from 'components/Select';

import { Button } from 'components/Button';
import { ExecButton } from './ExecButton';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { SpecMap } from '@ranna-go/ranna-ts';
import { Switch } from 'components/Switch';
import { displayName } from 'util/spec';
import styled from 'styled-components';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from 'services/store';

interface Props {
  isActive?: boolean;
  info?: InfoModel;
  specMap?: SpecMap;
  isEmbedded?: boolean;
  onOpenSettings?: () => void;
  onExec?: () => void;
  onStop?: () => void;
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

const Container = styled.header`
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
  }
`;

const MobileSelect = styled(MobileView)`
  margin-top: 1em;
  margin-right: 0;
  &,
  & > * {
    width: 100%;
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
  margin-right: 0;
`;

const WSIcon = styled.span`
  font-size: 0.7em;
  font-weight: 900;
  padding-top: 0.3em;
  color: ${(p) => p.theme.text};
`;

export const Header: React.FC<Props> = ({
  info,
  isEmbedded,
  isActive = false,
  specMap = {},
  onOpenSettings = () => {},
  onExec = () => {},
  onStop,
  onSnippet = () => {},
}) => {
  const [spec, setSpec, code, useWS, setUseWS] = useStore(
    useShallow((s) => [s.spec, s.setSpec, s.code, s.useWS, s.setUseWS])
  );

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
            active={isActive}
            onActivate={onExec}
            onStop={onStop}
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
            active={isActive}
            onActivate={onExec}
            onStop={onStop}
          />
          <DesktopeView>
            <Select
              value={spec}
              options={_specOptions}
              onChange={(e) => setSpec(e.currentTarget.value)}
            />
          </DesktopeView>
          <Button icon={'⚙️'} onClick={onOpenSettings}>
            Settings
          </Button>
          <Switch
            enabled={useWS}
            onSwitch={(v) => setUseWS(v)}
            icon={<WSIcon>WS</WSIcon>}
          />
          <RightContainer>
            <Button icon={'🔗'} disabled={!code || !spec} onClick={onSnippet}>
              Share Snippet
            </Button>
          </RightContainer>
          <MobileSelect>
            <Select
              value={spec}
              options={_specOptions}
              onChange={(e) => setSpec(e.currentTarget.value)}
            />
          </MobileSelect>
        </Container>
      )}
    </>
  );
};
