const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const request = require('request');

/**
 * TODO:
 * - published state
 */

const DIR_GENERATED = path.join(__dirname, '../src/.generated');
const DIR_IMPORTED_COMPONENTS = path.join(__dirname, '../pages/components/imported');
const DIR_IMPORTED_SCREENSHOTS = path.join(DIR_IMPORTED_COMPONENTS, 'screenshots');
const FILENAME_CUSTOM_ELEM = 'custom-elements-all.js';
const FILENAME_ISSUES = 'component-issue-data.js';
const FILENAME_ROLLUP = 'rollup-files-generated.js';

const ISSUES_REQUEST = {
	url: 'https://api.github.com/repos/BrightspaceUI/documentation/issues?state=all',
	headers: {
		'User-Agent': 'request'
	}
};
const ISSUE_LABELS = {
	REQUEST: 'Component Request',
	IN_PROGRESS: 'Component In Progress',
	DOCUMENTED: 'Component Documented',
	PUBLISHED: 'Published'
};
const STATES_COMPONENT = {
	NOT_STARTED: 'Not Started'
};

function _copyCustomElements(repos) {
	let tags = [];
	repos.forEach((repo) => {
		const customElementsFilePath = path.join(__dirname, `../node_modules/${repo}/custom-elements.json`);
		if (!fs.existsSync(customElementsFilePath)) return;
		const file = fs.readFileSync(customElementsFilePath).toString();
		const parsed = JSON.parse(file);
		tags = tags.concat(parsed.tags);
	});
	_writeJSONToGeneratedFile(tags, FILENAME_CUSTOM_ELEM);
}

function _copyMarkdown(files) {
	files.forEach((file) => {
		const originFile = path.join(__dirname, `../node_modules/${file.file}`);
		const newFile = path.join(DIR_IMPORTED_COMPONENTS, `${file.name}.md`);
		const content = fs.readFileSync(originFile);
		fs.writeFileSync(newFile, `${file.frontMatter}\n${content}`);
	});
}

function _copyScreenshots(screenshotDirs) {
	screenshotDirs.forEach((dir) => {
		const fullDirectory = path.join(__dirname, `../node_modules/${dir}`);
		if (!fs.existsSync(fullDirectory)) return;
		const files = fs.readdirSync(fullDirectory);
		files.forEach((file) => {
			const targetFile = path.join(DIR_IMPORTED_SCREENSHOTS, file);
			const sourceFile = path.join(fullDirectory, file);
			fs.writeFileSync(targetFile, fs.readFileSync(sourceFile));
		});
	});
}

function _generateRollupConfig(files) {
	let content = 'export default [';
	for (let i = 0; i < files.length; i++) {
		if (i > 0) content += ',';
		content += `\n\t"./node_modules/${files[i]}"`;
	}
	content += '\n];';
	const outputPath = path.join(DIR_GENERATED, FILENAME_ROLLUP);
	fs.writeFileSync(outputPath, content, 'utf8');
}

function _getIssues(issues, name) {
	return issues.filter(issue => {
		let labelMatch = false;
		let showComponent = process.env.NODE_ENV !== 'prod'; // if NODE_ENV is production, only show component when published label
		issue.labels.forEach((label) => {
			if (label.name === name) labelMatch = true;
			if (label.name === ISSUE_LABELS.PUBLISHED) showComponent = true;
		});
		return issue.labels && issue.labels.length > 0 && labelMatch && showComponent;
	});
}

let installCount = 0;
function _installDependencies(dependencies) {
	dependencies.forEach((dep) => {
		exec(`npm list ${dep}`, (error) => {
			if (error) {
				exec(`npm i ${dep} --no-save`, (err, stdout) => {
					if (err) {
						console.log(`error: ${err.message}`);
					}
					console.log(`stdout: ${stdout}`);
					installCount++;
				});
			} else {
				installCount++;
			}
		});
	});
}

function _parseComponentIssueInfo(componentBody, name, url) {
	const lines = componentBody.split(/\r?\n/);
	const info = {};
	lines.forEach((line) => {
		const lineSplit = line.split(': ');
		info[lineSplit[0]] = lineSplit[1];
	});
	if (!info.design) info.design = STATES_COMPONENT.NOT_STARTED;
	if (!info.development) info.development = STATES_COMPONENT.NOT_STARTED;
	info.name = name;
	info.issueUrl = url;
	return info;
}

