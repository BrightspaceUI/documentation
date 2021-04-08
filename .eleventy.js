const cleanCSS = require("clean-css");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("assets/js");

	let options = {
		html: false,
		breaks: false,
		linkify: true
	};
	const markdownIt = require('markdown-it')(options);
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
