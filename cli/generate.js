import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '../.generated');

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

try {
	fs.mkdirSync(outputDir, {recursive: true});
	copyComponents();
	process.exit(0);
} catch (err) {
	console.error(chalk.red(err));
	console.groupEnd();
	process.exit(1);
}
