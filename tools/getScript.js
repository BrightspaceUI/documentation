const assets = require('../pages/_data/assets');

module.exports = {
	getScript: (allContent) => {
		// dev could use script as is but since that wont work in prod we should
		// process in dev as well so there aren't missed errors (e.g., file not listed in manifest) when testing
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
				throw new Error(`ERROR: ${importUrl} does not exist in manifest and may be missing from the components list in a component issue.`);
			}
		});
		imports += 'import \'@brightspace-ui/core/components/typography/typography.js?module\';\n';
		return imports;
	}
};
