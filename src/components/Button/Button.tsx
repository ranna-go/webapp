import React from 'react';
import styled from 'styled-components';
import { ControlStyle } from 'styles/controls';

type ButtonProps = {
  primary?: boolean;
  icon?: string | JSX.Element;
};

export type Props = React.ButtonHTMLAttributes<any> & ButtonProps;

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

const ChildrenWrapper = styled.span`
  margin-left: 0.5em;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, icon, ...props }, ref) => {
    const _icon = (
      <>{icon && typeof icon === 'string' ? <span>{icon}</span> : icon}</>
    );
    return (
      <StyledButton ref={ref} {...props}>
        {_icon}
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </StyledButton>
    );
  }
);
