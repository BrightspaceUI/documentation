const assets = require('../pages/_data/assets');

module.exports = {
	getScript: (allContent, env) => {
		// dev could use script as is but since that wont work in prod we should
		// process in dev as well so there aren't missed errors (e.g., file not listed in manifest) when testing
		const content = /<script.*>([\s\S]*)<\/script>/g.exec(allContent);
		if (!content || content.length !== 2 || content[1] === '') return '';

		const importsArray = content[1].split('\n');
		let imports = env === 'production' ? '' : '<script type="module">\n';
		importsArray.forEach((importUrl) => {
			if (!importUrl.includes('import')) return;
			const fileNameEnd = /([^/]+$)/g.exec(importUrl);
			const fileName = fileNameEnd[1].split('\';')[0];
			console.log(fileName)
			try {
				const path = assets.getPath(fileName);
				imports += env === 'production' ? `<script src="${path}" type="module"></script>\n` : `${importUrl}\n`;
			} catch (e) {
				throw new Error(`ERROR: ${fileName} does not exist in manifest and may be missing from the components list in a component issue.`);
			}
		});
		return env === 'production' ? imports : `${imports}</script>`;
	}
};
