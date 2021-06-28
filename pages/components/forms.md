---
layout: layouts/base
eleventyNavigation:
  title: Forms
  key: forms
  parent: components
  order: 3
---

# Form Components
```html
<!-- docs: live demo name:d2l-overflow-group size:medium -->
<script type="module">
  import '@brightspace-ui/core/components/overflow-group/overflow-group.js';
</script>
<div style="max-width: 400px;">
  <d2l-overflow-group $attributes>
    <d2l-button>New</d2l-button>
    <d2l-dropdown>
      <d2l-dropdown-button text="Explore Topics" class="d2l-dropdown-opener"></button>
      <d2l-dropdown-menu id="dropdown" >
        <d2l-menu label="Astronomy">
          <d2l-menu-item text="Introduction"></d2l-menu-item>
          <d2l-menu-item text="Searching for the Heavens"></d2l-menu-item>
          <d2l-menu-item text="The Solar System"></d2l-menu-item>
          <d2l-menu-item text="Stars &amp; Galaxies"></d2l-menu-item>
          <d2l-menu-item text="The Night Sky"></d2l-menu-item>
          <d2l-menu-item text="The Universe"></d2l-menu-item>
        </d2l-menu>
      </d2l-dropdown-menu>
    </d2l-dropdown>
    <d2l-button>Copy</d2l-button>
    <d2l-button>Import</d2l-button>
    <d2l-button>Delete</d2l-button>
  </d2l-overflow-group>
</div>
```