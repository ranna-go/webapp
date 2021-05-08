import './Header.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Info from '../info/Info';
import { SystemInfo } from '@ranna-go/ranna-ts/dist/models';
import ExecButton from '../exec-button/ExecButton';

interface HeaderProperties {
  info: SystemInfo;
  languages: string[];
  selectedLanguage: string;
  isExecuting?: boolean;
  disabled?: boolean;

  onLanguageSelect?: (v: string) => void;
  onExecute?: () => void;
  onShare?: () => void;
  onReset?: () => void;
}

export default function Header(props: HeaderProperties) {
  const options = props.languages.map((l) => <option key={l}>{l}</option>);
  return (
    <div className="header">
      <div className="logo">
        <Logo />
        <div className="logo-info-container">
          <div className="spacer"></div>
          <Info info={props.info} onReset={props.onReset} />
        </div>
      </div>
      <ExecButton
        disabled={props.disabled}
        isExecuting={props.isExecuting}
        onExecute={props.onExecute}
      />
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
        🔗
        <span className="hide-mobile">&nbsp;share snippet</span>
      </button>
    </div>
  );
}
