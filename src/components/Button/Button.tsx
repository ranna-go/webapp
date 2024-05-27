import { ControlStyle } from 'styles/controls';
import React from 'react';
import styled from 'styled-components';

const SWITCH_WIDTH = '52em';

type ChildrenWrapperProps = {
  ignoreScaling?: boolean;
  hasIcon?: boolean;
};

type ButtonProps = ChildrenWrapperProps & {
  primary?: boolean;
  icon?: string | JSX.Element;
};

export type Props = React.PropsWithChildren &
  React.ButtonHTMLAttributes<any> &
  ButtonProps;

const StyledButton = styled.button<ButtonProps>`
  ${ControlStyle}

  text-transform: uppercase;
  background-color: ${(p) => (p.primary ? p.theme.accent : p.theme.gray)};

  &:hover {
    background-color: ${(p) =>
      p.primary ? p.theme.accentLight : p.theme.accent};
  }

  &:disabled {
    background-color: ${(p) => (p.primary ? p.theme.accent : p.theme.gray)};
  }
`;

const ChildrenWrapper = styled.span<ChildrenWrapperProps>`
  margin-left: ${(p) => (p.hasIcon ? '0.5em' : '0')};

  @media screen and (max-width: ${SWITCH_WIDTH}) {
    display: ${(p) => (p.ignoreScaling ? '' : 'none')};
  }
`;

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, icon, ignoreScaling, ...props }, ref) => {
    const _icon = icon ?? typeof icon === 'string' ? <span>{icon}</span> : icon;
    return (
      <StyledButton ref={ref} {...props}>
        {_icon}
        <ChildrenWrapper ignoreScaling={ignoreScaling} hasIcon={!!_icon}>
          {children}
        </ChildrenWrapper>
      </StyledButton>
    );
  }
);
