import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function _parseFile(fileName) {
	const file = fs.readFileSync(fileName).toString();
	return JSON.parse(file);
}

function copyComponents() {
	const customElementsFilePath = path.join(__dirname, '../node_modules/@brightspace-ui/core/custom-elements.json');
	if (!fs.existsSync(customElementsFilePath)) return;
	const parsed = _parseFile(customElementsFilePath);
	const json = JSON.stringify(parsed.tags, null, '\t');
	const fileContent = `/* eslint quotes: 0 */

export default ${json};
`;
	const pathName = path.join(__dirname, '../data');
	fs.writeFileSync(`${pathName}/component-doc-details.js`, fileContent, 'utf8');
}

try {
	copyComponents();
	process.exit(0);
} catch (err) {
	console.error(chalk.red(err));
	console.groupEnd();
	process.exit(1);
}
