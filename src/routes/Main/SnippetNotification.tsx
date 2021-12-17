import { Input } from 'components/Input';
import styled from 'styled-components';

interface Props {
  ident: string;
}

const Contaienr = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    margin-bottom: 0.4em;
  }

  &,
  > * {
    text-align: center;
    margin: auto;
  }
`;

const StyledInput = styled(Input)<{ contentLen: number }>`
  min-width: ${(p) => p.contentLen + 'ch'};
  width: 100%;
`;

export const SnippetNotification: React.FC<Props> = ({ ident }) => {
  const url = `${window.location.origin}/?s=${ident}`;
  return (
    <Contaienr>
      <span>You can use this link to share the snippet.</span>
      <StyledInput
        contentLen={url.length}
        value={url}
        readOnly
        autoFocus
        onFocus={(e) => e.target.select()}
      />
    </Contaienr>
  );
};
