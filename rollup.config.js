import { createBasicConfig } from '@open-wc/building-rollup';
import { default as files } from './src/.generated/rollup-files-generated.js';
import merge from 'deepmerge';

const componentFiles = [
	'./node_modules/@brightspace-ui/core/components/button/button.js', // TODO: remove once actual component docs are added
	'./src/base-imports.js',
	'./src/demo-snippet-wrapper.js'
].concat(files);

const baseConfig = createBasicConfig({
	outputDir: 'assets/js'
});

export default merge(baseConfig, {
	input: componentFiles,
	output: {
		entryFileNames: '[name].js'
	}
});
