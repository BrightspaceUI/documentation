const { exec } = require("child_process");
const fs = require('fs');
const path = require("path");
const request = require('request');

function _copyCustomElements(repos) {
	const outputDir = path.join(__dirname, '../src/.generated');
	fs.mkdirSync(outputDir, {recursive: true});
	let tags = [];
	repos.forEach((repo) => {
		const customElementsFilePath = path.join(__dirname, `../node_modules/${repo}/custom-elements.json`);
		if (!fs.existsSync(customElementsFilePath)) return;
		const file = fs.readFileSync(customElementsFilePath).toString();
		const parsed = JSON.parse(file);
		tags = tags.concat(parsed.tags);
	});
	const json = JSON.stringify(tags, null, '\t');
	const fileContent = `/* eslint quotes: 0 */

export default ${json};
`;
	const outputPath = path.join(outputDir, 'component-doc-details.js');
	fs.writeFileSync(outputPath, fileContent, 'utf8');
}

function _generateRollupConfig(files) {
	let content = `export default [`
	for(let i = 0; i < files.length; i++) {
		if (i > 0) content += `,`;
		content += `\n\t"./node_modules/${files[i]}"`;
	}
	content += '\n];'
	fs.writeFileSync(`${__dirname}/rollup-config-generated.js`, content);
}

let installCount = 0;
function _installDependencies(dependencies) {
	dependencies.forEach((dep) => {
		exec(`npm i ${dep}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
			}
			console.log(`stdout: ${stdout}`);
			installCount++;
		});
	});
}

function _processMarkdownFiles(files) {
	const baseDir = 'pages/components/imported';
	if (!fs.existsSync(baseDir)) {
		fs.mkdirSync(baseDir);
	}

	files.forEach((file) => {
		const originFile = `./node_modules/${file.file}`;
		const newFile = `${baseDir}/${file.name}.md`;
		const content = fs.readFileSync(originFile);
		fs.writeFileSync(newFile, `${file.frontMatter}\n${content}`);
	});
}

function _waitForInstallations(expected, callback) {
	if (installCount === expected) callback();
	else setTimeout(() => _waitForInstallations(expected, callback), 3000);
}

const options = {
    url: 'https://api.github.com/repos/BrightspaceUI/documentation/issues?state=all',
	headers: {
		'User-Agent': 'request'
	}
};

request(options, (error, response, body) => {
	if (error || response.statusCode !== 200) {
		console.log('Error: Failed to call GitHub issues API')
	}

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
			const frontMatter = component.body.split(/<!--\r?\n/)[1].split('-->')[0];
			const componentBody = component.body.split(/-->\r?\n/)[1];
			const lines = componentBody.split(/\r?\n/);
			const info = {};
			lines.forEach((line) => {
				const lineSplit = line.split(': ');
				info[lineSplit[0]] = lineSplit[1];
			});
			if (!repos.includes(info.repo)) repos.push(info.repo);
			rollupAdditions.push(`${info.baseInstallLocation}/${info.component}`);
			markdownFiles.push({ name: component.title, file: `${info.baseInstallLocation}/${info.markdown}`, frontMatter: frontMatter});
			if (!repoInstallLocations.includes(info.baseInstallLocation)) repoInstallLocations.push(info.baseInstallLocation);
		} catch {
			console.error(`Error: your component issue for ${component.title} is incorrectly formatted`);
		}
	});
	console.log('INFO: Completed GitHub issue processing')

	_installDependencies(repoInstallLocations);
	_waitForInstallations(repoInstallLocations.length, () => {
		console.log('INFO: Completed dependency installation')

		_processMarkdownFiles(markdownFiles);
		console.log('INFO: Completed markdown file processing');

		_copyCustomElements(repoInstallLocations);
		console.log('INFO: Completed custom-elements.json file processing');

		_generateRollupConfig(rollupAdditions);
		console.log('INFO: Completed generating rollup config');
	});

	/**
	 *
	 * create table page
	 */
});
