import React from 'react';
import styled from 'styled-components';

type Props = React.HTMLAttributes<any> & {
  icon?: JSX.Element;
  iconEnabled?: JSX.Element;
  iconDisabled?: JSX.Element;
  enabled: boolean;
  onSwitch: (v: boolean) => void;
};

const HEIGHT = '1.5rem';

const Container = styled.button<{ enabled: boolean }>`
  height: ${HEIGHT};
  width: calc(${HEIGHT} * 2);
  border-radius: ${HEIGHT};
  background-color: ${(p) => p.theme.darkGray};
  border: none;
  padding: none;
  cursor: pointer;
  display: flex;
  padding: 0;
  outline-style: solid;
  outline-color: ${(p) => p.theme.accent};
  outline-width: ${(p) => (p.enabled ? '3px' : '0px')};
`;

const Nob = styled.div<{ enabled: boolean }>`
  height: ${HEIGHT};
  width: ${HEIGHT};
  border-radius: ${HEIGHT};
  background-color: ${(p) => p.theme.accent};
  margin-left: ${(p) => (p.enabled ? '50%' : '0%')};
  position: relative;

  &,
  > * {
    transition: all 0.25s ease;
  }

  > * {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0.2rem;

    &:first-child {
      opacity: ${(p) => (p.enabled ? '1' : '0')};
    }
    &:last-child {
      opacity: ${(p) => (p.enabled ? '0' : '1')};
    }
  }
`;

export const Switch = React.forwardRef<HTMLButtonElement, Props>(
  ({ icon, iconEnabled, iconDisabled, enabled, onSwitch, ...props }, ref) => {
    const _onSwitch = () => onSwitch(!enabled);
    const _iconEnabled = iconEnabled ?? icon;
    const _iconDisabled = iconDisabled ?? icon;
    return (
      <Container {...props} enabled={enabled} ref={ref} onClick={_onSwitch}>
        <Nob enabled={enabled}>
          {_iconEnabled}
          {_iconDisabled}
        </Nob>
      </Container>
    );
  }
);
