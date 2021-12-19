import styled from 'styled-components';

const BACKGROUND_ID = ':background-element';

interface Props {
  heading?: string | JSX.Element;
  onClosing?: () => void;
}

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0 0 0 / 70%);
  display: flex;
  justify-content: center;
  backdrop-filter: blur(12px);
  z-index: 100;
`;

const Container = styled.div`
  background-color: ${(p) => p.theme.accentDark};
  padding: 1rem;
  border-radius: 0.5rem;
  margin: auto;
  margin-top: 20vh;

  // Prohibit collissions into bottom edge
  // when on low-height screens.
  @media screen and (max-height: 600px) {
    margin-top: auto;
  }
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
    <Background id={BACKGROUND_ID} onMouseDown={_onBackgroundClick}>
      <Container>
        {heading && <Heading>{heading}</Heading>}
        {children}
      </Container>
    </Background>
  );
};
