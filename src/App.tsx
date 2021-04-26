import Editor from '@monaco-editor/react';
import {
  ExecutionResponse,
  SpecMap,
  StringMap,
} from '@ranna-go/ranna-ts/dist/models';
import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.scss';
import Footer from './components/Footer';
import ResultViewer from './components/ResultViewer';
import Spinner from './components/Spinner';
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

  const langs = Object.keys(specs).map((l) => <option key={l}>{l}</option>);
  return (
    <div className="container">
      <div className="app-container">
        <div className="controls">
          <select
            className="lang"
            onChange={(v) => setSelectedLang(v.target.value)}
            value={selectedLang}
          >
            {langs}
          </select>
          <button className="run" onClick={run} disabled={isExecuting}>
            ▶
          </button>
        </div>
        <Editor
          height="45vh"
          language={mapLang(selectedLang)}
          theme="vs-dark"
          onChange={(v) => setCode(v!)}
        ></Editor>
        {isExecuting && <Spinner />}
        <ResultViewer res={execRes} />
      </div>
      <Footer />
    </div>
  );
}

function mapLang(lang: string): string {
  return langMap[lang] ?? lang;
}

export default App;
