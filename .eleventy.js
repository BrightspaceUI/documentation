/* global require, module */
const cleanCSS = require('clean-css');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const { escapeHtml } = require('markdown-it/lib/common/utils');

function parseConfigurationValue(tag, demoSnippet, requireSplitOnNewlines) {
	let value;

	if (!demoSnippet) return undefined;

	if (requireSplitOnNewlines && !demoSnippet.includes('\n')) {
		throw new Error('Snippet info should not be divided by spaces if using "defaults" due to parsing. Use multi-line method.');
	}

	if (demoSnippet.includes(`${tag}:`)) {
		const splitsOnNewlines = demoSnippet.includes('\n');
		let section = demoSnippet.split(`${tag}:`)[1];
		section = section.split('-->')[0];

		if (splitsOnNewlines) {
			if (section.includes('\n')) value = section.split('\n')[0];
			else value = section; // last one and --> was on last line instead of below
		} else {
			value = section.split(' ')[0];
		}
	}
	return value ? value.trim() : undefined;
}

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('img');
	eleventyConfig.addPassthroughCopy('pages/components/imported/screenshots');
	eleventyConfig.addPassthroughCopy('pages/favicon.ico');
	eleventyConfig.addNunjucksShortcode('enhancements', (repo) => {
		const href = repo ? `${repo}issues` : 'https://github.com/BrightspaceUI/documentation/issues';
		return `Looking for an enhancement not listed here? <d2l-link href="${href}">Create a GitHub issue!</d2l-link>`;
	});
	eleventyConfig.addNunjucksShortcode('issue', (issueUrl) => {
		return `Looking for more details on the component or want to add your input? <d2l-link href="${issueUrl}">Check out the GitHub Issue</d2l-link>`;
	});
	eleventyConfig.addNunjucksShortcode('editPage', (repo, componentPath) => {
		if (!repo || !componentPath) {
			return '';
		}
		return `<div class="d2l-edit-component-page">Suggest an <d2l-link href="${`${repo}edit/master/${componentPath}`}">edit</d2l-link> for this page</div>`;
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
					else if (token.tag === 'h3') headingClass += ' d2l-heading-4';
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
		// if (content.includes('<!-- docs: live demo') || content.includes('<!-- docs: demo -->') || content.includes('<!-- docs: code demo -->')) {
		// 	if (content.includes('<!-- docs: live demo')) {
		// 		return `
		// 			<d2l-component-catalog-demo-snippet interactive resizable demo-snippet="${escapeHtml(content)}">
		// 			</d2l-component-catalog-demo-snippet>
		// 		`;
		// 	} else if (content.includes('<!-- docs: code demo -->')) {

		// 		return `
		// 			<d2l-component-catalog-demo-snippet resizable demo-snippet="${escapeHtml(content)}">
		// 			</d2l-component-catalog-demo-snippet>
		// 		`;

		// 	} else {
		// 		return `
		// 			<d2l-component-catalog-demo-snippet resizable hide-code demo-snippet="${escapeHtml(content)}">
		// 			</d2l-component-catalog-demo-snippet>
		// 		`;
		// 	}
		// } else {
		// 	// Code only snippets
		// 	return `<d2l-component-catalog-demo-snippet code-only demo-snippet="${escapeHtml(content)}"></d2l-component-catalog-demo-snippet>`;
		// }
		return escapeHtml(content);
	};

	markdownIt.renderer.rules.table_open = () => {
		return '<d2l-scroll-wrapper><table class="d2l-cc-custom-table d2l-markdown-table">';
	};
	markdownIt.renderer.rules.table_close = () => {
		return '</table></d2l-scroll-wrapper>';
	};

	const defaultTextRule = markdownIt.renderer.rules.text;
	markdownIt.renderer.rules.text = (tokens, idx, options, env, slf) => {
		const content = tokens[idx].content;
		const subTitleMatch = content.match(/\[(.*?)\]/);
		if (subTitleMatch) {
			const subtitleMarkdown = subTitleMatch[0];
			const tag = subtitleMarkdown.slice(1, -1); // remove the square brackets
			tokens[idx].content = content.split(subtitleMarkdown).join(''); // Get the rest of the title to add back to the document
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
		if (content.includes('<!-- docs: live demo')) {
			const tag = parseConfigurationValue('name', content);
			const size = parseConfigurationValue('size', content);
			const defaults = parseConfigurationValue('defaults', content);
			return `<d2l-component-catalog-demo-snippet
				interactive
				resizable
				tag-name="${tag}"
				size="${size}"
				defaults="${JSON.stringify(defaults)}">
			`;
		} else if (content.includes('<!-- docs: code demo -->'))
			return '<d2l-component-catalog-demo-snippet resizable>';
		else if (content.includes('<!-- docs: demo -->'))
			return '<d2l-component-catalog-demo-snippet resizable hide-code>';
		else if (content.includes('<!-- docs: demo end -->'))
			return '</d2l-component-catalog-demo-snippet>';
		else if (content.includes('<!-- docs: start hidden content -->'))
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
