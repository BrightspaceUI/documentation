import { exec } from 'child_process';
import fs from 'fs';
import matter from 'gray-matter';
import { Octokit } from '@octokit/rest';
import path from 'path';
import { default as publishedComponents } from './component-page-issues.js';

const __dirname = path.dirname(process.argv[1]);

const DIR_GENERATED = path.join(__dirname, '../.generated');
const DIR_IMPORTED_COMPONENTS = path.join(__dirname, '../pages/components/imported');
const DIR_IMPORTED_SCREENSHOTS = path.join(DIR_IMPORTED_COMPONENTS, 'screenshots');
const FILENAME_CUSTOM_ELEM = 'custom-elements-all.js';
const FILENAME_ISSUES = 'component-issue-data.js';
const FILENAME_ROLLUP = 'rollup-files-generated.js';

const componentIssues = { 'official': [], 'labs':[], 'request': [] },
	markdownFiles = [],
	repoInstallLocations = [],
	rollupFiles = [],
	screenshotLocations = [];

const ISSUE_LABELS = {
	REQUEST: 'Requested Component',
	LABS: 'Labs Component',
	OFFICIAL: 'Official Component',
	PUBLISHED: 'Published'
};
const STATES_COMPONENT = {
	NOT_STARTED: 'Not Started'
};

const octokit = new Octokit({
	auth: process.env['GITHUB_TOKEN'],
	baseUrl: 'https://api.github.com',
	userAgent: 'documentation - request issues'
});

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
		const devOriginFile = path.join(__dirname, `../node_modules/${file.devFile}`);
		if (!fs.existsSync(devOriginFile)) {
			console.warn(`WARNING: markdown file ${file.devFile} does not exist`);
			return;
		}
		const newFile = path.join(DIR_IMPORTED_COMPONENTS, `${file.name}.md`);
		const devContent = fs.readFileSync(devOriginFile);

		fs.writeFileSync(newFile, `${file.frontMatter}\n${devContent}`);
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

function _generatePage(issue, comment, type) {
	const pageInfo = _parseComponentIssueInfo(comment, issue.title, issue.html_url);
	componentIssues[type].push(pageInfo);

	let content = '';
	if (issue.body.includes('<!--')) {
		const split = issue.body.split(/-->\r?\n/);
		content = split[1];
	} else {
		content = issue.body;
	}

	const title = issue.title.replace(/\s+/g, '-').toLowerCase();
	pageInfo.pageUrl = `../${title}.html`;
	const newFile = path.join(DIR_IMPORTED_COMPONENTS, `${title}.md`);
	const frontMatter = `---
layout: layouts/component-issue
title: ${issue.title}
baseUrl: ${title}
issueUrl: ${issue.html_url}
---
`;

	fs.writeFileSync(newFile, `${frontMatter}\n${content}`);
}

function _getCommentContent(body) {
	if (!body) return '';
	const splitStart = body.split(/<!--\r?\n/);
	if (splitStart.length !== 2) return '';
	return splitStart[1].split('-->')[0];
}

function _getDocumentationInfo(issue, type) {
	try {
		const comment = _getCommentContent(issue.body);
		const parsedComment = matter(comment); // parsedComment.content = repo info, parsedComment.data = front matter
		if (!parsedComment.content.includes('devMarkdown')) {
			_generatePage(issue, comment, type);
			return;
		}
		const info = _parseComponentIssueInfo(parsedComment.content, issue.title, issue.html_url);
		info.pageUrl = _getPageUrl(parsedComment.data);
		componentIssues[type].push(info);

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

		if (!info.devMarkdown) {
			console.warn(`WARNING: Component issue for ${issue.title} DOES NOT CONTAIN "markdown"`);
			return;
		}
		const devMarkdownPath = path.join(info.baseInstallLocation, info.devMarkdown);
		const dirname = path.dirname(devMarkdownPath);
		const screenshotPath1 = path.join(dirname, 'screenshots');
		const screenshotPath2 = path.join(dirname, '../screenshots'); // some repos have screenshots in a sibling directory to docs
		if (!screenshotLocations.includes(screenshotPath1)) screenshotLocations.push(screenshotPath1);
		if (!screenshotLocations.includes(screenshotPath2)) screenshotLocations.push(screenshotPath2);

		const newFilename = (parsedComment.data.eleventyNavigation && parsedComment.data.eleventyNavigation.key) || issue.title;
		parsedComment.data.repo = info.repo;
		const frontMatterString = matter.stringify('', parsedComment.data);
		const markdownData = { name: newFilename, devFile: devMarkdownPath, frontMatter: frontMatterString };
		markdownFiles.push(markdownData);
	} catch (e) {
		console.error(`ERROR: component issue for ${issue.title} is incorrectly formatted`);
	}
}

