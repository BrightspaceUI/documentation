import { createBasicConfig } from '@open-wc/building-rollup';

const componentFiles = [
	'./src/base-imports.js',
	'./src/interactive-demo.js',
	'./node_modules/@brightspace-ui/core/components/demo/demo-snippet.js',
	'./node_modules/@brightspace-ui/core/components/inputs/input-date.js'
];

const config = createBasicConfig({
	developmentMode: false,
	legacyBuild: true,
	outputDir: 'assets/js'
});
config.input = componentFiles;
config.output[0].entryFileNames = '[name].js';
config.output[0].chunkFileNames = '[name].js';
config.output[1].entryFileNames = 'nomodule-[name].js';
config.output[1].chunkFileNames = 'nomodule-[name].js';

export default config;
