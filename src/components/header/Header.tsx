import Spinner from '../spinner/Spinner';
import './Header.scss';

interface HeaderProperties {
  languages: string[];
  selectedLanguage: string;
  isExecuting?: boolean;
  disabled?: boolean;

  onLanguageSelect?: (v: string) => void;
  onExecute?: () => void;
  onShare?: () => void;
}

export default function Header(props: HeaderProperties) {
  const options = props.languages.map((l) => <option key={l}>{l}</option>);
  return (
    <div className="header">
      <button
        className="execute"
        disabled={props.disabled}
        onClick={() => props.onExecute?.call(null)}
      >
        {props.isExecuting ? <Spinner /> : <span>▶ execute</span>}
      </button>
      <select
        value={props.selectedLanguage}
        onChange={(e) => props.onLanguageSelect?.call(null, e.target.value)}
      >
        {options}
      </select>
      <button
        className="share"
        disabled={props.disabled}
        onClick={() => props.onShare?.call(null)}
      >
        🔗 share snippet
      </button>
    </div>
  );
}
