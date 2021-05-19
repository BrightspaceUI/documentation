const { getScript } = require('../tools/getScript');
const assets = require('../pages/_data/assets');
const assert = require('assert');
const sinon = require('sinon');

describe.only('getScript', () => {

	const fileName = 'file.js';

	['development'].forEach((env) => {

		const expectedFile = 
		before(() => {
			if (env === 'production') {
				const stub = sinon.stub(assets, 'getPath');
				stub.withArgs(fileName).returns(expectedFile);
				stub.withArgs(sinon.match((value) => value !== fileName)).throws();
			}
		});

		[
			// { name: 'empty input', input: '', output_development: '', output_production: '' },
			// { name: 'no script', input: '<div>hello</div>', output_development: '', output_production: '' },
			// {
			// 	name: 'script only',
			// 	input: `<script>import '/${fileName}';</script>`,
			// 	output_development: `<script type="module">\nimport '/${fileName}';\n</script>`,
			// 	output_production: `<script src="${expectedFile}" type="module"></script>\n`
			// }, {
			// 	name: 'script with type on single line',
			// 	input: `<script type="module">import '/${fileName}';</script>`,
			// 	output_development: `<script type="module">\nimport '/${fileName}';\n</script>`,
			// 	output_production: `<script src="${expectedFile}" type="module"></script>\n`
			// }, {
			// 	name: 'script with no imports',
			// 	input: '<script type="module"></script>',
			// 	output_development: '',
			// 	output_production: ''
			// }, {
			// 	name: 'script with two imports',
			// 	input: `<script type="module">\nimport '/${fileName}';\nimport '/other/${fileName}';</script>`,
			// 	output_development: `<script type="module">\nimport '/${fileName}';\nimport '/other/${fileName}';\n</script>`,
			// 	output_production: `<script src="${expectedFile}" type="module"></script>\n<script src="${expectedFile}" type="module"></script>\n`
			// }, {
			// 	name: 'script with one import on different line',
			// 	input: `<script type="module">\nimport '/${fileName}';\n</script>`,
			// 	output_development: `<script type="module">\nimport '/${fileName}';\n</script>`,
			// 	output_production: `<script src="${expectedFile}" type="module"></script>\n`
			// }, 
			{
				name: 'script with import starting with @',
				input: `<script type="module">\nimport '@brightspace-ui/core/components/button/button.js';\n</script>`,
				output_development: `<script type="module">\nimport '@brightspace-ui/core/${fileName}?module';\n</script>`,
				output_production: `<script src="${expectedFile}" type="module"></script>\n`
			}, 
			// {
			// 	name: 'script with one valid file and some other text',
			// 	input: `<script type="module">\nimport '/long/file/path/${fileName}';\n other script text</script>`,
			// 	output_development: `<script type="module">\nimport '/long/file/path/${fileName}?module';\n</script>`,
			// 	output_production: `<script src="${expectedFile}" type="module"></script>\n`
			// }
		].forEach((testCase) => {
			it(`${env} - should return correct result for ${testCase.name}`, () => {
				console.log(getScript(testCase.input));
				assert.equal((getScript(testCase.input, env)), testCase[`output_${env}`]);
			});
		});

		// [
		// 	{
		// 		name: 'script with two imports on single line',
		// 		input: `<script type="module">\nimport '/${fileName}'; import '/other/other-file.js';</script>`
		// 	}, {
		// 		name: 'script with file not in manifest',
		// 		input: '<script type="module">\nimport \'/filepath/other-file.js\';\n</script>'
		// 	}, {
		// 		name: 'script with import with no backslash',
		// 		input: `<script type="module">\nimport '${fileName}';\n</script>`,
		// 		output_development: '<script type="module">\n</script>',
		// 		output_production: ''
		// 	}, {
		// 		name: 'script with one file in manifest and one not',
		// 		input: `<script type="module">\nimport '/long/file/path/${fileName}';\n   import '/other-file.js';</script>`,
		// 		output_development: `<script type="module">\nimport '/long/file/path/${fileName}';\n</script>`,
		// 		output_production: `<script src="${expectedFile}" type="module"></script>\n`
		// 	}
		// ].forEach((testCase) => {
		// 	it(`${env} - should throw for ${testCase.name}`, () => {
		// 		assert.throws(() => getScript(testCase.input, env));
		// 	});
		// });
	});
});
