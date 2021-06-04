---
layout: layouts/component-status
eleventyNavigation:
  title: Status
  key: status
  parent: components
  order: 1
---

# Component Status

This page lists all of our components, including [Labs]() components and [requested]() components. We include the overall status of each component, but for more details follow the link on the component name.

To learn more about how we organize our components see [Component Tiers]().

## Official Components
The "official" tier is reserved for components that have complete support from our designers and are common to many pages or workflows in Brightspace.

Official components adhere to our architectural guidelines, are localized, and highly performant. They have a full suite of automated tests (including accessibility and visual diff), a demo page, and appropriate documentation.

{% statusTable "official" %}

## ![labs icon](/img/labs-icon.svg) Labs Components
Components that fall into the "labs" tier have some support from our designers, at least in an experimental sense. Some design thought has gone into the component, including where and how it should be used. The component has the potential to be used in multiple places.

Labs components may not fully adhere to architectural guidelines, and may be missing some tests or documentation.

{% statusTable "labs" %}

## ![request icon](/img/request-icon.svg) Requested Components
If you can't find what you're looking for, it may already be in the pipeline! Below is a list of requested components or known gaps that we are tracking.

{% statusTable "request" %}

Are we missing something? [Create a Request](https://github.com/BrightspaceUI/documentation/issues/new/choose).
