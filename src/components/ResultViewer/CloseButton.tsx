import { Button } from 'components/Button';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

type Props = React.ButtonHTMLAttributes<any>;

const StyledButton = styled(Button)`
  padding: 0.2rem;

  background-color: transparent;

  > * {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0;
    display: block;
  }

  &:hover {
    background-color: ${(p) => p.theme.accentDark};
  }
`;

export const CloseButton: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledButton {...props}>
      <CloseIcon />
    </StyledButton>
  );
};
