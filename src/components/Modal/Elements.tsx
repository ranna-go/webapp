import styled from 'styled-components';

interface Props {}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;
  > * {
    margin-left: 0.5em;
    &:first-child {
      margin-left: auto;
    }
  }
`;

export const Controls: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};
