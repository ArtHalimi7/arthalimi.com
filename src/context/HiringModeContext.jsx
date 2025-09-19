import { createContext, useContext, useState, useEffect } from 'react';

const HiringModeContext = createContext(null);

export function HiringModeProvider({ children }) {
  const [hiringMode, setHiringMode] = useState(() => {
    try {
      const v = localStorage.getItem('hiringMode');
      return v === '1';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hiringMode', hiringMode ? '1' : '0');
    } catch (e) {}
  }, [hiringMode]);

  return (
    <HiringModeContext.Provider value={{ hiringMode, setHiringMode }}>
      {children}
    </HiringModeContext.Provider>
  );
}

export function useHiringMode() {
  const ctx = useContext(HiringModeContext);
  if (!ctx) throw new Error('useHiringMode must be used inside HiringModeProvider');
  return ctx;
}

export default HiringModeContext;
