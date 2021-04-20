/* global require, module, process */
module.exports = {
	getPath: (assetName) => {
		if (process.env.NODE_ENV === 'production') {
			const assets = require('../_includes/manifest.json');
			const modulePath = assets[assetName];
			if (!modulePath) {
				throw new Error(`Error with getPath: ${assetName} does not exist in manifest.json`);
			}
			return `/${modulePath}`;
		} else {
			return `/pages/assets/${assetName}`;
		}
	}
};
