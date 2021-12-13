import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle``;

function App() {
  return (
    <div>
      <Router></Router>
      <GlobalStyle />
    </div>
  );
}

export default App;
