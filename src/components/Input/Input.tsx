import React from 'react';
import styled from 'styled-components';
import { ControlStyle } from 'styles/controls';

type Props = React.InputHTMLAttributes<any> & {};

const StyledInput = styled.input`
  ${ControlStyle}

  cursor: text;
`;

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref) => {
    return <StyledInput />;
  }
);
