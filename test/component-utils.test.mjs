import { parseConfigurationValue, parseImports } from '../pages/assets/utils.mjs';
import assert from 'assert';

describe('component-utils', () => {
	describe('parseImports', () => {

		[
			{
				name: 'code hidden snippet',
				snippet: `<!-- docs: demo -->
<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button></d2l-button>`,
				expected: `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/button/button.js?module';\n`
			}, {
				name: 'interactive demo snippet',
				snippet: `<!-- docs: live demo
name:<component-tag, e.g., d2l-button>
size:<'small'|'medium'|'large'|'xlarge'>
-->
<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button $attributes></d2l-button>`,
				expected: `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/button/button.js?module';\n`
			}, {
				name: 'secondary demo snippet',
				snippet: `<!-- docs: code demo -->
<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button></d2l-button>`,
				expected: `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/button/button.js?module';\n`
			}, {
				name: 'regular code block',
				snippet: `<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button></d2l-button>`,
				expected: `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/button/button.js?module';\n`
			}, {
				name: 'no script',
				snippet: '<d2l-button></d2l-button>',
				expected: ''
			}, {
				name: 'multiple imports',
				snippet: `<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
	import '@brightspace-ui/core/components/button2/button2.js';
</script>
<d2l-button></d2l-button>`,
				expected: `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/button/button.js?module';
import '@brightspace-ui/core/components/button2/button2.js?module';\n`
			}, {
				name: 'script includes typography',
				snippet: `<script type="module">
	import '@brightspace-ui/core/components/typography/typography.js';
</script>
<d2l-button></d2l-button>`,
				expected: `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/typography/typography.js?module';\n`
			}, {
				name: 'script does not include imports',
				snippet: `<script type="module">
	const thing = [];
</script>
<d2l-button></d2l-button>`,
				expected: 'import \'@brightspace-ui/core/components/typography/typography.js?module\';\n'
			}, {
				name: 'two scripts',
				snippet: `<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<script type="module">
	const thing = [];
</script>
<d2l-button></d2l-button>`,
				expected: `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/button/button.js?module';\n`
			}
		].forEach((test) => {
			it(`should return correct result when ${test.name}`, () => {
				assert.equal(parseImports(test.snippet), test.expected);
			});
		});
	});

	describe('parseConfigurationValue', () => {
		it('should return correct result when inline', () => {
			const snippet = '<!-- docs: demo name:d2l-component size:small -->';
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
