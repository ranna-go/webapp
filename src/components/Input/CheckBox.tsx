import React from 'react';
import styled from 'styled-components';
import { BorderRadius } from 'styles/default';
import { Input } from '.';

type Props = React.InputHTMLAttributes<any> & {};

const StyledLabel = styled.label`
  ${BorderRadius}

  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${(p) => p.theme.darkGray};
  }
`;

const CheckBoxInput = styled(Input)`
  margin-right: 0.5em;
  width: fit-content;
  cursor: inherit;

  outline: none !important;
`;

export const CheckBox = React.forwardRef<HTMLLabelElement, Props>(
  ({ children, className, style, ...props }, ref) => {
    return (
      <StyledLabel ref={ref} className={className} style={style}>
        <CheckBoxInput type="checkbox" {...props} />
        {children}
      </StyledLabel>
    );
  }
);
