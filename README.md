[![Dependabot badge](https://flat.badgen.net/dependabot/BrightspaceUI/documentation?icon=dependabot)](https://app.dependabot.com/)
[![Build status](https://travis-ci.com/BrightspaceUI/documentation.svg?branch=master)](https://travis-ci.com/BrightspaceUI/documentation)

# Brightspace Component Catalog

## Running

Development (for now, will eventually use `npm run serve` once the copyMarkdown script is in use):
```
npm run generate && npm run build:rollup && npm run serve:test
```

Note that `build:rollup` does not need to be run each time if the imports have not changed.

Production:
```
npm run build
```

## Preparing Component for the Catalog

The component markdown document(s) will mostly appear in the catalog as is with a few steps needed.

In the component repo do the following:
1. Add JSDOC comments to your components. See [input-text](https://github.com/BrightspaceUI/core/blob/master/components/inputs/input-text.js) as an example. Document the following at minimum and if applicable:
- Description
- `@slot` (slots)
- `@fires` (events)
- Properties descriptions and `@type` if needed (see `type` property in `input-text`)
2. In `package.json` add the following to `scripts` (modifying as needed):
```
"analyze": "wca analyze \"*.js\" --format json --outFile custom-elements.json",
"prepublishOnly": "npm run analyze",
```
3. In `package.json` add `custom-elements.json` to `"files"` array.
4. In markdown document(s) add the following front matter (modifying as needed) to the top of the document (note that two spaces must be used for indentation rather than tab):
```
---
layout: layouts/component
keywords:
  - date picker
eleventyNavigation:
  key: input-date
  title: Date Input
  parent: inputs
---
```
- `layout`: should equal `layouts/component` for a component
- `keywords`: possible related terms that someone might search for to try to find this component [TODO: this could change when search is implemented]
- `eleventyNavigation`:
	- `key`: Used for the file's basename in the url (since we might want it to be different than the filename)
	- `title`: Title that appears in the navigation and as the page title. Should correspond to markdown H1.
	- `parent`: Parent in website hierarychy. Likely corresponds to type. Casing does matter.
5. In markdown document(s) remove `properties`, `slots`, and `events` sections
6. In markdown document(s) order the document as follows:
- Title
- Description
- Live demo (see below for more information)
- Any other content that should appear in the document, potentially also including a secondary demo or other code block
- Content that should not appear in the document
7. In markdown document(s) add comments as shown in "Properly Commenting Markdown file" below.

### Properly Commenting Markdown file

**Code Blocks**

Interactive demo (maximum of 1 per file): add the comment `<!-- docs: live demo -->` within the code block at the top. For example:
```
```html
<!-- docs: live demo -->
<script type="module">
  import '/assets/js/input-date.js';
</script>
<d2l-input-date
  label="Start Date"
  value="2020-11-20">
</d2l-input-date>
\`\`\`
```

Secondary demo: add the comment `<!-- docs: demo -->` within the code block. For example:
```
```html
<!-- docs: demo -->
<script type="module">
  import '/assets/js/input-date.js';
</script>
<d2l-input-date
  label="Start Date"
  value="2020-11-20">
</d2l-input-date>
\`\`\`
```

Other code blocks will be rendered as code blocks.

**Content that should be hidden**

This includes information such as installation instructions and testing instructions. Wrap tese sections in `<!-- docs: start hidden content -->` and `<!-- docs: end hidden content -->`. For example:

```
<!-- docs: start hidden content -->
**Testing Information**
This section should not appear in the component catalog.
<!-- docs: end hidden content -->
```

### Tips

- Be careful with any relative urls for links or screenshots in the file. [TODO: this could change when parsing of links and screenshots is more cleaned up]
- Screenshots (minimize number of these is possible) should be stored in a `./screenshots` directory in your repo in order to be copied over correctly. [TODO: this could change when parsing of links and screenshots is more cleaned up]

## Adding Component to the Catalog

In this repo do the following:
1. Install component and save as dev dependency
```
npm i [component] --save-dev
```
2. Add markdown file(s) to `componentDocs` array in components-source.js and `custom-elements.json` location to `customElements` array in components-source.js.
3. Add component import to `componentFiles` array in rollup.config.js
