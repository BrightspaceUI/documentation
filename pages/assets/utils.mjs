const defaultImports = [
	'import \'@brightspace-ui/core/components/typography/typography.js?module\';\n',
];

export function parseConfigurationValue(tag, demoSnippet, requireSplitOnNewlines) {
	let value;

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

export const parseImports = (allContent) => {
	const content = /<script.*>([\s\S]*)<\/script>/g.exec(allContent);
	if (!content || content.length !== 2 || content[1] === '') return '';

	const importsArray = content[1].split('\n');
	let imports = '';

	// Append default imports for IFrames
	defaultImports.forEach((importStatement) => imports += importStatement);

	importsArray.forEach((importUrl) => {
		if (!importUrl.includes('import')) return;
		// append ?module to resolve imports in playground-demo components
		const appendedModule = importUrl.slice(0, -2).concat('?module\';').trim();
		imports += `${appendedModule}\n`;
	});
	return imports;
};
