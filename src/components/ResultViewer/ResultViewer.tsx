import styled from 'styled-components';
import { TransWithMuchEzCB } from 'styles/default';
import { linebreak } from 'util/format';
import { CloseButton } from './CloseButton';
import { format } from 'date-fns';
import { Result } from 'types/restapi';

interface Props {
  stdOut: string;
  stdErr: string;
  isRunning: boolean;
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
    overflow-y: auto;
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

const CacheHint = styled(Hint)`
  font-size: 0.8em;
`;

export const ResultViewer: React.FC<Props> = ({
  stdOut,
  stdErr,
  isRunning,
  result,
  onClosing = () => {},
}) => {
  const { from_cache, cache_date } = result ?? {};

  const _show = isRunning || !!stdOut || !!stdErr || !!result;

  const emptyHint = (isRunning && <Hint>Awaiting output...</Hint>) || (
    <Hint>No output.</Hint>
  );

  return (
    <Container show={_show}>
      <div>
        {stdOut && (
          <OutputContainer>
            <PartHeading>stdout</PartHeading>
            <span>{linebreak(stdOut)}</span>
          </OutputContainer>
        )}
        {stdErr && (
          <ErrContaienr>
            <PartHeading>stderr</PartHeading>
            <span>{linebreak(stdErr)}</span>
          </ErrContaienr>
        )}
        {from_cache && (
          <CacheHint>
            Cached result (
            {format(new Date(cache_date!), 'yyyy/MM/dd - HH:mm:ss')}).
          </CacheHint>
        )}
        {!stdOut && !stdErr && emptyHint}
      </div>
      <CloseButton onClick={onClosing} />
    </Container>
  );
};
