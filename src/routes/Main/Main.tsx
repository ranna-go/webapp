import styled from 'styled-components';
import { Header } from 'components/Header';
import { useSpec } from 'hooks/useSpec';
import { Editor } from 'components/Editor';
import { useState } from 'react';

interface Props {}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainRoute: React.FC<Props> = ({}) => {
  const specMap = useSpec();

  const [code, setCode] = useState('');
  const [spec, setSpec] = useState('');

  return (
    <Container>
      <Header spec={specMap} onSelectSpec={setSpec} />
      <Editor value={code} onChange={setCode} selectedLang={spec} />
    </Container>
  );
};
