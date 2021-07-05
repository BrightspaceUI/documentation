---
layout: layouts/demo
---

# Component Catalogue - Demo Page

### Interactive demo - Includes text variations for coloring [demo-snippet]

```html
<!-- docs: live demo name:d2l-button auto:false size:medium -->
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