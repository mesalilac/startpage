import { Plugin } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Buffer } from 'node:buffer';
import type { T_Data } from './src/consts';
import { generate_favicon_url } from './src/utils';

export default function (options: {
    jsonPath: string;
    targetDir: string;
}): Plugin {
    return {
        name: 'vite-plugin-asset-download',
        async buildStart() {
            const { jsonPath, targetDir } = options;

            try {
                await fs.mkdir(targetDir, { recursive: true });

                const resolveJsonPath = path.resolve(process.cwd(), jsonPath);
                const content = await fs.readFile(resolveJsonPath, 'utf-8');
                const data: T_Data = JSON.parse(content);

                for (const section of data.sections) {
                    for (const link of section.links) {
                        const url = new URL(link.url);
                        const filePath = path.resolve(
                            targetDir,
                            url.hostname + '.png',
                        );
                        const faviconUrl = generate_favicon_url(link.url, 16);

                        try {
                            await fs.access(filePath);
                        } catch {
                            // biome-ignore lint/suspicious/noConsole: <off>
                            console.log(
                                `Downloading ${link.name}, ${link.url}...`,
                            );

                            const response = await fetch(faviconUrl);
                            if (!response.ok) return;

                            const buffer = Buffer.from(
                                await response.arrayBuffer(),
                            );

                            await fs.writeFile(filePath, buffer);
                        }
                    }
                }
            } catch (err) {
                this.error(
                    `Failed to download assets: ${(err as Error).message}`,
                );
            }
        },
    };
}
