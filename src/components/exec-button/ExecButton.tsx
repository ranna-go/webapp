import './ExecButton.scss';
import Spinner from '../spinner/Spinner';

interface ExecButtonProperties {
  disabled?: boolean;
  isExecuting?: boolean;
  floating?: boolean;
  onExecute?: () => void;
}

export default function ExecButton(props: ExecButtonProperties) {
  return (
    <button
      className={'btn-execute' + (props.floating ? ' floating' : '')}
      disabled={props.disabled}
      onClick={() => props.onExecute?.call(null)}
    >
      {props.isExecuting ? (
        <Spinner />
      ) : (
        [
          <span key="icon">▶</span>,
          <span key="text" className={props.floating ? '' : 'hide-mobile'}>
            &nbsp;execute
          </span>,
        ]
      )}
    </button>
  );
}
