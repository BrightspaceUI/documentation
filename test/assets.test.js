const assert = require('assert');
const assets = require('../pages/_data/assets');
const Module = require('module');
const sandbox = require('sinon').createSandbox();

describe('assets', () => {

	const fileName = 'example-test-file.js';
	const manifestFileName = 'assets/06600dd3.js';
	const manifest = {
		'example-test-file.js': manifestFileName
	};

	before(() => {
		sandbox.stub(Module.prototype, 'require').returns(manifest);
	});

	after(() => {
		sandbox.restore();
	});

	it('should throw if file not in manifest', () => {
		assert.throws(() => assets.getPath('example-test-file-other.js'));
	});

	it('should return assets directory filename if not proeduction and file in manifest', () => {
		assert.equal(assets.getPath(fileName), `/pages/assets/${fileName}`);
	});

	it('should return manifest filename if production and file in manifest', () => {
		process.env.NODE_ENV = 'production';
		assert.equal(assets.getPath(fileName), `/${manifestFileName}`);
		process.env.NODE_ENV = 'development';
	});
});
