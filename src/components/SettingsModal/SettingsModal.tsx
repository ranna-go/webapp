import { Input } from 'components/Input/Input';
import { Modal } from 'components/Modal';

interface Props {}

export const SettingsModal: React.FC<Props> = ({}) => {
  return (
    <Modal heading="Settings">
      <Input />
    </Modal>
  );
};
