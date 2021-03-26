const fs = require('fs');
const glob = require("glob");
const pathJS = require("path");
const docsSource = require("./components-source");

if (!fs.existsSync('src/components')) {
	fs.mkdirSync('src/components');
}

// TODO: import screenshots
docsSource.componentDocs.forEach((path) => {
	glob(path, {}, (err, files) => {
		if (err) {
			console.log('err! ' + err);
		}

		files.forEach((file) => {
			let name = pathJS.basename(file);
			if (name === 'README.md') {
				// TODO: change name to be repo.md or component.md
			}
			fs.copyFileSync(file, `src/components/imported/${name}`);
		});
	});
});
