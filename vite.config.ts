import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import assetDownload from './vite-plugin-asset-download';

import path from 'node:path';

export default defineConfig({
    plugins: [
        devtools(),
        solidPlugin(),
        tsconfigPaths(),
        assetDownload({
            jsonPath: `./public/data.json`,
            targetDir: './public/favicon',
        }),
    ],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
        emptyOutDir: true,
    },
});
