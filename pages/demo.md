---
layout: layouts/demo
---

# Component Catalogue - Demo Page

### Interactive demo - Includes text variations for coloring [demo-snippet]

<!-- docs: demo live name:d2l-button -->
```html
<script type="module">
	/*
		Block comment
	*/
	import '@brightspace-ui/core/components/button/button.js';
	import '@brightspace-ui/core/components/button/button-subtle.js';
	import '@brightspace-ui/core/components/button/button-icon.js';

	// A normal comment
	function fun() {
		console.log("Test Function");
		const x = 4 * 5;
		return x && true;
	}
</script>
<style>
	@import url(https://fonts.googleapis.com/css?family=Questrial);

	html {
		padding: 0 !important;
	}
	.d2l-class {
		background-color: var(--d2l-color-ferrite);
		color: #ffffff;
	}
</style>
<d2l-button $attributes>Button</d2l-button>
```
### Interactive demo - size

<!-- docs: demo live
name:d2l-button
size:medium
defaults:{"disabled":true}
-->
```html
<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button $attributes>Button</d2l-button>
```

### Demo - non-interactive

<!-- docs: demo -->
```html
<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button>Button</d2l-button>
```

### Demo - non-interactive w/ code

<!-- docs: demo code size:large-->
```html
<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button>Button</d2l-button>
```

### Code - Inline code snippet

```html
<script type="module">
	import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button>Button</d2l-button>
```

### Example Markdown table from README

| Property | Type | Description |
|---|---|---|
| `for-target` | String, required | id of the target element to display backdrop behind |
| `no-animate-hide` | Boolean | Disables the fade-out transition while the backdrop is being hidden |
| `shown` | Boolean | Used to control whether the backdrop is shown |
| `slow-transition` | Boolean | Increases the fade transition time to 1200ms (default is 200ms) |
