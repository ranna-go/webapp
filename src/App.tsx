import { useStoredTheme } from 'hooks/useStoredTheme';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { MainRoute } from './routes/Main';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(p) => p.theme.background};
    color: ${(p) => p.theme.text};
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: ${(p) => p.theme.accent};
  }
`;

function App() {
  const { theme } = useStoredTheme();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <MainRoute />
        <GlobalStyle />
      </ThemeProvider>
    </div>
  );
}

export default App;
