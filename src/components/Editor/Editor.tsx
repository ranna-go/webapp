import MonacoEditor from '@monaco-editor/react';
import styled from 'styled-components';
import { useStoredTheme } from 'hooks/useStoredTheme';

interface Props {
  selectedLang: string;
  value: string;
  readOnly?: boolean;
  onChange?: (v: string) => void;
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;

  > * {
    padding: 1rem 0 0 0;
    height: calc(100% - 1.5rem) !important;
    box-sizing: border-box;
  }
`;

export const Editor: React.FC<Props> = ({
  selectedLang,
  value,
  readOnly = false,
  onChange = () => {},
}) => {
  const { editorTheme } = useStoredTheme();

  return (
    <Wrapper>
      <MonacoEditor
        language={selectedLang}
        theme={editorTheme}
        value={value}
        onChange={(v) => onChange(v!)}
        options={{
          minimap: { enabled: false },
        }}
      />
    </Wrapper>
  );
};
