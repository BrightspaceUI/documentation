const defaultImports = [
	'import \'@brightspace-ui/core/components/typography/typography.js?module\';\n',
];

export const validTypes = {
	array: 'array',
	boolean: 'boolean',
	number: 'number',
	object: 'object',
	string: 'string'
};

export function getCode(snippet, interactive, currAttributes, tagName, allInstancesInteractive) {
	// remove comment lines from code snippet
	if (!snippet) return '';
	const lines = snippet.split('-->');
	const codeSnippet = lines.length === 1 ? lines[0] : lines[1]; // if there was no `-->` found lines[1] will be null

	if (!interactive) return codeSnippet;

	const attributes = [];
	for (const attribute in currAttributes) {
		const { type, value } = currAttributes[attribute];
		switch (type) {
			case validTypes.string:
				attributes.push(`${attribute}="${value}"`);
				break;
			case validTypes.boolean:
				if (value)
					attributes.push(`${attribute}`);
				break;
			case validTypes.number:
				attributes.push(`${attribute}=${value}`);
				break;
			default:
				break;
		}
	}
	attributes.sort();
	const attributesText = attributes.length === 0 ? '' : ` ${attributes.join(' ')}`;
	const includesSpace = codeSnippet.includes(`<${tagName} `);
	const replaceString = includesSpace ? `<${tagName}` : `<${tagName}>`;
	const re = allInstancesInteractive ? new RegExp(replaceString, 'g') : replaceString;
	return includesSpace
		? codeSnippet.replace(re, `<${tagName}${attributesText}`)
		: codeSnippet.replace(re, `<${tagName}${attributesText}>`);
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
