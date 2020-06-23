const chalk = require('chalk'),
	fs = require('fs'),
	marked = require('marked'),
	path = require('path');

marked.use({
	renderer: {
		link( href, title, text) {
			return `<d2l-link href="${href}">${text}</d2l-link>`
		}
	},
	tokenizer: {
		html(src) {
			console.log('tokenizer.html', src);
			return false;
		}
	}
});

const inputPath = path.join(__dirname, './test.md');
const outputPath = path.join(__dirname, './test.html');

function renderMarkdown() {
	const markdownString = fs.readFileSync(inputPath).toString();
	const htmlContent = marked(markdownString);
	fs.writeFileSync(outputPath, htmlContent, 'utf8');
}

try {
	renderMarkdown();
	process.exit(0);
} catch (err) {
	console.error(chalk.red(err));
	console.groupEnd();
	process.exit(1);
}