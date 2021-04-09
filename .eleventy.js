/* global require, module */
const cleanCSS = require('clean-css');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('assets/js');

	const options = {
		html: false,
		breaks: false,
		linkify: true,
		modifyToken: (token) => {
			// TODO: enable table cases after d2l-table is ready
			switch (token.type) {
				case 'link_open': {
					token.tag = 'd2l-link';
					const href = token.attrGet('href');
					let newHref;
					if (href.includes('.md')) newHref = href.replace(/.md/, '.html');
					else if (href.includes('../screenshots/')) newHref = href.replace(/..\/screenshots/, '/components/imported/screenshots');
					else if (href.includes('./screenshots/')) newHref = href.replace(/.\/screenshots/, '/components/imported/screenshots');
					if (newHref) token.attrObj.href = newHref;
					break;
				}
				case 'link_close':
					token.tag = 'd2l-link';
					break;
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
		if (content.includes('<!-- docs: live demo -->'))
			return `<d2l-design-system-interactive-demo>${content}</d2l-design-system-interactive-demo>`;
		else if (content.includes('<!-- docs: demo -->'))
			return `<d2l-demo-snippet>${content}</d2l-demo-snippet>`
		else return defaultFenceRule(tokens, idx, options, env, slf);
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
			const contentClass = `d2l-cc-${splitEnd[0].replace(/ /g, '-')}`;
			return `<div class="${contentClass}">`;
		} else return defaultTextRule(tokens, idx, options, env, slf);
	};

	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setLibrary('md', markdownIt);

	return {
		dir: { input: 'pages', output: '_site' }
	};
};
