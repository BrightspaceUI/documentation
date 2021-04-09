import { createBasicConfig } from '@open-wc/building-rollup';
import merge from 'deepmerge';

const componentFiles = [
	'./src/base-imports.js'
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
