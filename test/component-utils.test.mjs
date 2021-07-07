import { getCode, parseImports } from '../pages/assets/utils.mjs';
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
				snippet: `<!-- docs: demo live
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
				snippet: `<!-- docs: demo code -->
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

	describe.only('getCode', () => {
		const comment = `<!-- docs: demo live
name:d2l-button
-->`;
		const basicCode = `<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button>Button</d2l-button>`;
		const codeAttributes = '<d2l-button $attributes></d2l-button>';

		it('should return empty string when empty snippet', () => {
			assert.equal(getCode(), '');
		});

		it('should return code when just code', () => {
			assert.equal(getCode(basicCode), basicCode);
		});

		it('should return code when comment and code', () => {
			const code = `${comment}${basicCode}`;
			assert.equal(getCode(code), basicCode);
		});

		it('should return unmodified code when not interactive', () => {
			assert.equal(getCode(codeAttributes), codeAttributes);
		});

		it('should return code when interactive', () => {
			assert.equal(getCode(codeAttributes, true), '<d2l-button></d2l-button>');
		});

		it('should return expected code when attributes', () => {
			const attributes = {
				'text': { type: 'string', value: 'My button' },
				'disabled': { type: 'boolean', value: true },
				'primary': { type: 'boolean', value: false },
				'sum': { type: 'number', value: 12 },
				'other': { type: 'invalid', value: 'thing' }
			};
			const expected = '<d2l-button disabled sum=12 text="My button"></d2l-button>';
			assert.equal(getCode(codeAttributes, true, attributes), expected);
		});
	});

});
