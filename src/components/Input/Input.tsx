import React from 'react';
import styled from 'styled-components';
import { InputStyle } from 'styles/controls';

type Props = React.InputHTMLAttributes<any> & {};

const StyledInput = styled.input`
  ${InputStyle}

  cursor: text;

  transition: all 0.25s ease;
`;

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref) => {
    return <StyledInput {...props} ref={ref} />;
  }
);
