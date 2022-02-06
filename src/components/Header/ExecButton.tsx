import { Button, Props as ButtonProps } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { useState } from 'react';

interface Props extends ButtonProps {
  active: boolean;
  onActivate: () => void;
  onStop?: () => void;
}

export const ExecButton: React.FC<Props> = ({
  active,
  onActivate,
  onStop,
  ...props
}) => {
  const [hover, setHover] = useState(false);

  const _onClick = () => {
    if (!active) onActivate();
    else if (onStop) onStop();
  };

  const _icon = active ? (hover && !!onStop ? '🚫' : '') : '▶';
  const _content = active ? hover && !!onStop ? 'Stop' : <Spinner /> : <>Run</>;

  return (
    <Button
      {...props}
      primary
      onClick={_onClick}
      icon={_icon}
      ignoreScaling={active}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {_content}
    </Button>
  );
};
