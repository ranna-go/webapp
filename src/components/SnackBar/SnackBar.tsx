import styled from 'styled-components';
import { TransWithMuchEzCB } from 'styles/default';
import { NotificationType, Props } from './types';
import { useSnackBar, useSnackBarStore } from './useSnackBar';

const BACKGROUND_ID = ':snackbar_background';

type Activatible = { active: boolean };

const Container = styled.div<Activatible & { closable: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  display: flex;
  justify-content: center;
  pointer-events: ${(p) => (p.active ? 'all' : 'none')};
`;

const Notification = styled.div<Props & Activatible>`
  background-color: ${(p) => {
    switch (p.type) {
      case NotificationType.INFO:
        return p.theme.info;
      case NotificationType.SUCCESS:
        return p.theme.success;
      case NotificationType.WARN:
        return p.theme.warn;
      case NotificationType.ERROR:
        return p.theme.error;
    }
  }};

  position: absolute;
  height: fit-content;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 0.2rem 2rem rgba(0 0 0 / 30%);

  bottom: ${(p) => (p.active ? '2rem' : '-2rem')};
  opacity: ${(p) => (p.active ? '1' : '0')};

  ${TransWithMuchEzCB}
  transition: all 0.3s;
`;

export const SnackBar: React.FC = () => {
  const { active, props } = useSnackBarStore();
  const { hide } = useSnackBar();

  const _containerClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!props.closable || (e.target as HTMLElement).id !== BACKGROUND_ID)
      return;
    hide();
  };

  return (
    <Container
      active={active}
      closable={props.closable}
      onMouseDown={_containerClick}
      id={BACKGROUND_ID}
    >
      <Notification active={active} {...props}>
        {props.content}
      </Notification>
    </Container>
  );
};
