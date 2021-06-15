import { ISSUE_LABELS, TIERS } from './states.mjs';
import { exec } from 'child_process';
import fs from 'fs';
import matter from 'gray-matter';
import { Octokit } from '@octokit/rest';
import { parseBody } from './generate-pages-utils.mjs';
import path from 'path';
import { default as publishedComponents } from './component-page-issues.js';

const __dirname = path.dirname(process.argv[1]);

const DIR_GENERATED = path.join(__dirname, '../.generated');
const DIR_IMPORTED_COMPONENTS = path.join(__dirname, '../pages/components/imported');
const DIR_IMPORTED_SCREENSHOTS = path.join(DIR_IMPORTED_COMPONENTS, 'screenshots');
const FILENAME_CUSTOM_ELEM = 'custom-elements-all.js';
const FILENAME_ISSUES = 'component-issue-data.js';
const FILENAME_ROLLUP = 'rollup-files-generated.js';

const componentIssues = {},
	markdownFiles = [],
	repoInstallLocations = [],
	rollupFiles = [],
	screenshotLocations = [];

componentIssues[TIERS.LABS] = [];
componentIssues[TIERS.OFFICIAL] = [];
componentIssues[TIERS.REQUEST] = [];

const PROD = process.env.NODE_ENV === 'production';

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
			const message = `custom-elements.json does not exist for ${repo}`;
			_handleError(message);
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
			const message = `markdown file ${file.devFile} does not exist`;
			_handleError(message);
			return;
		}
		const devContent = fs.readFileSync(devOriginFile);
		_generatePage(file.frontMatter, devContent);
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

function _generatePage(frontMatter, content) {
	Object.keys(frontMatter).forEach(key => frontMatter[key] === undefined && delete frontMatter[key]); // remove any keys with an undefined value else matter.stringify fails
	const newFile = path.join(DIR_IMPORTED_COMPONENTS, `${frontMatter.fileName}.md`);
	const frontMatterString = matter.stringify('', frontMatter);
	fs.writeFileSync(newFile, `${frontMatterString}\n${content}`);
}

function _getInfoGeneratePage(issue) {
	const { frontMatter, info, issueBody } = parseBody(issue);
	const output = { name: frontMatter.title, issueUrl: info.issueUrl, development: info.development, fileName: frontMatter.fileName, owner: info.owner };

	if (!info.devMarkdown || !info.baseInstallLocation) {
		console.warn(`WARNING: Component issue for ${issue.title} DOES NOT CONTAIN "devMarkdown" OR "baseInstallLocation"`);
		_generatePage(frontMatter, issueBody);
		return output;
	}

	if (!repoInstallLocations.includes(info.baseInstallLocation)) repoInstallLocations.push(info.baseInstallLocation);

	if (!info.components || info.components.length === 0)
		console.warn(`WARNING: Component issue for ${issue.title} DOES NOT CONTAIN "components" array`);
	else {
		info.components.forEach((component) => {
			rollupFiles.push(`${info.baseInstallLocation}/${component}`);
		});
	}

	const devMarkdownPath = path.join(info.baseInstallLocation, info.devMarkdown);
	const dirname = path.dirname(devMarkdownPath);
	const screenshotPath1 = path.join(dirname, 'screenshots');
	const screenshotPath2 = path.join(dirname, '../screenshots'); // some repos have screenshots in a sibling directory to docs
	if (!screenshotLocations.includes(screenshotPath1)) screenshotLocations.push(screenshotPath1);
	if (!screenshotLocations.includes(screenshotPath2)) screenshotLocations.push(screenshotPath2);

	const newFilename = (frontMatter.eleventyNavigation && frontMatter.eleventyNavigation.key) || issue.title;
	const markdownData = { name: newFilename, devFile: devMarkdownPath, frontMatter: frontMatter };
	markdownFiles.push(markdownData);
	return output;
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

function _handleError(message) {
	if (PROD) {
		console.error(`ERROR: ${message}`);
		process.exit(1);
	} else console.warn(`WARNING: ${message}`);
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

async function _requestIssues() {
	const props = {
		owner: 'BrightspaceUI',
		repo: 'documentation',
		state: 'all'
	};
	if (PROD) props.labels = ISSUE_LABELS.PUBLISHED;

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
	fs.mkdirSync(DIR_IMPORTED_SCREENSHOTS, { recursive: true });

	issues.forEach((issue) => {
		if (PROD && !publishedComponents.includes(issue.number)) return;
		for (let i = 0; i < issue.labels.length; i++) {
			switch (issue.labels[i].name) {
				case ISSUE_LABELS.LABS:
					componentIssues[TIERS.LABS].push(_getInfoGeneratePage(issue));
					return;
				case ISSUE_LABELS.OFFICIAL:
					componentIssues[TIERS.OFFICIAL].push(_getInfoGeneratePage(issue));
					return;
				case ISSUE_LABELS.REQUEST:
					componentIssues[TIERS.REQUEST].push(_getInfoGeneratePage(issue));
					return;
			}
		}
	});

	[TIERS.LABS, TIERS.OFFICIAL, TIERS.REQUEST].forEach(tier => componentIssues[tier].sort((a, b) => {
		if (a.name < b.name) return -1;
		else if (a.name > b.name) return 1;
		else return 0;
	}));

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
