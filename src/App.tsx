import { BaseStyles } from '@primer/react';
import { ThemedProvider, useThemeStore } from '@datalayer/primer-addons';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './layout/SiteLayout';
import { HomePage } from './pages/HomePage';
import { IconsPage } from './pages/IconsPage';
import { SvgPage } from './pages/SvgPage';

export function App() {
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
