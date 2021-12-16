import { Result } from 'hooks/useCodeExec';
import styled from 'styled-components';
import { TransWithMuchEzCB } from 'styles/default';
import { linebreak } from 'util/format';
import { CloseButton } from './CloseButton';

interface Props {
  result?: Result;
  onClosing?: () => void;
}

const Container = styled.div<{ show: boolean }>`
  background-color: ${(p) => p.theme.darkGray};
  font-family: 'Consolas', monospace;
  min-width: 25rem;
  width: fit-content;
  max-width: 50vw;
  position: absolute;
  top: 0;
  height: 100%;
  padding: 1rem;
  box-shadow: 0 0 50px rgba(0 0 0 / 30%);
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  word-break: break-all;

  ${TransWithMuchEzCB}
  transition: all 0.25s;

  right: ${(p) => (p.show ? '0' : '-25rem')};
  opacity: ${(p) => (p.show ? '1' : '0')};

  @media screen and (max-width: 60rem) {
    bottom: ${(p) => (p.show ? '0' : '-5rem')};
    left: 0;
    top: unset;
    right: unset;
    width: 100%;
    max-width: 100%;
    height: fit-content;
    max-height: 50vh;
    overflow-y: scroll;
  }
`;

const PartHeading = styled.p`
  margin: 0 0 0.5em 0;
  text-transform: uppercase;
  font-weight: bolder;
  font-size: 0.9rem;
  opacity: 0.5;
`;

const OutputContainer = styled.div`
  margin-bottom: 1rem;
`;

const ErrContaienr = styled(OutputContainer)`
  color: ${(p) => p.theme.textRed};
`;

const Hint = styled.i`
  opacity: 0.7;
`;

export const ResultViewer: React.FC<Props> = ({
  result,
  onClosing = () => {},
}) => {
  const { stdout, stderr } = result ?? {};

  return (
    <Container show={!!result}>
      <div>
        {stdout && (
          <OutputContainer>
            <PartHeading>stdout</PartHeading>
            <span>{linebreak(stdout)}</span>
          </OutputContainer>
        )}
        {stderr && (
          <ErrContaienr>
            <PartHeading>stderr</PartHeading>
            <span>{linebreak(stderr)}</span>
          </ErrContaienr>
        )}
        {!stdout && !stderr && <Hint>No output.</Hint>}
      </div>
      <CloseButton onClick={onClosing} />
    </Container>
  );
};
