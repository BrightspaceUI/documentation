import { _getDevStatus, parseBody } from '../tools/generate-pages-utils.mjs';
import assert from 'assert';
// import sinon from 'sinon';

describe('generate-pages', () => {
	describe('_getInfoGeneratePage', () => {
		// TODO: stub out writeFileSync
	});

	describe('_getDevStatus', () => {
		[
			{ labels: [], state: 'open', issueState: undefined, expected: 'Not Started' },
			{ labels: [], state: 'closed', issueState: undefined, expected: 'Completed' },
			{ labels: [], state: 'open', issueState: 'asdf', expected: 'Not Started' },
			{ labels: [], state: 'closed', issueState: 'asdf', expected: 'Completed' },
			{ labels: [], state: 'open', issueState: 'In Progress', expected: 'In Progress' },
			{ labels: [], state: 'open', issueState: 'Deprecated', expected: 'Deprecated' },
			{ labels: [], state: 'open', issueState: 'Completed', expected: 'Completed' },
			{ labels: [], state: 'open', issueState: 'Backlog', expected: 'Backlog' },
			{ labels: [], state: 'open', issueState: 'Not Started', expected: 'Not Started' },
			{ labels: [], state: 'closed', issueState: 'In Progress', expected: 'In Progress' },
			{ labels: [], state: 'closed', issueState: 'Deprecated', expected: 'Deprecated' },
			{ labels: [], state: 'closed', issueState: 'Completed', expected: 'Completed' },
			{ labels: [], state: 'closed', issueState: 'Backlog', expected: 'Backlog' },
			{ labels: [], state: 'closed', issueState: 'Not Started', expected: 'Not Started' },
			{ labels: [{ name: 'Backlog' }], state: 'open', issueState: 'In Progress', expected: 'Backlog' },
			{ labels: [{ name: 'Deprecated' }], state: 'open', issueState: 'In Progress', expected: 'In Progress' },
			{ labels: [{ name: 'Backlog' }], state: 'closed', issueState: 'Completed', expected: 'Completed' },
			{ labels: [{ name: 'Deprecated' }], state: 'closed', issueState: 'Completed', expected: 'Deprecated' },
			{ labels: [{ name: 'Backlog' }], state: 'open', issueState: 'asdf', expected: 'Backlog' },
			{ labels: [{ name: 'Deprecated' }], state: 'closed', issueState: 'asdf', expected: 'Deprecated' },
		].forEach((test) => {
			it(`should be correct with label: ${test.labels.length > 0 ? test.labels[0].name : 'no label'}, state: ${test.state}, issue state: ${test.issueState}`, () => {
				assert.equal(_getDevStatus(test.labels, test.state, test.issueState), test.expected);
			});
		});
	});

	describe('parseBody', () => {
		let issueBase, expectedFrontMatter, expectedInfo;

		beforeEach(() => {
			issueBase = {
				title: 'Example Issue',
				html_url: 'www.example.com',
				labels: [],
				state: 'open'
			};

			expectedFrontMatter = {
				layout: 'layouts/component-issue',
				title: issueBase.title,
				fileName: 'example-issue',
				issueUrl: issueBase.html_url
			};

			expectedInfo = {
				development: 'Not Started',
				issueUrl: issueBase.html_url
			};
		});

		it('should be correct with open state, empty body', () => {
			assert.deepEqual(parseBody(issueBase), { frontMatter: expectedFrontMatter, info: expectedInfo, issueBody: '' });
		});

		it('should be correct with closed state, empty body', () => {
			issueBase.state = 'closed';
			expectedInfo.development = 'Completed';
			assert.deepEqual(parseBody(issueBase), { frontMatter: expectedFrontMatter, info: expectedInfo, issueBody: '' });
		});

		it('should be correct with one word title', () => {
			issueBase.title = 'Example';
			expectedFrontMatter.fileName = 'example';
			expectedFrontMatter.title = 'Example';
			assert.deepEqual(parseBody(issueBase), { frontMatter: expectedFrontMatter, info: expectedInfo, issueBody: '' });
		});

		it('should be correct with hyphenated title', () => {
			issueBase.title = 'Example-Item';
			expectedFrontMatter.fileName = 'example-item';
			expectedFrontMatter.title = 'Example-Item';
			assert.deepEqual(parseBody(issueBase), { frontMatter: expectedFrontMatter, info: expectedInfo, issueBody: '' });
		});

		it('should be correct when body contains front matter but no eleventyNavigation', () => {
			issueBase.body = `
<!--
---
layout: layouts/component
tags:
  Component 1: d2l-component-1
  Component 2: d2l-component-2
---
-->`;
			expectedFrontMatter.layout = 'layouts/component';
			expectedFrontMatter.tags = { 'Component 1': 'd2l-component-1', 'Component 2': 'd2l-component-2' };
			assert.deepEqual(parseBody(issueBase), { frontMatter: expectedFrontMatter, info: expectedInfo, issueBody: '' });
		});

		it('should be correct when body contains front matter includes eleventyNavigation', () => {
			const keyName = 'my-component';
			issueBase.body = `
<!--
---
eleventyNavigation:
  key: ${keyName}
  title: My Component
  parent: component-type
---
-->`;
			expectedFrontMatter.eleventyNavigation = { key: keyName, title: 'My Component', parent: 'component-type' };
			expectedFrontMatter.fileName = keyName;
			assert.deepEqual(parseBody(issueBase), { frontMatter: expectedFrontMatter, info: expectedInfo, issueBody: '' });
		});

		it('should be correct when body comment contains info and no development state', () => {
			issueBase.body = `
<!--
components: ["components/component1.js","component/component2.js"]
-->`;
			expectedInfo.components = ['components/component1.js', 'component/component2.js'];
			assert.deepEqual(parseBody(issueBase), { frontMatter: expectedFrontMatter, info: expectedInfo, issueBody: '' });
		});

		it('should be correct when body comment contains development state', () => {
			issueBase.body = `
<!--
development: Completed
-->`;
			expectedInfo.development = 'Completed';
			assert.deepEqual(parseBody(issueBase), { frontMatter: expectedFrontMatter, info: expectedInfo, issueBody: '' });
		});
	});

});
