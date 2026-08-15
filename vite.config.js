import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
// In this monorepo, `@datalayer/primer-addons` resolves to its own workspace
// folder which ships its own nested `node_modules` (its own copies of
// `@primer/react`, `styled-components`, `react`, ...). Without deduping, the
// production build bundles TWO physical copies of these packages, producing two
// separate React/styled-components `ThemeProvider` contexts. The theme set by
// primer-addons then never reaches the app's `<Box sx={...}>` components, so
// `sx` theme tokens (bg/border colors) resolve to `undefined` — which is why
// the deployed site loses theming/shows default borders while dev looks fine.
// Forcing a single instance of each shared package fixes it.
var dedupe = [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@primer/react',
    '@primer/react-brand',
    '@primer/octicons-react',
    '@primer/primitives',
    'styled-components',
    'zustand',
];
var optimizeInclude = dedupe.filter(function (id) { return id !== '@primer/primitives'; });
export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {},
        }),
    ],
    resolve: {
        dedupe: dedupe,
    },
    optimizeDeps: {
        include: optimizeInclude,
    },
});
