import React from 'react';
import { Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import TaxHarvesting from './TaxHarvesting';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="logo">
        Koin<span>X</span>
        <span style={{ fontSize: '12px', fontWeight: '400', color: 'var(--text-muted)', marginLeft: '4px', verticalAlign: 'super' }}>TM</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button style={{ color: 'var(--text-main)' }}>
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
