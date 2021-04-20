import { createBasicConfig } from '@open-wc/building-rollup';
import { default as files } from './src/.generated/rollup-files-generated.js';
import merge from 'deepmerge';
import outputManifest from 'rollup-plugin-output-manifest';

const componentFiles = [
	'./node_modules/@brightspace-ui/core/components/button/button.js', // TODO: remove once actual component docs are added
	'./pages/assets/base-imports.js',
	'./pages/assets/demo-snippet-wrapper.js'
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
