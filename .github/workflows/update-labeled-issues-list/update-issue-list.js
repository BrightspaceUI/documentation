#!/usr/bin/env node

const listPath = process.env['LIST_PATH'];

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const issues = require(listPath);

const action = process.env['LABEL_ACTION'];
const issueNumber = process.env['GITHUB_ISSUE_NUMBER'];
const outputPath = path.join(__dirname, listPath);

function updateFile() {
	if (action === 'labeled') {
		if (issues.includes(Number(issueNumber))) process.exit();

		let content = 'module.exports = [';
		issues.forEach((issue) => {
			content += `\n\t${issue},`;
		});
		content += `\n\t${issueNumber}\n];\n`;
		fs.writeFileSync(outputPath, content, 'utf8');
	} else if (action === 'unlabeled') {
		const numIssue = Number(issueNumber);
		if (!issues.includes(numIssue)) process.exit();

		let content = 'module.exports = [';
		issues.forEach((issue) => {
			if (issue === numIssue) return;
			content += `\n\t${issue},`;
		});
		content += '\n];\n';
		fs.writeFileSync(outputPath, content, 'utf8');
	}
}

try {
	updateFile();
	process.exit(0);
} catch (err) {
	console.error(chalk.red('Could not update issue list file'));
	console.error(chalk.red(err));
	process.exit(1);
}
