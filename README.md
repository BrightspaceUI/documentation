[![Dependabot badge](https://flat.badgen.net/dependabot/BrightspaceUI/documentation?icon=dependabot)](https://app.dependabot.com/)
[![Build status](https://travis-ci.com/BrightspaceUI/documentation.svg?branch=master)](https://travis-ci.com/BrightspaceUI/documentation)

# Brightspace Component Catalog

## Running

Development (collects GitHub issues, does rollup build, then serves)
```
npm run serve
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
4. In markdown document(s) remove `properties`, `slots`, and `events` sections
5. In markdown document(s) order the document as follows:
- Title
- Description
- Live demo (see below for more information)
- Any other content that should appear in the document, potentially also including a secondary demo or other code block
- Content that should not appear in the document
6. In markdown document(s) add comments as shown in "Properly Commenting Markdown file" below.

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

## Adding A Component to the Catalog

### Component Request

If you have a component idea that you would like to suggest then you can submit a GitHub issues for it.

1. Create a GitHub issue with the optional content of `design: [Complete|In Progress|Out of Date|Not Started]`
2. Label the issue with the `Component Request` label

### Component In Progress

For a component that is already in progress but is not yet in the catalog and does not have complete documentation please do the following:

1. Create a GitHub issue which contains the following:
```
repo: https://github.com/BrightspaceUI/core
development: [Complete|In Progress|Out of Date|Not Started]
design: [Complete|In Progress|Out of Date|Not Started]
```
2. Label the issue with the `Component In Progress` label

### Fully Documented Component

For a component that is complete and fully documented (following the "Preparing Component for the Catalog" steps above):

1. Create a GitHub issue (if it does not already have one) which contains the following:
```
<!--
---
layout: layouts/component
keywords:
  - date picker
eleventyNavigation:
  key: input-date
  title: Date Input
  parent: forms
---
-->
repo: https://github.com/BrightspaceUI/core
baseInstallLocation: @brightspace-ui/core
component: components/inputs/input-date.js
markdown: components/inputs/docs/input-date.md
```
The parts of the front matter (the information between the `---`) are:
- `layout`: should equal `layouts/component` for a component
- `keywords`: possible related terms that someone might search for to try to find this component [TODO: this could change when search is implemented]
- `eleventyNavigation`:
	- `key`: Used for the file's basename in the url (since we might want it to be different than the filename)
	- `title`: Title that appears in the navigation and as the page title. Should correspond to markdown H1.
	- `parent`: Parent in website hierarychy. Likely corresponds to type. Casing does matter.
2. Label the issue with the `Component Documented` label
3. Open the issue then close it if documentation and development are complete
