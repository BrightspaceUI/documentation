const assert = require('assert');
const { getScript } = require('../tools/getScript');

const exampleScript1 = `<!-- docs: code demo -->
<script type="module">
  import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button $attributes>Button</d2l-button>`;

describe('getScript', () => {
	// todo add tests for getScript
	it ('Returns default imports', () => {
		const imports = getScript(exampleScript1);

		assert(imports.includes('typography.js'));
	});
	it ('appends ?module to script imports', () => {
		const imports = getScript(exampleScript1);

		assert(imports.includes('button.js?module'));
	});
});
