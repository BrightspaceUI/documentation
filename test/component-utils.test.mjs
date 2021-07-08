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

	describe('getCode', () => {
		const attributes = {
			'text': { type: 'string', value: 'My button' },
			'disabled': { type: 'boolean', value: true },
			'primary': { type: 'boolean', value: false },
			'sum': { type: 'number', value: 12 },
			'other': { type: 'invalid', value: 'thing' }
		};
		const basicCode = '<d2l-button>Button</d2l-button>';
		const comment = `<!-- docs: demo live
name:d2l-button
-->`;

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

		it('should return code when interactive', () => {
			assert.equal(getCode(basicCode, true), basicCode);
		});

		it('should return unmodified code when attributes but no tagName', () => {
			assert.equal(getCode(basicCode, true, attributes), basicCode);
		});

		it('should return expected code when attributes', () => {
			const expected = '<d2l-button disabled sum=12 text="My button">Button</d2l-button>';
			assert.equal(getCode(basicCode, true, attributes, 'd2l-button'), expected);
		});

		it('should only replace first instance', () => {
			const code = `<d2l-button>Button</d2l-button>
<d2l-button>Button 2</d2l-button>`;
			const expected = `<d2l-button disabled sum=12 text="My button">Button</d2l-button>
<d2l-button>Button 2</d2l-button>`;
			assert.equal(getCode(code, true, attributes, 'd2l-button'), expected);
		});

		it('should replace both instances when all is true', () => {
			const code = `<d2l-button>Button</d2l-button>
<d2l-button>Button 2</d2l-button>`;
			const expected = `<d2l-button disabled sum=12 text="My button">Button</d2l-button>
<d2l-button disabled sum=12 text="My button">Button 2</d2l-button>`;
			assert.equal(getCode(code, true, attributes, 'd2l-button', true), expected);
		});

		it('should not replace when tag part of longer tag', () => {
			const code = '<d2l-button-elem>Button</d2l-button-elem>';
			assert.equal(getCode(code, true, attributes, 'd2l-button', true), code);
		});

		describe('when code has existing attributes', () => {

			it('should return expected code', () => {
				const code = '<d2l-button other another="value">Button</d2l-button>';
				const expected = '<d2l-button other another="value" disabled sum=12 text="My button">Button</d2l-button>';
				assert.equal(getCode(code, true, attributes, 'd2l-button'), expected);
			});

			it('should return expected code when multiple on same line', () => {
				const code = '<d2l-button other>Button</d2l-button><d2l-button>Button</d2l-button>';
				const expected = '<d2l-button other disabled sum=12 text="My button">Button</d2l-button><d2l-button>Button</d2l-button>';
				assert.equal(getCode(code, true, attributes, 'd2l-button'), expected);
			});

			it('should return expected code when multiple and second has attributes but not replacing all', () => {
				const code = '<d2l-button other another="thing2">Button</d2l-button><d2l-button attr="value">Button</d2l-button>';
				const expected = '<d2l-button other another="thing2" disabled sum=12 text="My button">Button</d2l-button><d2l-button attr="value">Button</d2l-button>';
				assert.equal(getCode(code, true, attributes, 'd2l-button'), expected);
			});

			it('should return expected code when multiple and second has attributes and replacing all', () => {
				const code = '<d2l-button other another="thing2">Button</d2l-button><d2l-button-elem></d2l-button-elem><d2l-button attr="value">Button</d2l-button>';
				const expected = '<d2l-button other another="thing2" disabled sum=12 text="My button">Button</d2l-button><d2l-button-elem></d2l-button-elem><d2l-button attr="value" disabled sum=12 text="My button">Button</d2l-button>';
				assert.equal(getCode(code, true, attributes, 'd2l-button', true), expected);
			});

			it('should return expected code when multiple on different lines and second has attributes and replace all', () => {
				const code = `<d2l-button other>Button</d2l-button>
<d2l-button attr="value">Button</d2l-button>
<d2l-button-elem></d2l-button-elem>`;
				const expected = `<d2l-button other disabled sum=12 text="My button">Button</d2l-button>
<d2l-button attr="value" disabled sum=12 text="My button">Button</d2l-button>
<d2l-button-elem></d2l-button-elem>`;
				assert.equal(getCode(code, true, attributes, 'd2l-button', true), expected);
			});

			it('should return expected code when multiple on different lines and second has attributes and not replace all', () => {
				const code = `<d2l-button other another="thing2">Button</d2l-button>
<d2l-button attr="value">Button</d2l-button>`;
				const expected = `<d2l-button other another="thing2" disabled sum=12 text="My button">Button</d2l-button>
<d2l-button attr="value">Button</d2l-button>`;
				assert.equal(getCode(code, true, attributes, 'd2l-button'), expected);
			});

			it('should return expected code when multiple on different lines and second does not have attributes and replace all', () => {
				const code = `<d2l-button other another="thing2">Button</d2l-button>
<d2l-button>Button</d2l-button>`;
				const expected = `<d2l-button other another="thing2" disabled sum=12 text="My button">Button</d2l-button>
<d2l-button disabled sum=12 text="My button">Button</d2l-button>`;
				assert.equal(getCode(code, true, attributes, 'd2l-button', true), expected);
			});

			it('should return expected code when multiple on different lines and second does not have attributes and not replace all', () => {
				const code = `<d2l-button other>Button</d2l-button>
<d2l-button>Button</d2l-button>`;
				const expected = `<d2l-button other disabled sum=12 text="My button">Button</d2l-button>
<d2l-button>Button</d2l-button>`;
				assert.equal(getCode(code, true, attributes, 'd2l-button'), expected);
			});

		});
	});

});
