import { css } from 'styled-components';

export const ControlStyle = css`
  display: flex;
  font-family: 'Poppins', sans-serif;
  color: ${(p) => p.theme.text};
  font-size: 1rem;
  border-radius: 0.25em;
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0.3em 0.8em;
  transition: all 0.25s ease;

  background-color: ${(p) => p.theme.gray};

  &:disabled {
    opacity: 0.5;
    background-color: ${(p) => p.theme.gray};
    cursor: not-allowed;
  }
`;
