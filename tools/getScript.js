const { DefaultLitAnalyzerContext } = require("lit-analyzer");

// const assets = require('../pages/_data/assets');
const defaultImports = [
	'import \'@brightspace-ui/core/components/typography/typography.js?module\';\n',
];
module.exports = {
	getScript: (allContent) => {
		const content = /<script.*>([\s\S]*)<\/script>/g.exec(allContent);
		if (!content || content.length !== 2 || content[1] === '') return '';

		const importsArray = content[1].split('\n');
		let imports = '';
		importsArray.forEach((importUrl) => {
			if (!importUrl.includes('import')) return;
			try {
				// append ?module to resolve imports in playground-demo components
				const appendedModule = importUrl.slice(0, -2).concat('?module\';').trim();
				imports += `${appendedModule}\n`;
			} catch (e) {
				// todo: change error
				throw new Error(`ERROR: Unable to parse import for: ${importUrl}`);
			}
		});
		// Append default imports for IFrames
		defaultImports.forEach((importStatement) => imports += importStatement);
		return imports;
	}
};
