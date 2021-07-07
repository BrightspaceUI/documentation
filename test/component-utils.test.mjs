import assert from 'assert';
import { parseImports } from '../pages/assets/utils.mjs';

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

});
