import { createBasicConfig } from '@open-wc/building-rollup';
import merge from 'deepmerge';
import outputManifest from 'rollup-plugin-output-manifest';

const componentFiles = [
	'./node_modules/@brightspace-ui/core/components/button/button.js',
	'./pages/assets/base-imports.js',
	'./pages/assets/demo-snippet-wrapper.js'
];

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
