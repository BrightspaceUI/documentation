---
layout: layouts/component
keywords:
  - button
eleventyNavigation:
  key: button
  title: Button
  parent: components
---

# Button

## d2l-button

The `d2l-button` element can be used just like the native button element, but also supports the `primary` attribute for denoting the primary button.

Demo:
```html
<!-- docs: demo -->
<script type="module">
  import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button>My Button</d2l-button>
```

Code block:
``` html
<script type="module">
  import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button>My Button</d2l-button>
```

**Accessibility:**

To make your `d2l-button` accessible, use the following properties when applicable:

| Attribute | Description |
|--|--|
| `aria-expanded` | [Indicate expansion state of a collapsible element](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-expanded). Example: [d2l-more-less](https://github.com/BrightspaceUI/core/blob/f9f30d0975ee5a8479263a84541fc3b781e8830f/components/more-less/more-less.js#L158). |
| `aria-haspopup` | [Indicate clicking the button opens a menu](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-haspopup). Example: [d2l-dropdown](https://github.com/BrightspaceUI/core/blob/master/components/dropdown/dropdown-opener-mixin.js#L46). |
| `description` | Use when text on button does not provide enough context. |

<!-- docs: start hidden content -->
**Hidden Content:**

You should not see me!

| Test | Table |
|--|--|
| hello | I'm not here |
<!-- docs: end hidden content -->
