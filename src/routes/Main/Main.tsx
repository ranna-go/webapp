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
import { Snippets } from 'services/static';
import { EventCode, LogData, Snippet } from '@ranna-go/ranna-ts';
import { SnippetNotification } from './SnippetNotification';
import { useInfo } from 'hooks/useInfo';
import { useIsEmbedded } from 'hooks/useIsEmbedded';
import { Result } from 'types/restapi';

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

const EmbedFooter = styled.div`
  background-color: ${(p) => p.theme.accentDark};
  font-size: 0.7rem;
  padding: 0.2em 0.4em;
  display: flex;
  justify-content: space-between;

  a {
    color: ${(p) => p.theme.text};
  }
`;

export const MainRoute: React.FC = () => {
  const specMap = useSpec();
  const { code, setCode, spec, setSpec, apiKey } = useStore();
  const [snippet, setSnippet] = useQuery('s');
  const { show } = useSnackBar();
  const { run } = useCodeExec();
  const systemInfo = useInfo();
  const isEmbedded = useIsEmbedded();

  const lastSnippetRef = useRef<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [stdOut, setStdOut] = useState('');
  const [stdErr, setStdErr] = useState('');
  const [result, setResult] = useState<Result>();

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
      const s = Object.keys(specMap)[0];
      setSpec(s);
    }

    if (
      specMap &&
      spec &&
      (!code ||
        Object.values(specMap).some(
          (s) => s.example === code.replaceAll('\r\n', '\n')
        ))
    ) {
      setCode(specMap[spec].example);
    }
  }, [spec, specMap]);

  const _run = () => {
    _reset();
    run().subscribe({
      error() {
        setIsRunning(false);
      },
      complete() {
        setIsRunning(false);
      },
      next(e) {
        switch (e?.code) {
          case EventCode.SPAWN:
            setIsRunning(true);
            break;
          case EventCode.LOG:
            {
              const data = e.data as LogData;
              if (data.stdout) setStdOut((v) => v + data.stdout);
              if (data.stderr) setStdOut((v) => v + data.stderr);
            }
            break;
          case EventCode.STOP:
            setResult(e.data as Result);
            break;
        }
      },
    });
  };

  const _reset = () => {
    setStdOut('');
    setStdErr('');
    setResult(undefined);
  };

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
        isActive={isRunning}
        onExec={_run}
        onSnippet={_postSnippet}
        isEmbedded={isEmbedded}
      />
      {settingsOpen && (
        <SettingsModal onClosing={() => setSettingsOpen(false)} />
      )}
      <EditorContainer>
        <Editor
          value={code}
          onChange={setCode}
          selectedLang={specMap[spec]?.language ?? spec}
          readOnly={isEmbedded}
        />
        <ResultViewer
          isRunning={isRunning}
          stdOut={stdOut}
          stdErr={stdErr}
          result={result}
          onClosing={_reset}
        />
      </EditorContainer>
      {isEmbedded && (
        <EmbedFooter>
          <a target="_blank" href={window.location.href} rel="noreferrer">
            Provided with ❤️ by ranna.
          </a>
          <span>
            Spec: <code>{spec}</code>
          </span>
        </EmbedFooter>
      )}
      <SnackBar />
    </Container>
  );
};
