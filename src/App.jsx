import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import TaxHarvesting from './components/TaxHarvesting';
import './styles/components.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Header />
        <TaxHarvesting />
      </div>
    </ThemeProvider>
  );
}

export default App;
