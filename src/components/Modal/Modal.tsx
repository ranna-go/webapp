import styled from 'styled-components';

const BACKGROUND_ID = ':background-element';

interface Props {
  heading?: string;
  onClosing?: () => void;
}

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0 0 0 / 70%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: ${(p) => p.theme.accentDark};
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Heading = styled.h2`
  margin-top: 0;
`;

export const Modal: React.FC<Props> = ({
  children,
  heading,
  onClosing = () => {},
}) => {
  const _onBackgroundClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if ((e.target as HTMLElement).id !== BACKGROUND_ID) return;
    onClosing();
  };

  return (
    <Background id={BACKGROUND_ID} onClick={_onBackgroundClick}>
      <Container>
        {heading && <Heading>{heading}</Heading>}
        {children}
      </Container>
    </Background>
  );
};
