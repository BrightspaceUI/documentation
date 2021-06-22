import { DEV_STATES, ISSUE_LABELS } from './states.mjs';
import matter from 'gray-matter';

export function _getDevStatus(labels, state, issueState) {
	// if closed default to COMPLETE if no other information, if open default to NOT STARTED if no other information
	const labelNames = labels.map((label) => label.name);
	if (state === 'closed') {
		if (labelNames.includes(ISSUE_LABELS.DEPRECATED)) return DEV_STATES.DEPRECATED;
		else if (Object.values(DEV_STATES).includes(issueState)) return issueState;
		else return DEV_STATES.COMPLETE;
	} else if (state === 'open') {
		if (labelNames.includes(ISSUE_LABELS.BACKLOG)) return DEV_STATES.BACKLOG;
		else if (Object.values(DEV_STATES).includes(issueState)) return issueState;
		else return DEV_STATES.NOT_STARTED;
	}
}

function ensureTrailingSlash(url) {
	if (url && url.slice(-1) !== '/') {
		return `${url}/`;
	}
	return url;
}

export function parseBody(issue) {
	/**
	 * issue body is formatted as follows with all pieces optional:
	 * <!--
	 * ---
	 * front: matter
	 * ---
	 *
	 * comment: content
	 * -->
	 * # issueBody
	 */
	let issueBody = issue.body || '',
		comment = '';
	const splitStart = issueBody.split(/<!--\r?\n/);
	if (splitStart.length === 2) {
		const splitEnd = splitStart[1].split('-->');
		comment = splitEnd[0];
		issueBody = splitEnd[1];
	}

	const title = issue.title.replace(/\s+/g, '-').toLowerCase();
	let info = {
		issueUrl: issue.html_url
	};

	let frontMatter = {
		layout: 'layouts/component-issue',
		title: issue.title,
		fileName: title,
		issueUrl: issue.html_url
	};

	if (comment) {
		const matterComment = matter(comment);
		const commentContent = matterComment.content;

		if (commentContent) info = Object.assign(info, matter(`---\n${commentContent}\n---`).data);

		const repo = ensureTrailingSlash(matterComment.data.repo);
		if (repo) {
			matterComment.data.repo = repo;
		}
		if (Object.keys(matterComment.data).length > 0) {
			frontMatter = {
				...frontMatter,
				...matterComment.data,
				fileName: (matterComment.data.eleventyNavigation && matterComment.data.eleventyNavigation.key) || title
			};
		}
	}

	info.development = _getDevStatus(issue.labels, issue.state, info.development);
	return { frontMatter, info, issueBody };
}
