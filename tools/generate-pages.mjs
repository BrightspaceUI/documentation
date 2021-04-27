import { exec } from 'child_process';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import request from 'request';

const __dirname = path.dirname(process.argv[1]);

const DIR_GENERATED = path.join(__dirname, '../.generated');
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
		if (!fs.existsSync(customElementsFilePath)) {
			console.warn(`WARNING: custom-elements.json does not exist for ${repo}`);
			return;
		}
		const file = fs.readFileSync(customElementsFilePath).toString();
		const parsed = JSON.parse(file);
		tags = tags.concat(parsed.tags);
	});
	_writeJSONToGeneratedFile(tags, FILENAME_CUSTOM_ELEM);
}

function _copyMarkdown(files) {
	files.forEach((file) => {
		const originFile = path.join(__dirname, `../node_modules/${file.file}`);
		if (!fs.existsSync(originFile)) {
			console.warn(`WARNING: markdown file ${file.file} does not exist`);
			return;
		}
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

function _getCommentContent(body) {
	if (!body) return '';
	const splitStart = body.split(/<!--\r?\n/);
	if (splitStart.length !== 2) return '';
	return splitStart[1].split('-->')[0];
}

function _getIssues(issues, expectedLabelName) {
	return issues.filter(issue => {
		let labelMatch = false;
		let showComponent = process.env.NODE_ENV !== 'production'; // if NODE_ENV is production, only show component with "Published" label
		issue.labels.forEach((label) => {
			if (label.name === expectedLabelName) labelMatch = true;
			if (label.name === ISSUE_LABELS.PUBLISHED) showComponent = true;
		});
		return labelMatch && showComponent;
	});
}

function _getMissingDependenciesList(dependencies) {
	const numDependencies = dependencies.length;
	let dependencyCount = 0;
	let dependencyString = '';
	return new Promise((resolve) => {
		dependencies.forEach((dep) => {
			exec(`npm list ${dep}`, (error) => {
				if (error) dependencyString += ` ${dep}`; // dependency is not installed
				dependencyCount++;
				if (dependencyCount === numDependencies) resolve(dependencyString);
			});
		});
	});
}

function _installDependencies(dependencies, callback) {
	if (!dependencies || dependencies.length === 0) {
		console.info('INFO: No dependencies to install');
		return;
	}
	_getMissingDependenciesList(dependencies).then((res) => {
		exec(`npm i ${res} --no-save`, (err, stdout) => {
			if (err) console.error(`ERROR: Failed to install dependency: ${err.message}`);
			console.info(`INFO: installation stdout: ${stdout}`);
			callback();
		});
	});
}

function _parseComponentIssueInfo(componentBody, name, url) {
	const info = matter(`---\n${componentBody}\n---`).data;
	if (!info.design) info.design = STATES_COMPONENT.NOT_STARTED;
	if (!info.development) info.development = STATES_COMPONENT.NOT_STARTED;
	info.name = name;
	info.issueUrl = url;
	return info;
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
	if (error || response.statusCode !== 200) {
		console.error('ERROR: Failed to call GitHub issues API');
		return;
	}

	const componentIssues = [],
		markdownFiles = [],
		repoInstallLocations = [],
		rollupFiles = [],
		screenshotLocations = [];

	const issues = JSON.parse(body);
	const requested = _getIssues(issues, ISSUE_LABELS.REQUEST);
	const inProgress = _getIssues(issues, ISSUE_LABELS.IN_PROGRESS);
	const documented = _getIssues(issues, ISSUE_LABELS.DOCUMENTED);

	requested.forEach((issue) => {
		const comment = _getCommentContent(issue.body);
		componentIssues.push(_parseComponentIssueInfo(comment, issue.title, issue.html_url));
	});

	inProgress.forEach((issue) => {
		const comment = _getCommentContent(issue.body);
		componentIssues.push(_parseComponentIssueInfo(comment, issue.title, issue.html_url));
	});

	documented.forEach((issue) => {
		try {
			const comment = _getCommentContent(issue.body);
			const parsedComment = matter(comment); // parsed.content = repo info, parsed.data = front matter
			const info = _parseComponentIssueInfo(parsedComment.content, issue.title, issue.html_url);
			componentIssues.push(info);

			if (!info.baseInstallLocation) {
				console.warn(`WARNING: Component issue for ${issue.title} DOES NOT CONTAIN "baseInstallLocation"`);
				return;
			}

			if (!repoInstallLocations.includes(info.baseInstallLocation)) repoInstallLocations.push(info.baseInstallLocation);

			if (!info.components || info.components.length === 0)
				console.warn(`WARNING: Component issue for ${issue.title} DOES NOT CONTAIN "components" array`);
			else {
				info.components.forEach((component) => {
					rollupFiles.push(`${info.baseInstallLocation}/${component}`);
				});
			}

			if (!info.markdown) {
				console.warn(`WARNING: Component issue for ${issue.title} DOES NOT CONTAIN "markdown"`);
				return;
			}
			const dirname = path.dirname(`${info.baseInstallLocation}/${info.markdown}`);
			const screenshotPath1 = path.join(dirname, 'screenshots');
			const screenshotPath2 = path.join(dirname, '../screenshots'); // some repos have screenshots in a sibling directory to docs
			if (!screenshotLocations.includes(screenshotPath1)) screenshotLocations.push(screenshotPath1);
			if (!screenshotLocations.includes(screenshotPath2)) screenshotLocations.push(screenshotPath2);

			const newFilename = (parsedComment.data.eleventyNavigation && parsedComment.data.eleventyNavigation.key) || issue.title;
			parsedComment.data.repo = info.repo;
			const frontMatterString = matter.stringify('', parsedComment.data);
			markdownFiles.push({ name: newFilename, file: `${info.baseInstallLocation}/${info.markdown}`, frontMatter: frontMatterString });
		} catch (e) {
			console.error(`ERROR: component issue for ${issue.title} is incorrectly formatted`);
		}
	});

	console.info('INFO: Completed GitHub issue processing');

	_installDependencies(repoInstallLocations, () => {
		console.info('INFO: Completed dependency installation');

		fs.mkdirSync(DIR_IMPORTED_SCREENSHOTS, { recursive: true });
		fs.mkdirSync(DIR_GENERATED, { recursive: true });

		_writeJSONToGeneratedFile(componentIssues, FILENAME_ISSUES);
		console.info('INFO: Completed writing component issue info to file');

		_copyMarkdown(markdownFiles);
		console.info('INFO: Completed markdown file processing');

		_copyScreenshots(screenshotLocations);
		console.info('INFO: Completed screenshot file processing');

		_copyCustomElements(repoInstallLocations);
		console.info('INFO: Completed custom-elements.json file processing');

		_generateRollupConfig(rollupFiles);
		console.info('INFO: Completed generating rollup config');
	});
});
