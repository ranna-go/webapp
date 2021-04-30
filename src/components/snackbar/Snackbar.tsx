import './Snackbar.scss';

interface SnackbarProps {
  show?: boolean;
  children?: JSX.Element | JSX.Element[];
  color?: string;
  onHide?: () => void;
}

export default function Snackbar(props: SnackbarProps) {
  function onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if ((e.target as HTMLElement).id === 'snackbar-outer-container') {
      props.onHide?.call(null);
    }
  }

  return (
    <div
      id="snackbar-outer-container"
      className={props.show ? ' show' : ''}
      onClick={(e) => onClick(e)}
    >
      <div
        className="snackbar-container"
        style={{
          backgroundColor: props.color ?? '#2196F3',
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
