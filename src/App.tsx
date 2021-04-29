import Editor from '@monaco-editor/react';
import { ExecutionResponse, SpecMap, StringMap } from '@ranna-go/ranna-ts';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.scss';
import Header from './components/header/Header';
import ResultViewer from './components/result-viewer/ResultViewer';
import client from './services/client';

const langMap: StringMap = {
  'python3': 'python',
  'openjdk-11': 'java',
};

function App() {
  const [specs, setSpecs] = useState({} as SpecMap);
  const [selectedLang, setSelectedLang] = useState('');
  const [code, setCode] = useState('');
  const [execRes, setExecRes] = useState({} as ExecutionResponse);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    client.spec().then((res) => {
      setSpecs(res);
      setSelectedLang(Object.keys(res)[0]);
    });
  }, []);

  async function run() {
    if (!isExecuting && code && selectedLang) {
      setIsExecuting(true);
      setExecRes({} as ExecutionResponse);
      try {
        const res = await client.exec({ language: selectedLang, code: code });
        setExecRes(res);
      } catch {}
      setIsExecuting(false);
    }
  }

  return (
    <div className="container">
      <Header
        languages={Object.keys(specs) ?? []}
        selectedLanguage={selectedLang}
        onLanguageSelect={(v) => setSelectedLang(v)}
        onExecute={() => run()}
        isExecuting={isExecuting}
        execDisabled={!code}
      />
      <Editor
        height="calc(100vh - 105px)"
        language={mapLang(selectedLang)}
        theme="vs-dark"
        onChange={(v) => setCode(v!)}
        wrapperClassName="code-editor"
      ></Editor>
      <ResultViewer res={execRes} />
    </div>
  );
}

function mapLang(lang: string): string {
  return langMap[lang] ?? lang;
}

export default App;
