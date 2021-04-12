import React from 'react';
import Routes from './routes';
import ThemeContextProvider from './Context/ThemeContext';


function App() {
  return (
    <ThemeContextProvider>
      <Routes/>
    </ThemeContextProvider>
  );
}

export default App;
