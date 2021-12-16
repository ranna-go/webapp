import styled from 'styled-components';
import { Header } from 'components/Header';
import { useSpec } from 'hooks/useSpec';
import { Editor } from 'components/Editor';
import { useState } from 'react';
import { SettingsModal } from 'components/SettingsModal';
import { useStore } from 'services/store';
import { useCodeExec } from 'hooks/useCodeExec';
import { ResultViewer } from 'components/ResultViewer';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`;

export const MainRoute: React.FC = () => {
  const specMap = useSpec();

  const spec = useStore((s) => s.spec);
  const [code, setCode] = useStore((s) => [s.code, s.setCode]);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { run, result, reset } = useCodeExec();

  return (
    <Container>
      <Header
        onOpenSettings={() => setSettingsOpen(true)}
        specMap={specMap}
        onRun={run}
      />
      {settingsOpen && (
        <SettingsModal onClosing={() => setSettingsOpen(false)} />
      )}
      <EditorContainer>
        <Editor value={code} onChange={setCode} selectedLang={spec} />
        <ResultViewer result={result} onClosing={reset} />
      </EditorContainer>
    </Container>
  );
};
