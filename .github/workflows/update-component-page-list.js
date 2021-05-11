import { default as issues } from '../../tools/component-page-issues.js';
import fs from 'fs';

const action = process.env['ACTION'];
const issueNumber = process.env['GITHUB_ISSUE_NUMBER'];
const outputPath = path.join(__dirname, '../../tools/component-page-issues.js');

if (action === 'labeled') {
	if (!checkForPublished()) return; // if Published wasn't the added label then return
	if (issues.includes(issueNumber)) return;

	let content = 'export default [';
	issues.forEach((issue) => {
		content += `\n\t"${issue}"`;
	});
	content += `\n\t"${issueNumber}"\n];`;
	fs.writeFileSync(outputPath, content, 'utf8');
} else if (action === 'unlabeled') {
	if (checkForPublished()) return; // if published wasn't the removed label then return
	if (!issues.includes(issueNumber)) return;

	let content = 'export default [';
	issues.forEach((issue) => {
		if (issue === issueNumber) return;
		content += `\n\t"${issue}"`;
	});
	content += `\n];`;
	fs.writeFileSync(outputPath, content, 'utf8');
}

function checkForPublished() {
	const labels = process.env['GITHUB_ISSUE_LABELS'];
	const published = labels.filter((label) => label.name === 'Published');
	return published.length > 0;
}
