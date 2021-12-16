import React from 'react';
import styled from 'styled-components';
import { InputStyle } from 'styles/controls';

type Props = React.TextareaHTMLAttributes<any> & {};

const StyledTextArea = styled.textarea`
  ${InputStyle}

  min-width: 100%;
  max-width: 100%;
`;

export const TextBox = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ ...props }, ref) => {
    return <StyledTextArea {...props} ref={ref} />;
  }
);