function _splitIssueInfo(body) {
	if (!body) return '';
	const splitStart = body.split(/<!--\r?\n/);
	if (splitStart.length !== 2) return '';
	return splitStart[1].split('-->')[0];
}

function _waitForInstallations(expected, callback) {
	if (installCount === expected) callback();
	else setTimeout(() => _waitForInstallations(expected, callback), 3000);
}

function _writeJSONToGeneratedFile(data, fileName) {
	const json = JSON.stringify(data, null, '\t');
	const fileContent = `/* eslint quotes: 0 */

export default ${json};
`;
	const outputPath = path.join(DIR_GENERATED, fileName);
	fs.writeFileSync(outputPath, fileContent, 'utf8');
}

request(ISSUES_REQUEST, (error, response, body) => {
	if (error || response.statusCode !== 200)
		console.log('Error: Failed to call GitHub issues API');

	const rollupFiles = [];
	const markdownFiles = [];
	const repoInstallLocations = [];
	const componentIssues = [];
	const screenshotLocations = [];

	const issues = JSON.parse(body);
	const requested = _getIssues(issues, ISSUE_LABELS.REQUEST);
	const inProgress = _getIssues(issues, ISSUE_LABELS.IN_PROGRESS);
	const documented = _getIssues(issues, ISSUE_LABELS.DOCUMENTED);

	requested.forEach((issue) => {
		const body = _splitIssueInfo(issue.body);
		componentIssues.push(_parseComponentIssueInfo(body, issue.title, issue.html_url));
	});

	inProgress.forEach((issue) => {
		const body = _splitIssueInfo(issue.body);
		componentIssues.push(_parseComponentIssueInfo(body, issue.title, issue.html_url));
	});

	documented.forEach((issue) => {
		try {
			const issueInfo = _splitIssueInfo(issue.body).split(/\r?\n\r?\n/);
			const frontMatter = issueInfo[0];
			const issueBody = issueInfo[1];
			const info = _parseComponentIssueInfo(issueBody, issue.title, issue.html_url);

			info.components = JSON.parse(info.components);
			info.components.forEach((component) => {
				rollupFiles.push(`${info.baseInstallLocation}/${component}`);
			});

			const dirname = path.dirname(`${info.baseInstallLocation}/${info.markdown}`);
			const screenshotPath1 = path.join(dirname, 'screenshots');
			const screenshotPath2 = path.join(dirname, '../screenshots'); // some repos have screenshots in a sibling directory to docs
			if (!screenshotLocations.includes(screenshotPath1)) screenshotLocations.push(screenshotPath1);
			if (!screenshotLocations.includes(screenshotPath2)) screenshotLocations.push(screenshotPath2);

			markdownFiles.push({ name: issue.title, file: `${info.baseInstallLocation}/${info.markdown}`, frontMatter: frontMatter });

			if (!repoInstallLocations.includes(info.baseInstallLocation)) repoInstallLocations.push(info.baseInstallLocation);

			componentIssues.push(info);
		} catch (e) {
			console.error(`Error: component issue for ${issue.title} is incorrectly formatted`);
		}
	});

	console.log('INFO: Completed GitHub issue processing');

	_installDependencies(repoInstallLocations);
	_waitForInstallations(repoInstallLocations.length, () => {
		console.log('INFO: Completed dependency installation');

		fs.mkdirSync(DIR_IMPORTED_SCREENSHOTS, { recursive: true });
		fs.mkdirSync(DIR_GENERATED, { recursive: true });

		_writeJSONToGeneratedFile(componentIssues, FILENAME_ISSUES);
		console.log('INFO: Completed writing component issue info to file');

		_copyMarkdown(markdownFiles);
		console.log('INFO: Completed markdown file processing');

		_copyScreenshots(screenshotLocations);
		console.log('INFO: Completed screenshot file processing');

		_copyCustomElements(repoInstallLocations);
		console.log('INFO: Completed custom-elements.json file processing');

		_generateRollupConfig(rollupFiles);
		console.log('INFO: Completed generating rollup config');
	});
});
