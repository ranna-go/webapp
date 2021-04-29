import React from 'react';
import Spinner from '../spinner/Spinner';
import './Header.scss';

interface HeaderProperties {
  languages: string[];
  selectedLanguage: string;
  onLanguageSelect?: (v: string) => void;
  onExecute?: () => void;
  isExecuting?: boolean;
  execDisabled?: boolean;
}

export default function Header(props: HeaderProperties) {
  const options = props.languages.map((l) => <option key={l}>{l}</option>);
  return (
    <div className="header">
      <button
        className="execute"
        disabled={props.execDisabled}
        onClick={() => props.onExecute?.call(null)}
      >
        {props.isExecuting ? <Spinner /> : <span>execute</span>}
      </button>
      <select
        value={props.selectedLanguage}
        onChange={(e) => props.onLanguageSelect?.call(null, e.target.value)}
      >
        {options}
      </select>
    </div>
  );
}
