import assert from 'assert';
import { parseImports } from '../pages/assets/utils.mjs';

describe('component-utils', () => {
	describe('parseImports', () => {
		it('should return correct result for code hidden snippet', () => {
			const snippet = `<!-- docs: demo -->
<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button></d2l-button>`;
			const expected = `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/button/button.js?module';
`;
			assert.equal(parseImports(snippet), expected);
		});

		it('should return correct result for interactive demo snippet', () => {
			const snippet = `<!-- docs: live demo
name:<component-tag, e.g., d2l-button>
size:<'small'|'medium'|'large'|'xlarge'>
-->
<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button $attributes></d2l-button>`;

			const expected = `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/button/button.js?module';
`;
			assert.equal(parseImports(snippet), expected);

		});

		it('should return correct result for seconary demo snippet', () => {
			const snippet = `<!-- docs: code demo -->
<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button></d2l-button>`;

			const expected = `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/button/button.js?module';
`;
			assert.equal(parseImports(snippet), expected);

		});

		it('should return correct result for regular code block', () => {
			const snippet = `<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button></d2l-button>`;

			const expected = `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/button/button.js?module';
`;
			assert.equal(parseImports(snippet), expected);
		});

		it('should return correct result when no script', () => {
			const snippet = '<d2l-button></d2l-button>';
			const expected = '';
			assert.equal(parseImports(snippet), expected);
		});

		it('should return correct result when multiple imports', () => {
			const snippet = `<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
	import '@brightspace-ui/core/components/button2/button2.js';
</script>
<d2l-button></d2l-button>`;

			const expected = `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/button/button.js?module';
import '@brightspace-ui/core/components/button2/button2.js?module';
`;
			assert.equal(parseImports(snippet), expected);

		});

		it('should return correct result when script includes typography', () => {
			const snippet = `<script type="module">
	import '@brightspace-ui/core/components/typography/typography.js';
</script>
<d2l-button></d2l-button>`;

			const expected = `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/typography/typography.js?module';
`;

			assert.equal(parseImports(snippet), expected);
		});

		it('should reutrn correct result when script does not include imports', () => {
			const snippet = `<script type="module">
	const thing = [];
</script>
<d2l-button></d2l-button>`;
			const expected = `import '@brightspace-ui/core/components/typography/typography.js?module';
`;

			assert.equal(parseImports(snippet), expected);
		});

		it('should return correct result when two scripts', () => {
			const snippet = `<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<script type="module">
	const thing = [];
</script>
<d2l-button></d2l-button>`;
			const expected = `import '@brightspace-ui/core/components/typography/typography.js?module';
import '@brightspace-ui/core/components/button/button.js?module';
`;

			assert.equal(parseImports(snippet), expected);
		});
	});

});
