import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import assetDownload from './vite-plugin-asset-download';

import path from 'node:path';

export default defineConfig(({ mode }) => {
    const isDev = mode === 'development';
    const jsonFileName = isDev ? 'data.dev.json' : 'data.json';
    const jsonPath = `./public/${jsonFileName}`;

    return {
        plugins: [
            devtools(),
            solidPlugin(),
            tsconfigPaths(),
            assetDownload({
                jsonPath: jsonPath,
                targetDir: './public/favicon',
            }),
        ],
        server: {
            port: 3000,
        },
        build: {
            target: 'esnext',
        },
        resolve: {
            alias: {
                '@data': path.resolve(__dirname, jsonPath),
            },
        },
    };
});
