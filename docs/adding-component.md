# Adding a Component to the Site

Components with pages in the Daylight site are generally those that are considered official components. These component pages are generated from the component's README.

Other components that are a work in progress have pages that are generated from their issue in this repo. If the component is not considered an official component then follow the steps mentioned in [Creating the Component Issue](#creating-the-component-issue) for the component type.

The main steps to add a component page to the Daylight site for an **official component** are:
- [Preparing the component](#preparing-the-component) (in the component's repo)
- [Creating the component issue](#creating-the-component-issue) (in this repo)

## Preparing the Component

### Component Code

Add JSDoc comments to your component. See [input-text](https://github.com/BrightspaceUI/core/blob/master/components/inputs/input-text.js) as an example. Include each of the following where applicable:
- Description
- `@slot` (slots)
- `@fires` (events)
- Properties descriptions and `@type` if needed (see `type` property in `input-text`)

### Generating custom-elements.json

The `custom-elements.json` file is used for the component's properties, slots, and events.

1. Ensure the `release.yml` GitHub action has a step that generates `custom-elements.json`. For example:
```
- name: Create custom-elements.json
  run: npx wca analyze \"src/*.js\" --format json --outFile custom-elements.json
```
2. In `package.json` add `custom-elements.json` to `"files"` array.

### README/Markdown Document

1. Remove `properties`, `slots`, and `events` sections. Rename `Accessibility` section to `Accessible Properties`.
2. Order the document as follows:
- Title
- Description
- Demo with code hidden that displays a preview of all components described within that page (e.g., for the Button page it would show all button versions such as regular, subtle, icon). See [Code Blocks](#code-blocks).
- Design content (could include Best Practices (see [Best Practices](#best-practices)), Accessibility, and Responsive Behaviour)
- Component heading with tag beside it (e.g., `## Button [d2l-button]`)
- Live demo (see [Code Blocks](#code-blocks))
- Any other content that should appear in the document, potentially also including a secondary demo or other code block (see [Code Blocks](#code-blocks)).
- Content that should not appear in the Daylight site (see [Hidden Content](#hidden-content))
3. When these changes are merged, ensure a release happens in order for the Daylight site to pick up the changes.

#### Best Practices

The content of the best practices section should be formatted as:
```
<!-- docs: start best practices -->
<!-- docs: start dos -->
* Do this
<!-- docs: end dos -->

<!-- docs: start donts -->
* Don't do that
<!-- docs: end donts -->
<!-- docs: end best practices -->
```

#### Code Blocks

**Code-hidden demo:** This demo shows only the visual portion of the component(s) without the code. It is generally used at the top of a component page.

Add the comment `<!-- docs: demo -->` directly before the code block. For example:
```
<!-- docs: demo
size:<'small'|'medium'|'large'|'xlarge'>
-->
```html
<script type="module">
  import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button></d2l-button>
\`\`\`
```

**Interactive demo**: (maximum of 1 per component) This demo includes the properties, slots, and events tables, and allows for the user to modify properties in these table(s) which then affects the demo.

Add the comment `<!-- docs: demo live -->` directly before the code block. Note that if `defaults` is being used in order to set default demo values, the demo information pieces must be separated by newlines rather than be inline (e.g., `<!-- docs: demo live name:d2l-button -->`). For example:
```
<!-- docs: demo live
name:<component-tag, e.g., d2l-button>
size:<'small'|'medium'|'large'|'xlarge'>
defaults:{"<attribute>": <value: "string"|boolean|number>}>
-->
```html
<script type="module">
  import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button></d2l-button>
\`\`\`
```

If there are multiple instances of the same component in a demo (e.g., menu-item) and they all should be affected by changes to the properties table, set `allInstancesInteractive` to true. If this is not present and true then only the first instance of the component will be affected by changes to the properties table. For example:
```
<!-- docs: demo live
name:d2l-menu-item
allInstancesInteractive:true
>
-->
```html
<script type="module">
  import '@brightspace-ui/core/components/menu/menu.js';
  import '@brightspace-ui/core/components/menu/menu-item.js';
</script>
<d2l-menu label="Astronomy">
  <d2l-menu-item text="Introduction"></d2l-menu-item>
  <d2l-menu-item text="The Solar System">
    <d2l-menu>
      <d2l-menu-item text="Formation"></d2l-menu-item>
    </d2l-menu>
  </d2l-menu-item>
</d2l-menu>
\`\`\`
```

**Secondary demo:** This demo shows the component(s) and the code but does not allow any modification. This can be used to show different varients of a component but should be used sporadically generally in order to call out significant varients.

Add the comment `<!-- docs: demo code -->` directly before the code block. For example:
```
<!-- docs: demo code
size:<'small'|'medium'|'large'|'xlarge'>
-->
```html
<script type="module">
  import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button></d2l-button>
\`\`\`
```

**Code blocks:** Other code blocks with no docs comment will be rendered as code blocks.

#### Hidden Content

This includes information such as installation and testing instructions. Wrap these sections in `<!-- docs: start hidden content -->` and `<!-- docs: end hidden content -->`. For example:

```
<!-- docs: start hidden content -->
**Testing Information**
This section should not appear in the component catalog.
<!-- docs: end hidden content -->
```

### Tips

- Be careful with any relative urls for links or screenshots in the file.
- Screenshots (minimize number of these is possible) should be stored in a `./screenshots` directory in your repo in order to be copied over correctly.

## Creating the Component Issue

### Requested Component

If you have a component idea that you would like to suggest then you can [submit a GitHub issue](https://github.com/BrightspaceUI/documentation/issues/new?assignees=&labels=Requested+Component&template=component-request.md&title=%3CComponent+Name%3E) for it. These component requests will appear in the Daylight site in the status pages, and will have pages generated from their issues.

### Labs Component

Labs components generally do not have complete documentation pages in the Daylight site, but do appear in the Status table and also have pages generated from their issues. To document these, [use the GitHub issue template](https://github.com/BrightspaceUI/documentation/issues/new?assignees=&labels=Labs+Component&template=component-in-progress.md&title=%3CComponent+Name%3E).

### Official Component

Once the [Preparing the Component](#preparing-the-component) steps have been completed, [open a GitHub issue](https://github.com/BrightspaceUI/documentation/issues/new?assignees=&labels=Official+Component&template=component-documented.md&title=%3CComponent+Name%3E).

Notes:
- Issues in the documentation repository should be closed if documentation and development are complete.
- If the component is ready for the production site, add the `Published` label. This will open a PR so that you can preview the component's page.
