---
name: Component - Request
about: Submit a request for a new component to be built
title: "Component Request - <Component Name>"
labels: Component Request
assignees: ''
---

## <Component Name>

### General Information
Add a short description that describes the proposed component and one or two potential use cases.

Example:
<Dropdown Menus> are used to <group similar menu items under one parent container>. With them it’s possible to <add advanced control menu’s without occupying extra screen space> and <allow users to more easily find closely related menu items>.

### Attributes

List attributes and type declarations:

> - **attribute-name** (required or optional): `type` defaults to `value` – <description>

Example:

> - **title** (optional): `String` defaults to `””` – The title of the popup card to be displayed in the header
> - **onClose** (optional): `() => void` – A call-back for when the popup is closed

### Usage Examples (optional)
Here you can include sample code for general component usage or specific use cases that you believe should be outlined.

### Subcomponents (optional)
This section should only be included if the suggested component requires creation of new subcomponents. Include example usage, attributes, and most importantly a list of the proposed subcomponents.

Example:
The d2l-dropdown-menu component should include a menu-item sub component
> ```
> <d2l-dropdown-menu>
>      <d2l-menu-item text="Item 1"></d2l-menu-item>
>      <d2l-menu-item text="Item 2"></d2l-menu-item>
>      <d2l-menu-item text="Item 3"></d2l-menu-item>
> </d2l-dropdown-menu>
> ```
