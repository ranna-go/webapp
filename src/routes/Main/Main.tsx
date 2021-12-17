import styled from 'styled-components';
import { Header } from 'components/Header';
import { useSpec } from 'hooks/useSpec';
import { Editor } from 'components/Editor';
import { useEffect, useRef, useState } from 'react';
import { SettingsModal } from 'components/SettingsModal';
import { useStore } from 'services/store';
import { useCodeExec } from 'hooks/useCodeExec';
import { ResultViewer } from 'components/ResultViewer';
import { NotificationType, SnackBar } from 'components/SnackBar';
import { useSnackBar } from 'components/SnackBar/useSnackBar';
import { useQuery } from 'hooks/useQuery';
import { Ranna, Snippets } from 'services/client';
import { Snippet } from '@ranna-go/ranna-ts';
import { SnippetNotification } from './SnippetNotification';
import { useInfo } from 'hooks/useInfo';

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
  const { code, setCode, spec, setSpec, apiKey } = useStore();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [snippet, setSnippet] = useQuery('s');
  const { show } = useSnackBar();
  const { run, result, reset } = useCodeExec();
  const systemInfo = useInfo();
  const lastSnippetRef = useRef<string>('');

  useEffect(() => {
    if (snippet) {
      Snippets.get(snippet)
        .then((s) => {
          setCode(s.code);
          lastSnippetRef.current = s.code;
          setSpec(s.language);
        })
        .catch((e) => {
          if (e.code === 404)
            show(
              'No snippet with this ID was found or it has been removed.',
              NotificationType.ERROR,
              6000
            );
          else {
            show(
              <span>
                An unexpected error occured on loading the snippet.
                <br />
                Please try again later.
              </span>,
              NotificationType.ERROR,
              6000
            );
            console.error(e);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (!spec && specMap) {
      setSpec(Object.keys(specMap)[0]);
    }
  }, [spec, specMap]);

  const _postSnippet = async () => {
    if (snippet && code === lastSnippetRef.current) {
      show(<SnippetNotification ident={snippet} />, NotificationType.INFO, 0);
      return;
    }
    Snippets.clientOptions.auth = apiKey ? `bearer ${apiKey}` : '';
    try {
      const res = await Snippets.create({
        code,
        language: spec,
      } as Snippet);
      setSnippet(res.ident);
      lastSnippetRef.current = code;
      show(<SnippetNotification ident={res.ident} />, NotificationType.INFO, 0);
    } catch {}
  };

  return (
    <Container>
      <Header
        onOpenSettings={() => setSettingsOpen(true)}
        specMap={specMap}
        info={systemInfo}
        onRun={run}
        onSnippet={_postSnippet}
      />
      {settingsOpen && (
        <SettingsModal onClosing={() => setSettingsOpen(false)} />
      )}
      <EditorContainer>
        <Editor value={code} onChange={setCode} selectedLang={spec} />
        <ResultViewer result={result} onClosing={reset} />
      </EditorContainer>
      <SnackBar />
    </Container>
  );
};
