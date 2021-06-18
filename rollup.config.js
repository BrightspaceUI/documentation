import { default as files } from './.generated/rollup-files-generated.js';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import outputManifest from 'rollup-plugin-output-manifest';
import resolve from '@rollup/plugin-node-resolve';

const componentFiles = [
	'./pages/assets/base-imports.js',
	'./pages/assets/demo-snippet.js',
	'./pages/assets/navigation.js',
	'./pages/assets/status-table.js'
].concat(files);

export default [
	{
		input: componentFiles,
		output: {
			entryFileNames: '[hash].js',
			chunkFileNames: '[hash].js',
			assetFileNames: '[hash][extname]',
			dir: '_site/assets',
			format: 'esm',
		},
		plugins: [
			outputManifest({
				fileName: '../../pages/_includes/manifest.json',
				publicPath: 'assets/'
			}),
			resolve(),
			importMetaAssets()
		]
	},
];
