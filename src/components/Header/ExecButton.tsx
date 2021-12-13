import { Button, Props as ButtonProps } from 'components/Button';
import { Spinner } from 'components/Spinner';

interface Props extends ButtonProps {
  active: boolean;
  onActivate: () => void;
}

export const ExecButton: React.FC<Props> = ({
  active,
  onActivate,
  ...props
}) => {
  const _onClick = () => {
    if (!active) onActivate();
  };

  return (
    <Button {...props} primary onClick={_onClick} icon={active ? '' : '▶'}>
      {active ? <Spinner /> : <>Run</>}
    </Button>
  );
};
