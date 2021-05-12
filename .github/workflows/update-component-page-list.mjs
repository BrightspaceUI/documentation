import fs from 'fs';
import { default as issues } from '../../tools/component-page-issues.mjs';
import path from 'path';

const __dirname = path.dirname(process.argv[1]);
const action = process.env['ACTION'];
const issueNumber = process.env['GITHUB_ISSUE_NUMBER'];
const outputPath = path.join(__dirname, '../../tools/component-page-issues.mjs');

if (action === 'labeled') {
	if (!checkForPublished()) process.exit(); // if Published wasn't the added label then return
	if (issues.includes(Number(issueNumber))) process.exit();

	let content = 'export default [';
	issues.forEach((issue) => {
		content += `\n\t${issue},`;
	});
	content += `\n\t${issueNumber}\n];\n`;
	fs.writeFileSync(outputPath, content, 'utf8');
} else if (action === 'unlabeled') {
	if (checkForPublished()) process.exit(); // if published wasn't the removed label then return
	const numIssue = Number(issueNumber);
	if (!issues.includes(numIssue)) process.exit();

	let content = 'export default [';
	issues.forEach((issue) => {
		if (issue === numIssue) return;
		content += `\n\t${issue},`;
	});
	content += '\n];\n';
	fs.writeFileSync(outputPath, content, 'utf8');
}

function checkForPublished() {
	const labels = process.env['GITHUB_ISSUE_LABELS'];
	const published = labels.filter((label) => label.name === 'Published');
	return published.length > 0;
}
