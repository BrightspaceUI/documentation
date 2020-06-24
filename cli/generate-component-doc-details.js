const chalk = require('chalk'),
	fs = require('fs'),
	path = require('path');

function _parseFile(fileName) {
	const file = fs.readFileSync(fileName).toString();
	return JSON.parse(file);
}

function copyComponents() {
	const filePaths = [
		'../node_modules/@brightspace-ui/core/custom-elements.json',
		'../data/custom-elements-facet-filter-sort.json'
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
