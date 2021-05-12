
import chalk from 'chalk';
import { Octokit } from '@octokit/rest';

const [owner, repo] = process.env['GITHUB_REPOSITORY'].split('/');
const branchName = process.env['BRANCH_NAME'];

const octokit = new Octokit({
	auth: process.env['GITHUB_TOKEN'],
	baseUrl: process.env['GITHUB_API_URL'],
	userAgent: `${process.env['GITHUB_WORKFLOW']}-update-component-pages`
});

// TODO: it would be nice to link to the issue(s) that changed and have that update if multiple changes are made
async function handlePR() {
	await octokit.request('POST /repos/{owner}/{repo}/pulls', {
		owner: owner,
		repo: repo,
		title: 'Updating published component pages',
		head: `refs/heads/${branchName}`,
		base: `refs/heads/master`
	});
}

handlePR().catch((e) => {
	console.log(chalk.red(e));
	console.log(chalk.red('Could not open new PR'));
});
