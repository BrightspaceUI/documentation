const defaultImports = [
	'import \'@brightspace-ui/core/components/typography/typography.js?module\';\n',
];

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
