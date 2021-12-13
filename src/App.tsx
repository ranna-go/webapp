import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { MainRoute } from './routes/Main';
import { DefaultTheme } from './theme/theme';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(p) => p.theme.background};
    color: ${(p) => p.theme.text};
  }

  * {
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <div>
      <ThemeProvider theme={DefaultTheme}>
        <MainRoute />
        <GlobalStyle />
      </ThemeProvider>
    </div>
  );
}

export default App;
