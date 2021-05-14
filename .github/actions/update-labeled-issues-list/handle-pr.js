#!/usr/bin/env node

const chalk = require('chalk');
const { Octokit } = require('@octokit/rest');

const [owner, repo] = process.env['GITHUB_REPOSITORY'].split('/');
const action = process.env['LABEL_ACTION'];
const branchName = process.env['BRANCH_NAME'];
const issueTitle = process.env['GITHUB_ISSUE_TITLE'];
const issueUrl = process.env['GITHUB_ISSUE_URL'];
const labelName = 'Published';

const octokit = new Octokit({
	auth: process.env['GITHUB_TOKEN'],
	baseUrl: process.env['GITHUB_API_URL'],
	userAgent: `${process.env['GITHUB_WORKFLOW']}-update-labeled-issues`
});

function getPRBody(bodyContent) {
	if (!bodyContent) bodyContent = 'Summary of changes. Please review impact of changes before merging';
	if (action === 'labeled') bodyContent += `\nAdded: [${issueTitle}](${issueUrl})`;
	else bodyContent += `\nRemoved: [${issueTitle}](${issueUrl})`;
	return bodyContent;
}

async function handlePR() {
	const existingPR = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
		owner: owner,
		repo: repo,
		head: `${owner}:refs/heads/${branchName}`,
		base: 'main'
	});

	if (existingPR.data.length === 0) {
		try {
			await octokit.request('POST /repos/{owner}/{repo}/pulls', {
				owner: owner,
				repo: repo,
				title: `Updating list of issues with ${labelName} label`,
				head: `refs/heads/${branchName}`,
				base: 'master',
				body: getPRBody()
			});
		} catch (e) {
			console.log(chalk.red('Failed to open new PR'));
			return Promise.reject(e);
		}
	} else {
		console.log(`PR for branch ${branchName} already exists. Appending additional information to body.`);
		const prNum = existingPR.data[0].number;
		try {
			await octokit.request('PATCH /repos/{owner}/{repo}/pulls/{pull_number}', {
				owner: owner,
				repo: repo,
				pull_number: prNum,
				body: getPRBody(existingPR.data[0].body)
			});
		} catch (e) {
			console.log(chalk.red('Failed to update existing PR'));
			return Promise.reject(e);
		}
	}
}

handlePR().catch((e) => {
	console.log(chalk.red(e));
	process.exit(1);
});
