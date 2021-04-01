const { exec } = require("child_process");
const fs = require('fs');
const path = require("path");
const request = require('request');

const dirGeneratedFiles = path.join(__dirname, '../src/.generated');
fs.mkdirSync(dirGeneratedFiles, {recursive: true});

const dirImportedComponents = 'pages/components/imported';
if (!fs.existsSync(dirImportedComponents)) {
	fs.mkdirSync(dirImportedComponents);
}

function _copyCustomElements(repos) {
	let tags = [];
	repos.forEach((repo) => {
		const customElementsFilePath = path.join(__dirname, `../node_modules/${repo}/custom-elements.json`);
		if (!fs.existsSync(customElementsFilePath)) return;
		const file = fs.readFileSync(customElementsFilePath).toString();
		const parsed = JSON.parse(file);
		tags = tags.concat(parsed.tags);
	});
	__writeJSONToGeneratedFile(tags, 'custom-elements-all.js')
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
	files.forEach((file) => {
		const originFile = `./node_modules/${file.file}`;
		const newFile = `${dirImportedComponents}/${file.name}.md`;
		const content = fs.readFileSync(originFile);
		fs.writeFileSync(newFile, `${file.frontMatter}\n${content}`);
	});
}

function _waitForInstallations(expected, callback) {
	if (installCount === expected) callback();
	else setTimeout(() => _waitForInstallations(expected, callback), 3000);
}

function __parseComponentIssueInfo(componentBody, name, url) {
	const lines = componentBody.split(/\r?\n/);
	const info = {};
	lines.forEach((line) => {
		const lineSplit = line.split(': ');
		info[lineSplit[0]] = lineSplit[1];
	});
	return {
		name: name,
		repo: info.repo,
		design: info.design ? info.design : 'Not Started',
		development: info.development ? info.development : 'Not Started',
		issueUrl: url
	};
}

function __writeJSONToGeneratedFile(data, fileName) {
	const json = JSON.stringify(data, null, '\t');
	const fileContent = `/* eslint quotes: 0 */

export default ${json};
`;
	const outputPath = path.join(dirGeneratedFiles, fileName);
	fs.writeFileSync(outputPath, fileContent, 'utf8');
}

const __options = {
	url: 'https://api.github.com/repos/BrightspaceUI/documentation/issues?state=all',
	headers: {
		'User-Agent': 'request'
	}
};
request(__options, (error, response, body) => {
	if (error || response.statusCode !== 200) {
		console.log('Error: Failed to call GitHub issues API')
	}

	const rollupFiles = [];
	const markdownFiles = [];
	const repoInstallLocations = [];
	const componentIssues = [];

	const issues = JSON.parse(body);
	const inProgress = issues.filter(issue => issue.labels && issue.labels.length > 0 && issue.labels[0].name === 'Component In Progress');
	const requested = issues.filter(issue => issue.labels && issue.labels.length > 0 && issue.labels[0].name === 'Component Request');
	const documented = issues.filter(issue => issue.labels && issue.labels.length > 0 && issue.labels[0].name === 'Component Documented');

	documented.forEach((issue) => {
		try {
			const issueInfo = issue.body.split(/<!--\r?\n/)[1].split('-->')[0].split(/\r?\n\r?\n/);
			const frontMatter = issueInfo[0];
			const issueBody = issueInfo[1];
			const lines = issueBody.split(/\r?\n/);
			const info = {};
			lines.forEach((line) => {
				const lineSplit = line.split(': ');
				info[lineSplit[0]] = lineSplit[1];
			});
			info.components = JSON.parse(info.components);
			info.components.forEach((component) => {
				rollupFiles.push(`${info.baseInstallLocation}/${component}`);
			});
			markdownFiles.push({ name: issue.title, file: `${info.baseInstallLocation}/${info.markdown}`, frontMatter: frontMatter});
			if (!repoInstallLocations.includes(info.baseInstallLocation)) repoInstallLocations.push(info.baseInstallLocation);

			componentIssues.push(__parseComponentIssueInfo(issueBody, issue.title, issue.html_url));
		} catch {
			console.error(`Error: your component issue for ${issue.title} is incorrectly formatted`);
		}
	});

	inProgress.forEach((issue) => {
		let body = '';
		if (issue.body.split(/<!--\r?\n/)) body = issue.body.split(/<!--\r?\n/)[1].split('-->')[0];
		componentIssues.push(__parseComponentIssueInfo(body, issue.title, issue.html_url))
	});
	requested.forEach((issue) => {
		let body = '';
		if (issue.body && issue.body.split(/<!--\r?\n/)) body = issue.body.split(/<!--\r?\n/)[1].split('-->')[0];
		componentIssues.push(__parseComponentIssueInfo(issue.body, issue.title, issue.html_url))
	});

	console.log('INFO: Completed GitHub issue processing')

	_installDependencies(repoInstallLocations);
	_waitForInstallations(repoInstallLocations.length, () => {
		console.log('INFO: Completed dependency installation')

		_processMarkdownFiles(markdownFiles);
		console.log('INFO: Completed markdown file processing');

		_copyCustomElements(repoInstallLocations);
		console.log('INFO: Completed custom-elements.json file processing');

		_generateRollupConfig(rollupFiles);
		console.log('INFO: Completed generating rollup config');

		__writeJSONToGeneratedFile(componentIssues, 'component-issue-data.js');
		console.log('INFO: Completed writing component issue info to file');
	});
});
