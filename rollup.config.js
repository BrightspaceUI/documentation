import { createBasicConfig } from '@open-wc/building-rollup';
import merge from 'deepmerge';

const componentFiles = [
	'./node_modules/@brightspace-ui/core/components/button/button.js',
	'./src/base-imports.js',
	'./src/demo-snippet-wrapper.js'
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
