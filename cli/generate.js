const fs = require('fs');
const path = require("path");
const docsSource = require("./components-source");

const outputDir = path.join(__dirname, '../src/.generated');

function _parseFile(fileName) {
	const file = fs.readFileSync(fileName).toString();
	return JSON.parse(file);
}

function copyComponents() {
	let tags = [];
	docsSource.customElements.forEach((filePath) => {
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

fs.mkdirSync(outputDir, {recursive: true});
copyComponents();
process.exit(0);
