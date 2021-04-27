/* global require, module, process */
const cleanCSS = require('clean-css');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const { escapeHtml } = require('markdown-it/lib/common/utils');
const { getScript } = require('./tools/getScript');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('pages/components/imported/screenshots');
	eleventyConfig.addPassthroughCopy('pages/img');
	eleventyConfig.addNunjucksShortcode('enhancements', (repo) => {
		return `Looking for an enhancement not listed here? <d2l-link href="${repo}/issues">Create a GitHub issue!</d2l-link>`;
	});

	const options = {
		html: false,
		breaks: false,
		linkify: true,
		modifyToken: (token) => {
			// TODO: enable table cases after d2l-table is ready
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
				// case 'table_open':
				// 	token.tag = 'd2l-table';
				// 	break;
				// case 'table_close':
				// 	token.tag = 'd2l-table';
				// 	break;
			}
		}
	};
	const markdownIt = require('markdown-it')(options).use(require('markdown-it-modify-token'));
	eleventyConfig.addFilter('cssmin', (code) => {
		return new cleanCSS({}).minify(code).styles;
	});

	const defaultFenceRule = markdownIt.renderer.rules.fence;
	markdownIt.renderer.rules.fence = (tokens, idx, options, env, slf) => {
		const content = tokens[idx].content;
		if (content.includes('<!-- docs: live demo -->') || content.includes('<!-- docs: demo -->')) {
			const script = getScript(content, process.env.NODE_ENV);
			if (content.includes('<!-- docs: live demo -->')) return `${script}<d2l-component-catalog-interactive-demo>${escapeHtml(content)}</d2l-component-catalog-interactive-demo>`;
			else return `${script}<d2l-component-catalog-demo-snippet-wrapper>${escapeHtml(content)}</d2l-component-catalog-demo-snippet-wrapper>`;
		} else return defaultFenceRule(tokens, idx, options, env, slf);
	};

	const defaultTextRule = markdownIt.renderer.rules.text;
	markdownIt.renderer.rules.text = (tokens, idx, options, env, slf) => {
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
		} else return defaultTextRule(tokens, idx, options, env, slf);
	};

	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setLibrary('md', markdownIt);

	return {
		dir: { input: 'pages', output: '_site' }
	};
};
