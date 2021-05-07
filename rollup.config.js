import { createBasicConfig } from '@open-wc/building-rollup';
import { default as files } from './.generated/rollup-files-generated.js';
import merge from 'deepmerge';
import outputManifest from 'rollup-plugin-output-manifest';

const componentFiles = [
	'./pages/assets/base-imports.js',
	'./pages/assets/code-view-wrapper.js',
	'./pages/assets/demo-snippet-wrapper.js',
	'./pages/assets/navigation.js'
].concat(files);

const baseConfig = createBasicConfig({
	outputDir: '_site/assets'
});

export default merge(baseConfig, {
	input: componentFiles,
	plugins: [outputManifest({
		fileName: '../../pages/_includes/manifest.json',
		publicPath: 'assets/'
	})]
});
