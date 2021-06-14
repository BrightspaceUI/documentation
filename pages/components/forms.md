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
<!-- docs: demo -->
<script type="module">
  import '@brightspace-ui/core/components/button/button.js';
  import '@brightspace-ui/core/components/button/button-subtle.js';
  import '@brightspace-ui/core/components/button/button-icon.js';
</script>
<d2l-button>Button</d2l-button>
<d2l-button primary>Primary Button</d2l-button>
<d2l-button-subtle text="Subtle Button" icon="tier1:gear"></d2l-button-subtle>
<d2l-button-icon text="Icon Button" icon="tier1:gear"></d2l-button-icon>
```
```html 		
<!-- docs: live demo name:d2l-tooltip size:xlarge -->
<script type="module">
  import '@brightspace-ui/core/components/button/button.js';
  import '@brightspace-ui/core/components/tooltip/tooltip.js';
</script>

<d2l-button id="tooltip-info">Hover for Info</d2l-button>
<d2l-tooltip $attributes for="tooltip-info">
  Your info message will display here
</d2l-tooltip>
```
```html
<!-- docs: live demo name:d2l-input-date size:xlarge -->
<script type="module">
  import '@brightspace-ui/core/components/inputs/input-date.js';
</script>
<d2l-input-date label="Date" $attributes></d2l-input-date>
```
```html
<!-- docs: live demo name:d2l-dropdown-menu size:large -->
<script type="module">
  import '@brightspace-ui/core/components/menu/menu.js';
  import '@brightspace-ui/core/components/menu/menu-item.js';
  import '@brightspace-ui/core/components/menu/menu-item-link.js';
  import '@brightspace-ui/core/components/menu/menu-item-radio.js';
  import '@brightspace-ui/core/components/dropdown/dropdown.js';
  import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
</script>
<d2l-dropdown>
  <button class="d2l-dropdown-opener">Open it!</button>
  <d2l-dropdown-menu $attributes id="dropdown">
    <d2l-menu label="Astronomy">
      <d2l-menu-item text="Introduction" ></d2l-menu-item>
      <d2l-menu-item text="Searching for the Heavens "></d2l-menu-item>
      <d2l-menu-item text="The Solar System">
        <d2l-menu>
          <d2l-menu-item text="Formation"></d2l-menu-item>
          <d2l-menu-item text="Modern Solar System"></d2l-menu-item>
          <d2l-menu-item text="Future Solar System"></d2l-menu-item>
          <d2l-menu-item text="The Planets">
            <d2l-menu>
              <d2l-menu-item text="Mercury"></d2l-menu-item>
              <d2l-menu-item text="Venus"></d2l-menu-item>
              <d2l-menu-item text="Earth"></d2l-menu-item>
              <d2l-menu-item text="Mars"></d2l-menu-item>
              <d2l-menu-item text="Jupiter"></d2l-menu-item>
              <d2l-menu-item text="Saturn"></d2l-menu-item>
              <d2l-menu-item text="Uranus"></d2l-menu-item>
              <d2l-menu-item text="Neptune"></d2l-menu-item>
              <d2l-menu-item text="Dwarf Planets"></d2l-menu-item>
            </d2l-menu>
          </d2l-menu-item>
          <d2l-menu-item text="The Sun"></d2l-menu-item>
          <d2l-menu-item text="Solar &amp; Lunar Eclipses"></d2l-menu-item>
          <d2l-menu-item text="Meteors &amp; Meteorites"></d2l-menu-item>
          <d2l-menu-item text="Asteroids"></d2l-menu-item>
          <d2l-menu-item text="Comets"></d2l-menu-item>
        </d2l-menu>
      </d2l-menu-item>
    </d2l-menu>
  </d2l-dropdown-menu>
</d2l-dropdown>
```

```html
<!-- docs: demo name:d2l-button -->
<script type="module">
  import '@brightspace-ui/core/components/button/button.js';
</script>
<d2l-button $attributes>test</d2l-button>
```