function _getIssues(issues, expectedLabelName) {
	const isProd = process.env.NODE_ENV === 'production';
	return issues.filter(issue => {
		if (isProd && !publishedComponents.includes(issue.number)) return false;
		let labelMatch = false;
		issue.labels.forEach((label) => {
			if (label.name === expectedLabelName) labelMatch = true;
		});
		return labelMatch;
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

function _getPageUrl(data) {
	if (!data.eleventyNavigation || !data.eleventyNavigation.parent || !data.eleventyNavigation.key) {
		console.warn('WARNING: Component issue does not contain correct eleventyNavigation section');
		return null;
	}
	return `../${data.eleventyNavigation.parent}/${data.eleventyNavigation.key}.html`;
}

function _installDependencies(dependencies, callback) {
	_getMissingDependenciesList(dependencies).then((res) => {
		exec(`npm i ${res} --no-save`, (err, stdout) => {
			if (err) console.error(`ERROR: Failed to install dependency: ${err.message}`);
			console.info(`INFO: installation stdout: ${stdout}`);
			callback();
		});
	});
}

function _parseComponentIssueInfo(componentBody, name, url) {
	const componentInfo = componentBody ? matter(`---\n${componentBody}\n---`).data : {};
	if (!componentInfo.development) componentInfo.development = STATES_COMPONENT.NOT_STARTED;
	componentInfo.name = name;
	componentInfo.issueUrl = url;
	return componentInfo;
}

async function _requestIssues() {
	const props = {
		owner: 'BrightspaceUI',
		repo: 'documentation',
		state: 'all'
	};
	if (process.env.NODE_ENV === 'production') props.labels = ISSUE_LABELS.PUBLISHED;

	return await octokit.paginate(octokit.rest.issues.listForRepo, props);
}

function _writeJSONToGeneratedFile(data, fileName) {
	const json = JSON.stringify(data, null, '\t');
	const fileContent = `/* eslint quotes: 0 */

export default ${json};
`;
	const outputPath = path.join(DIR_GENERATED, fileName);
	fs.writeFileSync(outputPath, fileContent, 'utf8');
}

_requestIssues().then(issues => {

	const request = _getIssues(issues, ISSUE_LABELS.REQUEST);
	const labs = _getIssues(issues, ISSUE_LABELS.LABS);
	const official = _getIssues(issues, ISSUE_LABELS.OFFICIAL);

	fs.mkdirSync(DIR_IMPORTED_SCREENSHOTS, { recursive: true });

	request.forEach((issue) => {
		const comment = _getCommentContent(issue.body);
		_generatePage(issue, comment, 'request');
	});

	labs.forEach((issue) => {
		_getDocumentationInfo(issue, 'labs');
	});

	official.forEach((issue) => {
		_getDocumentationInfo(issue, 'official');
	});

	console.info('INFO: Completed GitHub issue processing');

	fs.mkdirSync(DIR_GENERATED, { recursive: true });

	_writeJSONToGeneratedFile(componentIssues, FILENAME_ISSUES);
	console.info('INFO: Completed writing component issue info to file');

	_writeJSONToGeneratedFile(rollupFiles, FILENAME_ROLLUP);
	console.info('INFO: Completed generating rollup config');

	if (!repoInstallLocations || repoInstallLocations.length === 0) {
		console.info('INFO: No dependencies to install');
		return;
	}

	_installDependencies(repoInstallLocations, () => {
		console.info('INFO: Completed dependency installation');

		_copyMarkdown(markdownFiles);
		console.info('INFO: Completed markdown file processing');

		_copyScreenshots(screenshotLocations);
		console.info('INFO: Completed screenshot file processing');

		_copyCustomElements(repoInstallLocations);
		console.info('INFO: Completed custom-elements.json file processing');
	});
});
