// hooks/useTheme.js
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function useCustomTheme() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default theme ko "light" ya "dark" set karo jab tak mount na ho
  const currentTheme = mounted ? (theme === 'system' ? systemTheme : theme) : 'light';

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return { currentTheme, toggleTheme };
}
