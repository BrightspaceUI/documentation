/* global require, module, process */
const cleanCSS = require('clean-css');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const { escapeHtml } = require('markdown-it/lib/common/utils');
const { getScript } = require('./tools/getScript');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('pages/components/imported/screenshots');
	eleventyConfig.addPassthroughCopy('pages/favicon.ico');
	eleventyConfig.addPassthroughCopy('pages/img');
	eleventyConfig.addNunjucksShortcode('enhancements', (repo) => {
		return `Looking for an enhancement not listed here? <d2l-link href="${repo}/issues">Create a GitHub issue!</d2l-link>`;
	});
	eleventyConfig.addNunjucksShortcode('issue', (issueUrl) => {
		return `Looking for more details on the component or want to add your input? <d2l-link href="${issueUrl}">Check out the GitHub Issue</d2l-link>`;
	});
	eleventyConfig.addShortcode('statusTable', (tier) => {
		return `<d2l-component-catalog-status-table tier="${tier}"></d2l-component-catalog-status-table>`;
	});

	const options = {
		html: true,
		breaks: false,
		linkify: true,
		modifyToken: (token) => {
			switch (token.type) {
				case 'image': {
					const src = token.attrGet('src');
					if (src.includes('../screenshots/'))
						token.attrObj.src = src.replace(/..\/screenshots/, '/components/imported/screenshots');
					else if (src.includes('./screenshots/'))
						token.attrObj.src = src.replace(/.\/screenshots/, '/components/imported/screenshots');
					break;
				}
				case 'link_open': {
					token.tag = 'd2l-link';
					const href = token.attrGet('href');
					if (href.includes('.md')) token.attrObj.href = href.replace(/.md/, '.html');
					break;
				}
				case 'link_close':
					token.tag = 'd2l-link';
					break;
				case 'heading_open': {
					let headingClass = token.attrGet('class') || '';
					if (token.tag === 'h1') headingClass += ' d2l-heading-1';
					else if (token.tag === 'h2') headingClass += ' d2l-heading-2';
					else if (token.tag === 'h3') headingClass += ' d2l-heading-3';
					token.attrSet('class', headingClass);
					break;
				}
			}
		}
	};
	const markdownIt = require('markdown-it')(options).use(require('markdown-it-modify-token'));
	eleventyConfig.addFilter('cssmin', (code) => {
		return new cleanCSS({}).minify(code).styles;
	});

	markdownIt.renderer.rules.fence = (tokens, idx) => {
		const content = tokens[idx].content;
		if (content.includes('<!-- docs: live demo -->') || content.includes('<!-- docs: demo -->')) {
			const script = getScript(content, process.env.NODE_ENV);
			if (content.includes('<!-- docs: live demo -->')) {
				return `
					${script}
					<d2l-component-catalog-interactive-demo>
						${escapeHtml(content)}
					</d2l-component-catalog-interactive-demo>
				`;
			} else {
				return `
					${script}
					<d2l-component-catalog-demo-snippet-wrapper>
						${escapeHtml(content)}
					</d2l-component-catalog-demo-snippet-wrapper>
				`;
			}
		} else
			return `<d2l-component-catalog-code-view-wrapper>${escapeHtml(content)}</d2l-component-catalog-code-view-wrapper>`;
	};

	markdownIt.renderer.rules.table_open = () => {
		return '<d2l-table-wrapper><table class="d2l-table">';
	};
	markdownIt.renderer.rules.table_close = () => {
		return '</table></d2l-table-wrapper>';
	};

	const defaultTextRule = markdownIt.renderer.rules.text;
	markdownIt.renderer.rules.text = (tokens, idx, options, env, slf) => {
		const content = tokens[idx].content;
		if (env.tags && Object.keys(env.tags[0]).includes(content)) {
			const tag = env.tags[0][content];
			return `
				${defaultTextRule(tokens, idx, options, env, slf)}
				<div class="d2l-component-catalog-tag d2l-body-standard">
					&lt;<div class="d2l-component-catalog-tag-inner">${tag}</div>&gt;
				</div>
			`;
		} else return defaultTextRule(tokens, idx, options, env, slf);
	};

	const defaultHtmlRule = markdownIt.renderer.rules.html_block;
	markdownIt.renderer.rules.html_block = (tokens, idx, options, env, slf) => {
		const content = tokens[idx].content;
		if (content.includes('<!-- docs: start hidden content -->'))
			return '<div style="display: none;">';
		else if (content.includes('<!-- docs: end'))
			return '</div>';
		else if (content.includes('<!-- docs: start')) {
			const splitStart = content.split('<!-- docs: start ');
			const splitEnd = splitStart[1].split(' -->');
			const contentClass = `d2l-component-catalog-${splitEnd[0].replace(/ /g, '-')}`;
			return `<div class="${contentClass}">`;
		} else return defaultHtmlRule(tokens, idx, options, env, slf);
	};

	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setLibrary('md', markdownIt);

	return {
		dir: { input: 'pages', output: '_site' }
	};
};
