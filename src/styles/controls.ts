import { css } from 'styled-components';
import { BorderRadius } from './default';

export const ControlStyle = css`
  ${BorderRadius}

  display: flex;
  font-family: 'Poppins', sans-serif;
  color: ${(p) => p.theme.text};
  font-size: 1rem;
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0.3em 0.8em;
  height: fit-content;
  transition: all 0.25s ease;

  background-color: ${(p) => p.theme.gray};

  &:disabled {
    opacity: 0.5;
    background-color: ${(p) => p.theme.gray};
    cursor: not-allowed;
  }
`;

export const InputStyle = css`
  ${ControlStyle}

  background-color: ${(p) => p.theme.darkGray};
  cursor: text;
  width: 100%;

  &:focus {
    outline: solid white 1px;
  }
`;
