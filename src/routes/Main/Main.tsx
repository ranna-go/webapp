import styled from 'styled-components';
import { Header } from 'components/Header';
import { useSpec } from 'hooks/useSpec';

interface Props {}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export const MainRoute: React.FC<Props> = ({}) => {
  const spec = useSpec();

  return (
    <Container>
      <Header spec={spec} />
    </Container>
  );
};
