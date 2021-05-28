---
layout: layouts/component-status
eleventyNavigation:
  title: Status
  key: status
  parent: components
  order: 1
---

# Component Status

This page lists all our components, including [Labs]() components and even [requested]() components that haven't been built yet. We include the overall status of the component, but you can get the full details by clicking on the component name or its status.

To learn more on how we organize components see [Component Tiers]().

## Official Components
The "official" tier is reserved for components that have complete buy-in from design and are common to many pages or workflows in Brightspace.

Official components adhere to our architectural guidelines, are localized and highly performant. They have a full suite of automated tests (include accessibility and perceptual diff), a demo page, and appropriate documentation.

{% statusTable "official" %}

## Labs Components
Components that fall into the "labs" tier have some buy-in from design, at least in an experimental sense. They may not have a full pattern documented on design.d2l yet, but some design thought has gone into the component and where and how it should be used. The component has the potential to be used in multiple places.

Labs components may not fully adhere to archutectural guidelines, and may be missing some tests or documentation.

{% statusTable "labs" %}

## Requested Components
If you can't find what you're looking for, it may already be in the pipeline! This is a list of requested components or known gaps we're tracking.

{% statusTable "request" %}

Are we missing something? [Create a Request]().
