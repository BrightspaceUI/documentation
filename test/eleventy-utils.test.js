const assert = require('assert');
const { parseConfigurationValue } = require('../tools/eleventy-utils');

describe('eleventy-utils', () => {
	describe('parseConfigurationValue', () => {
		it('should return correct result when inline', () => {
			const snippet = '<!-- docs: demo name:d2l-component size:small -->';
			assert.equal(parseConfigurationValue('name', snippet), 'd2l-component');
			assert.equal(parseConfigurationValue('size', snippet), 'small');
		});

		it('should return correct result when inline with code', () => {
			const snippet = `<!-- docs: demo name:d2l-component size:small -->
<d2l-component></d2l-component>`;
			assert.equal(parseConfigurationValue('name', snippet), 'd2l-component');
			assert.equal(parseConfigurationValue('size', snippet), 'small');
		});

		it('should return nothing when tag not present', () => {
			const snippet = '<!-- docs: demo name:d2l-component size:small -->';
			assert.equal(parseConfigurationValue('tag2', snippet), undefined);
		});

		it('should throw if inline and requires being split on new lines', () => {
			const snippet = '<!-- docs: demo name:d2l-component size:small defaults:{"type":"hello"} -->';
			assert.throws(() => { parseConfigurationValue('name', snippet, true); });
		});

		it('should return correct result when multi-line', () => {
			const snippet = `<!-- docs: demo
name:d2l-component
size:small
-->`;
			assert.equal(parseConfigurationValue('name', snippet), 'd2l-component');
			assert.equal(parseConfigurationValue('size', snippet), 'small');
		});

		it('should return correct result when multi-line with code', () => {
			const snippet = `<!-- docs: demo
name:d2l-component
size:small
-->
<d2l-component></d2l-component>`;
			assert.equal(parseConfigurationValue('name', snippet), 'd2l-component');
			assert.equal(parseConfigurationValue('size', snippet), 'small');
		});

		it('should return correct result when multi-line with comment close on last line', () => {
			const snippet = `<!-- docs: demo
name:d2l-component
size:small -->`;
			assert.equal(parseConfigurationValue('name', snippet), 'd2l-component');
			assert.equal(parseConfigurationValue('size', snippet), 'small');
		});

		it('should return correct result when multi-line with space', () => {
			const snippet = `<!-- docs: demo
name: d2l-component
size: small -->`;
			assert.equal(parseConfigurationValue('name', snippet), 'd2l-component');
			assert.equal(parseConfigurationValue('size', snippet), 'small');
		});

		it('should return correct result when multi-line with space', () => {
			const snippet = `<!-- docs: demo
name: d2l-component
size: small
-->`;
			assert.equal(parseConfigurationValue('name', snippet), 'd2l-component');
			assert.equal(parseConfigurationValue('size', snippet), 'small');
		});

		it('should return correct result when multi-line with defaults', () => {
			const snippet = `<!-- docs: demo
name: d2l-component
size: small
defaults: {"type":"type1", "other": true}
-->`;
			assert.equal(parseConfigurationValue('name', snippet, true), 'd2l-component');
			assert.equal(parseConfigurationValue('size', snippet, true), 'small');
			assert.equal(parseConfigurationValue('defaults', snippet, true), '{"type":"type1", "other": true}');
		});
	});
});
