import { createBasicConfig } from '@open-wc/building-rollup';
import merge from 'deepmerge';

const componentFiles = [
	'./src/base-imports.js',
	'./node_modules/@brightspace-ui/core/components/demo/demo-snippet.js'
];

const baseConfig = createBasicConfig({
	outputDir: 'assets/js'
});

export default merge(baseConfig, {
	input: componentFiles,
	output: {
		entryFileNames: '[name].js'
	}
});
