import { useEffect } from 'react';
import { BaseStyles } from '@primer/react';
import { ThemedProvider, useThemeStore } from '@datalayer/primer-addons';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './layout/SiteLayout';
import { HomePage } from './pages/HomePage';
import { IconsPage } from './pages/IconsPage';
import { SvgPage } from './pages/SvgPage';

export function App() {
  // Apply default theme/colormode (earth + system/auto) when no persisted
  // value exists in localStorage. The store persists under 'datalayer-theme'.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const persisted = window.localStorage.getItem('datalayer-theme');
    if (persisted) return;
    const { setTheme, setColorMode } = useThemeStore.getState();
    setTheme('earth' as Parameters<typeof setTheme>[0]);
    setColorMode('auto');
  }, []);

  return (
    <ThemedProvider useStore={useThemeStore}>
      <BaseStyles>
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/icons" element={<IconsPage />} />
              <Route path="/svg" element={<SvgPage />} />
              <Route path="/svg/:name" element={<SvgPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BaseStyles>
    </ThemedProvider>
  );
}

export default App;
