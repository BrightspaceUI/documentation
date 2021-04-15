import { createBasicConfig } from '@open-wc/building-rollup';
import merge from 'deepmerge';
import outputManifest from 'rollup-plugin-output-manifest';

const componentFiles = [
	'./pages/assets/base-imports.js',
	'./pages/assets/demo-snippet-wrapper.js'
];

const baseConfig = createBasicConfig({
	outputDir: 'dist/assets'
});

export default merge(baseConfig, {
	input: componentFiles,
	output: {
		entryFileNames: '[name].js'
	},
	plugins: [outputManifest({
		fileName: '../../pages/_includes/manifest.json',
		publicPath: 'assets/'
	})]
});
