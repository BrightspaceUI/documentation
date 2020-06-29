import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs';
import marked from 'marked';
import path from 'path';
import { siteStructure } from '../data/structure.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '../.generated');

function createComponentRenderer(tagName) {
	let isExampleBlock = false;
	const defaultRenderer = new marked.Renderer();
	const componentRenderer = {
		code(code, infostring, escaped) {
			if (isExampleBlock) {
				isExampleBlock = false;
				return `<d2l-design-system-interactive-demo code="${escape(code)}" tag-name="${tagName}"></d2l-design-system-interactive-demo>`;
			}
			return defaultRenderer.code(code, infostring, escaped);
		},
		heading(text, level, raw, slugger) {
			if (text === 'Examples') {
				isExampleBlock = true;
			}
			return defaultRenderer.heading(text, level, raw, slugger);
		}
	};
	return componentRenderer;
}

function _parseFile(fileName) {
	const file = fs.readFileSync(fileName).toString();
	return JSON.parse(file);
}

function copyComponents() {
	const filePaths = [
		'../node_modules/@brightspace-ui/core/custom-elements.json',
		'../node_modules/d2l-facet-filter-sort/custom-elements.json'
	];
	let tags = [];
	filePaths.forEach((filePath) => {
		const customElementsFilePath = path.join(__dirname, filePath);
		if (!fs.existsSync(customElementsFilePath)) return;
		const parsed = _parseFile(customElementsFilePath);
		tags = tags.concat(parsed.tags);
	});
	const json = JSON.stringify(tags, null, '\t');
	const fileContent = `/* eslint quotes: 0 */

export default ${json};
`;
	const outputPath = path.join(outputDir, 'component-doc-details.js');
	fs.writeFileSync(outputPath, fileContent, 'utf8');
}

function renderMarkdownPage(item) {

	const inputPath = path.join(__dirname, '../', item.path);
	const relativePath = `${item.path.substring(0, item.path.length - 3)}.js`;
	const outputPath = path.join(outputDir, relativePath);

	const dirname = path.dirname(outputPath);
	fs.mkdirSync(dirname, {recursive: true});

	const isComponent = item.subtype === 'component';
	marked.use({
		renderer: isComponent ? createComponentRenderer(item.data.tagName) : null
	});
	const markdownString = fs.readFileSync(inputPath).toString();
	const htmlContent = marked(markdownString);

	const output = `import { html } from 'lit-html';
export const val = html\`
		${htmlContent}\`;
`;
	fs.writeFileSync(outputPath, output, 'utf8');

	return relativePath;

}

function renderMarkdownPages(items) {

	const paths = [];

	items.forEach((item) => {
		if (item.type === 'markdown' && item.path) {
			paths.push(renderMarkdownPage(item));
		}
		if (item.children) {
			paths.push(...renderMarkdownPages(item.children));
		}
	});

	return paths;

}

function createStaticPageLoader(paths) {
	const outputPath = path.join(outputDir, 'pages', 'pageLoader.js');
	const output = `
export function loadPage(path) {
	switch (path) {
		${paths.map((p) => `case '/${p}':
			return import('./${p.substring(6)}');
		`).join('')}
	}
}
`;
	const dirname = path.dirname(outputPath);
	fs.mkdirSync(dirname, {recursive: true});
	fs.writeFileSync(outputPath, output, 'utf8');
}

try {
	fs.mkdirSync(outputDir, {recursive: true});
	copyComponents();
	const paths = renderMarkdownPages(siteStructure);
	createStaticPageLoader(paths);
	process.exit(0);
} catch (err) {
	console.error(chalk.red(err));
	console.groupEnd();
	process.exit(1);
}
