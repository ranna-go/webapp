import React from 'react';
import styled from 'styled-components';
import { InputStyle } from 'styles/controls';

export interface Option {
  value: any;
  displayName?: string;
  id?: any;
}

type Props = React.SelectHTMLAttributes<any> & {
  options: Option[];
};

const StyledSelect = styled.select`
  ${InputStyle}

  width: fit-content;
  cursor: pointer;
`;

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ options, ...props }, ref) => {
    const _options = options.map(({ displayName, value, id }) => (
      <option key={id ?? value} value={value}>
        {displayName ?? value}
      </option>
    ));

    return (
      <StyledSelect ref={ref} {...props}>
        {_options}
      </StyledSelect>
    );
  }
);
