const fs = require('fs');
const glob = require("glob");
const pathJS = require("path");
const docsSource = require("./components-source");

const baseDir = 'pages/components/imported';
if (!fs.existsSync(baseDir)) {
	fs.mkdirSync(baseDir);
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
			fs.copyFileSync(file, `${baseDir}/${name}`);
		});
	});
});
