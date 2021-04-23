/* global require, module */
const path = require('path');
const fs = require('fs').promises;
const URL = require('url').URL;

// Check if asset lives in 11ty _site folder, if not serve from root folder.
const serve11tyAssets = ({ dist = '_site' } = {}) => {
	return async(context, next) => {
		const pathName = new URL(`https://filler-url.com${context.url}`).pathname;
		const url = pathName.endsWith('/') ? `${pathName}index.html` : pathName;
		try {
			// check if the file exists, if so, modify the url to come from `_site` folder.
			const stats = await fs.stat(path.join(dist, url));
			if (stats.isFile()) {
				context.url = `/${dist}${pathName}`;
			}
			return next();
		} catch (e) {
			return next();
		}
	};
};

module.exports = {
	middleware: [
		serve11tyAssets({ dist: '_site' })
	],
	nodeResolve: true,
	open: true,
	port: 8000,
	rootDir: '.',
	watch: true
};
