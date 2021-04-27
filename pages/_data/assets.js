/* global require, module, process */
module.exports = {
	getPath: (assetName) => {
		const assets = require('../_includes/manifest.json');
		const modulePath = assets[assetName];
		if (!modulePath) throw new Error(`Error with getPath: ${assetName} does not exist in manifest.json`);

		if (process.env.NODE_ENV === 'production') return `/${modulePath}`;
		else return `/pages/assets/${assetName}`;
	}
};
