---
title: Buttons
permalink: /components/buttons/
layout: component
github: BrightspaceUI/button
bower: d2l-button
---
A button indicates a user action.

To create a button, extend the native HTML `<button>` element with with the `is="d2l-button"` custom element.

{% example %}
<button is="d2l-button">Button</button>
{% endexample %}

## Primary Buttons

The button for the most common user action should be made primary by setting the `primary` attribute.

{% note %}
A page should only ever have **ONE** primary button.
{% endnote %}

{% example %}
<button is="d2l-button" primary>Yes</button>
<button is="d2l-button">No</button>
{% endexample %}

## Disabled Buttons

To prevent a user from interacting with a button, add the standard HTML `disabled` attribute.

{% example %}
<button is="d2l-button" disabled>Disabled</button>
{% endexample %}

## Buttons with Icons

As a best practice buttons should only contain text -- not icons on their own or an icon accompanied by text.

Sometimes a clickable icon which is semantically a `<button>` is needed. In these cases, see: [Clickable Icons]({{ site.baseurl }}style/iconography/#clickable-icons).

## Floating Workflow Buttons

Longer pages which have important workflow buttons (e.g. save/cancel, next/previous) may wish to have those buttons float in a fixed position at the bottom of the screen. As the buttons are scrolled into view, they will dock at the bottom edge.

To apply this behavior, surround your buttons in the `<d2l-floating-buttons>` web component:

{% example demo: false %}
<d2l-floating-buttons>
	<button is="d2l-button">Save</button>
	<button is="d2l-button">Cancel</button>
</d2l-floating-buttons>
{% endexample %}

## Developing with Buttons

{% include bower.html name=page.bower %}

Then import the components you need:

{% example, demo: false %}
<!-- for normal and primary buttons -->
<link
  rel="import"
  href="bower_components/d2l-button/d2l-button.html">
<!-- for floating workflow buttons -->
<link
  rel="import"
  href="bower_components/d2l-button/d2l-floating-buttons.html">
{% endexample %}

### Fiddle with it!

<script async src="//jsfiddle.net/capa/z34s1zdq/embed/html,result/?bodyColor=f9fafb"></script>

{% include github.html name=page.github %}
