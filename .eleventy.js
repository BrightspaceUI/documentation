const cleanCSS = require("clean-css");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { escapeHtml } = require('markdown-it/lib/common/utils');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("pages/components/imported/screenshots");
	eleventyConfig.addPassthroughCopy("assets/js");

	let options = {
		html: false,
		breaks: false,
		linkify: true,
		replaceLink: function (link) {
			if (link.includes('.md')) link = link.replace(/.md/, '.html');
			else if (link.includes('../screenshots/')) link = link.replace(/..\/screenshots/, '/components/imported/screenshots');
			else if (link.includes('./screenshots/')) link = link.replace(/.\/screenshots/, '/components/imported/screenshots');
			return link;
		}
	};
	const markdownIt = require('markdown-it')(options).use(require('markdown-it-replace-link'));

	const defaultFenceRule = markdownIt.renderer.rules.fence;
	markdownIt.renderer.rules.fence = (tokens, idx, options, env, slf) => {
		const content = tokens[idx].content;

		if (content.includes('<!-- docs: live demo -->')) return `<d2l-design-system-interactive-demo>${escapeHtml(content)}</d2l-design-system-interactive-demo>`;
		else if (content.includes('<!-- docs: demo -->')) return `<d2l-demo-snippet>${content}</d2l-demo-snippet>`
		else return defaultFenceRule(tokens, idx, options, env, slf);
	}

	const defaultTextRule = markdownIt.renderer.rules.text;
	markdownIt.renderer.rules.text = (tokens, idx, options, env, slf) => {
		const content = tokens[idx].content;
		if (content.includes('<!-- docs: start hidden content -->')) return '<div style="display: none;">';
		else if (content.includes('<!-- docs: end')) return '</div>';
		else if (content.includes('<!-- docs: start')) {
			const splitStart = content.split('<!-- docs: start ');
			const splitEnd = splitStart[1].split(' -->');
			const contentClass = `d2l-cc-${splitEnd[0].replace(/ /g, '-')}`;
			return `<div class="${contentClass}">`;
		} else return defaultTextRule(tokens, idx, options, env, slf);
	}

	eleventyConfig.addFilter("cssmin", function(code) {
		return new cleanCSS({}).minify(code).styles;
	});

	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setLibrary("md", markdownIt);

	return {
	  dir: { input: 'pages', output: '_site' }
	};
  };
