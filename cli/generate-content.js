var request = require('request');
const fs = require('fs');
const glob = require("glob");
const path = require("path");

const baseDir = 'pages/components/imported';
if (!fs.existsSync(baseDir)) {
	fs.mkdirSync(baseDir);
}

var options = {
    url: 'https://api.github.com/repos/BrightspaceUI/documentation/issues?state=all',
	headers: {
		'User-Agent': 'request'
	}
};


function _parseFile(fileName) {
	const file = fs.readFileSync(fileName).toString();
	return JSON.parse(file);
}

function copyCustomElements(repos) {
	const outputDir = path.join(__dirname, '../src/.generated');
	fs.mkdirSync(outputDir, {recursive: true});
	let tags = [];
	repos.forEach((repo) => {
		const customElementsFilePath = path.join(__dirname, `../node_modules/${repo}/custom-elements.json`);
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

function generateRollupConfig(files) {
	let content = `export default [`
	for(let i = 0; i < files.length; i++) {
		if (i > 0) content += `,`;
		content += `\n\t"./node_modules/${files[i]}"`;
	}
	content += '\n];'
	fs.writeFileSync(`${__dirname}/rollup-config-generated.js`, content);
}

function processMarkdownFiles(files) {
	files.forEach((file) => {
		const originFile = `./node_modules/${file.file}`;
		const newFile = `${baseDir}/${file.name}.md`;
		const content = fs.readFileSync(originFile);
		fs.writeFileSync(newFile, `${file.frontMatter}\r\n${content}`);
	});
}

request(options, (error, response, body) => {
	if (!error && response.statusCode == 200) {

		const repos = [];
		const rollupAdditions = [];
		const markdownFiles = [];
		const repoInstallLocations = [];

		const issues = JSON.parse(body);
		const inProgress = issues.filter(issue => issue.labels && issue.labels.length > 0 && issue.labels[0].name === 'Component In Progress');
		const requests = issues.filter(issue => issue.labels && issue.labels.length > 0 && issue.labels[0].name === 'Component Request');
		const documented = issues.filter(issue => issue.labels && issue.labels.length > 0 && issue.labels[0].name === 'Component Documented');

		documented.forEach((component) => {
			try {
				const frontMatter = component.body.split('<!--\r\n')[1].split('-->')[0];
				const componentBody = component.body.split('**Component Information:**\r\n');
				const info = JSON.parse(`{${componentBody[1]}}`);

				if (!repos.includes(info.repo)) repos.push(info.repo);
				rollupAdditions.push(info.componentLocation);
				markdownFiles.push({ name: component.title, file: info.markdownLocation, frontMatter: frontMatter});
				if (!repoInstallLocations.includes(info.baseComponentLocation)) repoInstallLocations.push(info.baseComponentLocation);
			} catch {
				console.error(`Error: your component issue for ${component.title} is incorrectly formatted`);
			}
		});
		console.log('INFO: Completed GitHub issue processing');

		processMarkdownFiles(markdownFiles);
		console.log('INFO: Completed markdown file processing');

		copyCustomElements(repoInstallLocations);
		console.log('INFO: Completed custom-elements.json file processing');

		generateRollupConfig(rollupAdditions);
		console.log('INFO: Completed generating rollup config');
		/**
		 * use repos to
		 * - npm i
		 *
		 * use rollupAdditions to
		 * - add to rollup-config.js (probably just import that??)
		 */
    }
});
