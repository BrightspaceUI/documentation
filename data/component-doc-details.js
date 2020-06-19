/* eslint quotes: 0 */

export default [
	{
		"name": "d2l-icon",
		"path": "./components/icons/icon.js",
		"attributes": [
			{
				"name": "icon",
				"type": "string"
			}
		],
		"properties": [
			{
				"name": "icon",
				"attribute": "icon",
				"type": "string"
			}
		]
	},
	{
		"name": "d2l-button-icon",
		"path": "./components/button/button-icon.js",
		"description": "The `d2l-button-icon` element can be used just like the native `button`, for instances where only an icon is displayed.",
		"attributes": [
			{
				"name": "h-align",
				"description": "Aligns the leading edge of text if value is set to \"text\".",
				"type": "string"
			},
			{
				"name": "icon",
				"description": "Preset icon key (e.g. `tier1:gear`)",
				"type": "string"
			},
			{
				"name": "text",
				"description": "Accessible text for the button",
				"type": "string"
			},
			{
				"name": "translucent",
				"description": "Indicates to display translucent (ex. on rich backgrounds)",
				"type": "boolean"
			},
			{
				"name": "aria-expanded",
				"type": "string"
			},
			{
				"name": "aria-haspopup",
				"type": "string"
			},
			{
				"name": "aria-label",
				"type": "string"
			},
			{
				"name": "disabled",
				"type": "boolean"
			},
			{
				"name": "autofocus",
				"type": "boolean"
			},
			{
				"name": "form",
				"type": "string"
			},
			{
				"name": "formaction",
				"type": "string"
			},
			{
				"name": "formenctype",
				"type": "string"
			},
			{
				"name": "formmethod",
				"type": "string"
			},
			{
				"name": "formnovalidate",
				"type": "string"
			},
			{
				"name": "formtarget",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "primary",
				"type": "boolean"
			},
			{
				"name": "type",
				"type": "string",
				"default": "\"button\""
			},
			{
				"name": "visible-on-ancestor",
				"type": "boolean"
			}
		],
		"properties": [
			{
				"name": "hAlign",
				"attribute": "h-align",
				"description": "Aligns the leading edge of text if value is set to \"text\".",
				"type": "string"
			},
			{
				"name": "icon",
				"attribute": "icon",
				"description": "Preset icon key (e.g. `tier1:gear`)",
				"type": "string"
			},
			{
				"name": "text",
				"attribute": "text",
				"description": "Accessible text for the button",
				"type": "string"
			},
			{
				"name": "translucent",
				"attribute": "translucent",
				"description": "Indicates to display translucent (ex. on rich backgrounds)",
				"type": "boolean"
			},
			{
				"name": "ariaExpanded",
				"attribute": "aria-expanded",
				"type": "string"
			},
			{
				"name": "ariaHaspopup",
				"attribute": "aria-haspopup",
				"type": "string"
			},
			{
				"name": "ariaLabel",
				"attribute": "aria-label",
				"type": "string"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean"
			},
			{
				"name": "autofocus",
				"attribute": "autofocus",
				"type": "boolean"
			},
			{
				"name": "form",
				"attribute": "form",
				"type": "string"
			},
			{
				"name": "formaction",
				"attribute": "formaction",
				"type": "string"
			},
			{
				"name": "formenctype",
				"attribute": "formenctype",
				"type": "string"
			},
			{
				"name": "formmethod",
				"attribute": "formmethod",
				"type": "string"
			},
			{
				"name": "formnovalidate",
				"attribute": "formnovalidate",
				"type": "string"
			},
			{
				"name": "formtarget",
				"attribute": "formtarget",
				"type": "string"
			},
			{
				"name": "name",
				"attribute": "name",
				"type": "string"
			},
			{
				"name": "primary",
				"attribute": "primary",
				"type": "boolean"
			},
			{
				"name": "type",
				"attribute": "type",
				"type": "string",
				"default": "\"button\""
			},
			{
				"name": "visibleOnAncestor",
				"attribute": "visible-on-ancestor",
				"type": "boolean"
			}
		]
	},
	{
		"name": "d2l-button-subtle",
		"path": "./components/button/button-subtle.js",
		"description": "The `d2l-button-subtle` element can be used just like the native `button`, but for advanced or de-emphasized actions.",
		"attributes": [
			{
				"name": "description",
				"description": "A description to be added to the `button` for accessibility",
				"type": "string"
			},
			{
				"name": "h-align",
				"description": "Aligns the leading edge of text if value is set to \"text\".",
				"type": "string"
			},
			{
				"name": "icon",
				"description": "Preset icon key (e.g. `tier1:gear`)",
				"type": "string"
			},
			{
				"name": "text",
				"description": "Text for the button",
				"type": "string"
			},
			{
				"name": "icon-right",
				"description": "Indicates that the icon should be rendered on right",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "aria-expanded",
				"type": "string"
			},
			{
				"name": "aria-haspopup",
				"type": "string"
			},
			{
				"name": "aria-label",
				"type": "string"
			},
			{
				"name": "disabled",
				"type": "boolean"
			},
			{
				"name": "autofocus",
				"type": "boolean"
			},
			{
				"name": "form",
				"type": "string"
			},
			{
				"name": "formaction",
				"type": "string"
			},
			{
				"name": "formenctype",
				"type": "string"
			},
			{
				"name": "formmethod",
				"type": "string"
			},
			{
				"name": "formnovalidate",
				"type": "string"
			},
			{
				"name": "formtarget",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "primary",
				"type": "boolean"
			},
			{
				"name": "type",
				"type": "string",
				"default": "\"button\""
			}
		],
		"properties": [
			{
				"name": "description",
				"attribute": "description",
				"description": "A description to be added to the `button` for accessibility",
				"type": "string"
			},
			{
				"name": "hAlign",
				"attribute": "h-align",
				"description": "Aligns the leading edge of text if value is set to \"text\".",
				"type": "string"
			},
			{
				"name": "icon",
				"attribute": "icon",
				"description": "Preset icon key (e.g. `tier1:gear`)",
				"type": "string"
			},
			{
				"name": "text",
				"attribute": "text",
				"description": "Text for the button",
				"type": "string"
			},
			{
				"name": "iconRight",
				"attribute": "icon-right",
				"description": "Indicates that the icon should be rendered on right",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "ariaExpanded",
				"attribute": "aria-expanded",
				"type": "string"
			},
			{
				"name": "ariaHaspopup",
				"attribute": "aria-haspopup",
				"type": "string"
			},
			{
				"name": "ariaLabel",
				"attribute": "aria-label",
				"type": "string"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean"
			},
			{
				"name": "autofocus",
				"attribute": "autofocus",
				"type": "boolean"
			},
			{
				"name": "form",
				"attribute": "form",
				"type": "string"
			},
			{
				"name": "formaction",
				"attribute": "formaction",
				"type": "string"
			},
			{
				"name": "formenctype",
				"attribute": "formenctype",
				"type": "string"
			},
			{
				"name": "formmethod",
				"attribute": "formmethod",
				"type": "string"
			},
			{
				"name": "formnovalidate",
				"attribute": "formnovalidate",
				"type": "string"
			},
			{
				"name": "formtarget",
				"attribute": "formtarget",
				"type": "string"
			},
			{
				"name": "name",
				"attribute": "name",
				"type": "string"
			},
			{
				"name": "primary",
				"attribute": "primary",
				"type": "boolean"
			},
			{
				"name": "type",
				"attribute": "type",
				"type": "string",
				"default": "\"button\""
			}
		],
		"slots": [
			{
				"name": "",
				"description": "Default content placed inside of the button"
			}
		]
	},
	{
		"name": "d2l-alert",
		"path": "./components/alert/alert.js",
		"description": "The `d2l-alert` component can be used to communicate important information relating to the state of the system and the user's work flow.",
		"attributes": [
			{
				"name": "button-text",
				"description": "Text that is displayed within the alert's action button. If no text is provided the button is not displayed.",
				"type": "string"
			},
			{
				"name": "subtext",
				"description": "The text that is displayed below the main alert message.",
				"type": "string"
			},
			{
				"name": "has-close-button",
				"description": "Gives the alert a close button that will close the alert when clicked.",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "type",
				"description": "Type of the alert being displayed. Can be one of  `default`, `critical`, `success` , `warning`",
				"type": "string",
				"default": "\"default\""
			}
		],
		"properties": [
			{
				"name": "buttonText",
				"attribute": "button-text",
				"description": "Text that is displayed within the alert's action button. If no text is provided the button is not displayed.",
				"type": "string"
			},
			{
				"name": "subtext",
				"attribute": "subtext",
				"description": "The text that is displayed below the main alert message.",
				"type": "string"
			},
			{
				"name": "hasCloseButton",
				"attribute": "has-close-button",
				"description": "Gives the alert a close button that will close the alert when clicked.",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "type",
				"attribute": "type",
				"description": "Type of the alert being displayed. Can be one of  `default`, `critical`, `success` , `warning`",
				"type": "string",
				"default": "\"default\""
			}
		],
		"events": [
			{
				"name": "d2l-alert-closed",
				"description": "Dispatched when the alert's close button is clicked"
			},
			{
				"name": "d2l-alert-button-pressed",
				"description": "Dispatched when the alert's action button is clicked"
			},
			{
				"name": "d2l-localize-behavior-language-changed"
			}
		],
		"slots": [
			{
				"name": "",
				"description": "Default content placed inside of the component"
			}
		]
	},
	{
		"name": "d2l-alert-toast",
		"path": "./components/alert/alert-toast.js",
		"description": "The `d2l-alert-toast` component serves the same purpose as `d2l-alert`; however, it is displayed as a pop-up at the bottom of the screen that automatically dismisses itself by default.",
		"attributes": [
			{
				"name": "button-text",
				"description": "Text that is displayed within the alert's action button. If no text is provided the button is not displayed.",
				"type": "string"
			},
			{
				"name": "subtext",
				"description": "The text that is displayed below the main alert message.",
				"type": "string"
			},
			{
				"name": "type",
				"description": "Type of the alert being displayed. Can be one of  `default`, `critical`, `success` , `warning`",
				"type": "string"
			},
			{
				"name": "hide-close-button",
				"description": "Hide the close button to prevent users from manually closing the alert.",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "no-auto-close",
				"description": "Prevents the alert from automatically closing 4 seconds after opening.",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "open",
				"description": "Open or close the toast alert.",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "buttonText",
				"attribute": "button-text",
				"description": "Text that is displayed within the alert's action button. If no text is provided the button is not displayed.",
				"type": "string"
			},
			{
				"name": "subtext",
				"attribute": "subtext",
				"description": "The text that is displayed below the main alert message.",
				"type": "string"
			},
			{
				"name": "type",
				"attribute": "type",
				"description": "Type of the alert being displayed. Can be one of  `default`, `critical`, `success` , `warning`",
				"type": "string"
			},
			{
				"name": "hideCloseButton",
				"attribute": "hide-close-button",
				"description": "Hide the close button to prevent users from manually closing the alert.",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "noAutoClose",
				"attribute": "no-auto-close",
				"description": "Prevents the alert from automatically closing 4 seconds after opening.",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "open",
				"attribute": "open",
				"description": "Open or close the toast alert.",
				"type": "boolean",
				"default": "false"
			}
		],
		"slots": [
			{
				"name": "",
				"description": "Default content placed inside of the component"
			}
		]
	},
	{
		"name": "d2l-backdrop",
		"path": "./components/backdrop/backdrop.js",
		"description": "The `d2l-backdrop` element is a web component to display a semi-transparent backdrop behind a specified sibling element. It also hides elements other than the target from assistive technologies by applying `role=\"presentation\"` and `aria-hidden=\"true\"`.",
		"attributes": [
			{
				"name": "for-target",
				"description": "id of the target element to display backdrop behind",
				"type": "string"
			},
			{
				"name": "shown",
				"description": "Used to control whether the backdrop is shown",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "no-animate-hide",
				"description": "Disables the fade-out transition while the backdrop is being hidden",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "forTarget",
				"attribute": "for-target",
				"description": "id of the target element to display backdrop behind",
				"type": "string"
			},
			{
				"name": "shown",
				"attribute": "shown",
				"description": "Used to control whether the backdrop is shown",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "noAnimateHide",
				"attribute": "no-animate-hide",
				"description": "Disables the fade-out transition while the backdrop is being hidden",
				"type": "boolean",
				"default": "false"
			}
		]
	},
	{
		"name": "d2l-button",
		"path": "./components/button/button.js",
		"description": "The `d2l-button` element can be used just like the native button element, but also supports the `primary` attribute for denoting the primary button.",
		"attributes": [
			{
				"name": "description",
				"description": "A description to be added to the `button` for accessibility",
				"type": "string"
			},
			{
				"name": "aria-expanded",
				"type": "string"
			},
			{
				"name": "aria-haspopup",
				"type": "string"
			},
			{
				"name": "aria-label",
				"type": "string"
			},
			{
				"name": "disabled",
				"type": "boolean"
			},
			{
				"name": "autofocus",
				"type": "boolean"
			},
			{
				"name": "form",
				"type": "string"
			},
			{
				"name": "formaction",
				"type": "string"
			},
			{
				"name": "formenctype",
				"type": "string"
			},
			{
				"name": "formmethod",
				"type": "string"
			},
			{
				"name": "formnovalidate",
				"type": "string"
			},
			{
				"name": "formtarget",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "primary",
				"type": "boolean"
			},
			{
				"name": "type",
				"type": "string",
				"default": "\"button\""
			}
		],
		"properties": [
			{
				"name": "description",
				"attribute": "description",
				"description": "A description to be added to the `button` for accessibility",
				"type": "string"
			},
			{
				"name": "ariaExpanded",
				"attribute": "aria-expanded",
				"type": "string"
			},
			{
				"name": "ariaHaspopup",
				"attribute": "aria-haspopup",
				"type": "string"
			},
			{
				"name": "ariaLabel",
				"attribute": "aria-label",
				"type": "string"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean"
			},
			{
				"name": "autofocus",
				"attribute": "autofocus",
				"type": "boolean"
			},
			{
				"name": "form",
				"attribute": "form",
				"type": "string"
			},
			{
				"name": "formaction",
				"attribute": "formaction",
				"type": "string"
			},
			{
				"name": "formenctype",
				"attribute": "formenctype",
				"type": "string"
			},
			{
				"name": "formmethod",
				"attribute": "formmethod",
				"type": "string"
			},
			{
				"name": "formnovalidate",
				"attribute": "formnovalidate",
				"type": "string"
			},
			{
				"name": "formtarget",
				"attribute": "formtarget",
				"type": "string"
			},
			{
				"name": "name",
				"attribute": "name",
				"type": "string"
			},
			{
				"name": "primary",
				"attribute": "primary",
				"type": "boolean"
			},
			{
				"name": "type",
				"attribute": "type",
				"type": "string",
				"default": "\"button\""
			}
		],
		"slots": [
			{
				"name": "",
				"description": "Default content placed inside of the button"
			}
		]
	},
	{
		"name": "d2l-floating-buttons",
		"path": "./components/button/floating-buttons.js",
		"description": "Floating workflow buttons behavior can be added by using the `<d2l-floating-buttons>` custom element. When the normal position of the workflow buttons is below the bottom edge of the viewport, they will dock at the bottom edge. When the normal position becomes visible, they will undock.",
		"attributes": [
			{
				"name": "always-float",
				"description": "Indicates to display buttons as always floating",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "min-height",
				"description": "The minimum height of the viewport to display floating buttons at (where applicable). If viewport is less than `min-height`, buttons will never appear floating (unless `always-float` is used). If viewport is greater than `min-height` then buttons will float when applicable.",
				"type": "string",
				"default": "\"500px\""
			}
		],
		"properties": [
			{
				"name": "alwaysFloat",
				"attribute": "always-float",
				"description": "Indicates to display buttons as always floating",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "minHeight",
				"attribute": "min-height",
				"description": "The minimum height of the viewport to display floating buttons at (where applicable). If viewport is less than `min-height`, buttons will never appear floating (unless `always-float` is used). If viewport is greater than `min-height` then buttons will float when applicable.",
				"type": "string",
				"default": "\"500px\""
			}
		],
		"slots": [
			{
				"name": "",
				"description": "Content to be displayed in the floating container"
			}
		]
	},
	{
		"name": "d2l-offscreen",
		"path": "./components/offscreen/offscreen.js"
	},
	{
		"name": "d2l-calendar",
		"path": "./components/calendar/calendar.js",
		"attributes": [
			{
				"name": "max-value",
				"type": "string"
			},
			{
				"name": "min-value",
				"type": "string"
			},
			{
				"name": "selected-value",
				"type": "string"
			},
			{
				"name": "summary",
				"type": "string"
			}
		],
		"properties": [
			{
				"name": "maxValue",
				"attribute": "max-value",
				"type": "string"
			},
			{
				"name": "minValue",
				"attribute": "min-value",
				"type": "string"
			},
			{
				"name": "selectedValue",
				"attribute": "selected-value",
				"type": "string"
			},
			{
				"name": "summary",
				"attribute": "summary",
				"type": "string"
			}
		],
		"events": [
			{
				"name": "d2l-calendar-selected"
			},
			{
				"name": "d2l-localize-behavior-language-changed"
			}
		]
	},
	{
		"name": "d2l-code-view",
		"path": "./components/demo/code-view.js",
		"attributes": [
			{
				"name": "hide-language",
				"type": "boolean"
			},
			{
				"name": "language",
				"type": "string",
				"default": "\"html\""
			}
		],
		"properties": [
			{
				"name": "hideLanguage",
				"attribute": "hide-language",
				"type": "boolean"
			},
			{
				"name": "language",
				"attribute": "language",
				"type": "string",
				"default": "\"html\""
			}
		]
	},
	{
		"name": "d2l-demo-snippet",
		"path": "./components/demo/demo-snippet.js",
		"attributes": [
			{
				"name": "code-view-hidden",
				"type": "boolean"
			},
			{
				"name": "no-padding",
				"type": "boolean"
			}
		],
		"properties": [
			{
				"name": "codeViewHidden",
				"attribute": "code-view-hidden",
				"type": "boolean"
			},
			{
				"name": "noPadding",
				"attribute": "no-padding",
				"type": "boolean"
			}
		],
		"events": [
			{
				"name": "d2l-dir-update"
			}
		]
	},
	{
		"name": "d2l-demo-page",
		"path": "./components/demo/demo-page.js",
		"attributes": [
			{
				"name": "page-title",
				"type": "string"
			}
		],
		"properties": [
			{
				"name": "pageTitle",
				"attribute": "page-title",
				"type": "string"
			}
		]
	},
	{
		"name": "d2l-focus-trap",
		"path": "./components/focus-trap/focus-trap.js",
		"attributes": [
			{
				"name": "trap",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "trap",
				"attribute": "trap",
				"type": "boolean",
				"default": "false"
			}
		],
		"events": [
			{
				"name": "d2l-focus-trap-enter"
			}
		]
	},
	{
		"name": "d2l-dialog-confirm",
		"path": "./components/dialog/dialog-confirm.js",
		"attributes": [
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "title-text",
				"type": "string"
			},
			{
				"name": "opened",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "text",
				"attribute": "text",
				"type": "string"
			},
			{
				"name": "titleText",
				"attribute": "title-text",
				"type": "string"
			},
			{
				"name": "opened",
				"attribute": "opened",
				"type": "boolean",
				"default": "false"
			}
		],
		"events": [
			{
				"name": "d2l-dialog-close"
			},
			{
				"name": "d2l-dialog-open"
			}
		]
	},
	{
		"name": "d2l-loading-spinner",
		"path": "./components/loading-spinner/loading-spinner.js",
		"attributes": [
			{
				"name": "color",
				"type": "string"
			},
			{
				"name": "size",
				"type": "number"
			}
		],
		"properties": [
			{
				"name": "color",
				"attribute": "color",
				"type": "string"
			},
			{
				"name": "size",
				"attribute": "size",
				"type": "number"
			}
		]
	},
	{
		"name": "d2l-dialog",
		"path": "./components/dialog/dialog.js",
		"attributes": [
			{
				"name": "async",
				"type": "boolean"
			},
			{
				"name": "width",
				"type": "number",
				"default": "600"
			},
			{
				"name": "asyncState",
				"type": "string"
			},
			{
				"name": "async-pending-delay",
				"type": "number",
				"default": "0"
			},
			{
				"name": "title-text",
				"type": "string"
			},
			{
				"name": "opened",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "async",
				"attribute": "async",
				"type": "boolean"
			},
			{
				"name": "width",
				"attribute": "width",
				"type": "number",
				"default": "600"
			},
			{
				"name": "asyncState",
				"attribute": "asyncState",
				"type": "string"
			},
			{
				"name": "asyncPendingDelay",
				"attribute": "async-pending-delay",
				"type": "number",
				"default": "0"
			},
			{
				"name": "titleText",
				"attribute": "title-text",
				"type": "string"
			},
			{
				"name": "opened",
				"attribute": "opened",
				"type": "boolean",
				"default": "false"
			}
		],
		"events": [
			{
				"name": "d2l-localize-behavior-language-changed"
			},
			{
				"name": "d2l-dialog-close"
			},
			{
				"name": "d2l-dialog-open"
			}
		]
	},
	{
		"name": "d2l-dropdown-button-subtle",
		"path": "./components/dropdown/dropdown-button-subtle.js",
		"attributes": [
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "dropdownOpener",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "no-auto-open",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "text",
				"attribute": "text",
				"type": "string"
			},
			{
				"name": "dropdownOpener",
				"attribute": "dropdownOpener",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "noAutoOpen",
				"attribute": "no-auto-open",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean",
				"default": "false"
			}
		]
	},
	{
		"name": "d2l-dropdown-button",
		"path": "./components/dropdown/dropdown-button.js",
		"attributes": [
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "primary",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "dropdownOpener",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "no-auto-open",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "text",
				"attribute": "text",
				"type": "string"
			},
			{
				"name": "primary",
				"attribute": "primary",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "dropdownOpener",
				"attribute": "dropdownOpener",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "noAutoOpen",
				"attribute": "no-auto-open",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean",
				"default": "false"
			}
		]
	},
	{
		"name": "d2l-dropdown-content",
		"path": "./components/dropdown/dropdown-content.js",
		"attributes": [
			{
				"name": "align",
				"type": "string"
			},
			{
				"name": "boundary",
				"type": "object"
			},
			{
				"name": "max-width",
				"type": "number"
			},
			{
				"name": "min-width",
				"type": "number"
			},
			{
				"name": "max-height",
				"type": "number"
			},
			{
				"name": "no-auto-close",
				"type": "boolean"
			},
			{
				"name": "no-auto-fit",
				"type": "boolean"
			},
			{
				"name": "no-auto-focus",
				"type": "boolean"
			},
			{
				"name": "no-padding",
				"type": "boolean"
			},
			{
				"name": "no-pointer",
				"type": "boolean"
			},
			{
				"name": "opened-above",
				"description": "Private.",
				"type": "boolean"
			},
			{
				"name": "vertical-offset",
				"type": "string"
			},
			{
				"name": "opened",
				"type": "boolean"
			},
			{
				"name": "no-padding-footer",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "no-padding-header",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "align",
				"attribute": "align",
				"type": "string"
			},
			{
				"name": "boundary",
				"attribute": "boundary",
				"type": "object"
			},
			{
				"name": "maxWidth",
				"attribute": "max-width",
				"type": "number"
			},
			{
				"name": "minWidth",
				"attribute": "min-width",
				"type": "number"
			},
			{
				"name": "maxHeight",
				"attribute": "max-height",
				"type": "number"
			},
			{
				"name": "noAutoClose",
				"attribute": "no-auto-close",
				"type": "boolean"
			},
			{
				"name": "noAutoFit",
				"attribute": "no-auto-fit",
				"type": "boolean"
			},
			{
				"name": "noAutoFocus",
				"attribute": "no-auto-focus",
				"type": "boolean"
			},
			{
				"name": "noPadding",
				"attribute": "no-padding",
				"type": "boolean"
			},
			{
				"name": "noPointer",
				"attribute": "no-pointer",
				"type": "boolean"
			},
			{
				"name": "openedAbove",
				"attribute": "opened-above",
				"description": "Private.",
				"type": "boolean"
			},
			{
				"name": "verticalOffset",
				"attribute": "vertical-offset",
				"type": "string"
			},
			{
				"name": "opened",
				"attribute": "opened",
				"type": "boolean"
			},
			{
				"name": "noPaddingFooter",
				"attribute": "no-padding-footer",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "noPaddingHeader",
				"attribute": "no-padding-header",
				"type": "boolean",
				"default": "false"
			}
		],
		"events": [
			{
				"name": "d2l-dropdown-open"
			},
			{
				"name": "d2l-dropdown-close"
			},
			{
				"name": "d2l-dropdown-position"
			}
		]
	},
	{
		"name": "d2l-dropdown-context-menu",
		"path": "./components/dropdown/dropdown-context-menu.js",
		"attributes": [
			{
				"name": "text",
				"description": "Label for the context-menu button (required for accessibility).",
				"type": "string"
			},
			{
				"name": "translucent",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "dropdownOpener",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "no-auto-open",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "visible-on-ancestor",
				"type": "boolean"
			}
		],
		"properties": [
			{
				"name": "text",
				"attribute": "text",
				"description": "Label for the context-menu button (required for accessibility).",
				"type": "string"
			},
			{
				"name": "translucent",
				"attribute": "translucent",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "dropdownOpener",
				"attribute": "dropdownOpener",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "noAutoOpen",
				"attribute": "no-auto-open",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "visibleOnAncestor",
				"attribute": "visible-on-ancestor",
				"type": "boolean"
			}
		]
	},
	{
		"name": "d2l-dropdown-menu",
		"path": "./components/dropdown/dropdown-menu.js",
		"attributes": [
			{
				"name": "align",
				"type": "string"
			},
			{
				"name": "boundary",
				"type": "object"
			},
			{
				"name": "max-width",
				"type": "number"
			},
			{
				"name": "min-width",
				"type": "number"
			},
			{
				"name": "max-height",
				"type": "number"
			},
			{
				"name": "no-auto-close",
				"type": "boolean"
			},
			{
				"name": "no-auto-fit",
				"type": "boolean"
			},
			{
				"name": "no-auto-focus",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "no-padding",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "no-pointer",
				"type": "boolean"
			},
			{
				"name": "opened-above",
				"description": "Private.",
				"type": "boolean"
			},
			{
				"name": "vertical-offset",
				"type": "string"
			},
			{
				"name": "opened",
				"type": "boolean"
			},
			{
				"name": "no-padding-footer",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "no-padding-header",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "align",
				"attribute": "align",
				"type": "string"
			},
			{
				"name": "boundary",
				"attribute": "boundary",
				"type": "object"
			},
			{
				"name": "maxWidth",
				"attribute": "max-width",
				"type": "number"
			},
			{
				"name": "minWidth",
				"attribute": "min-width",
				"type": "number"
			},
			{
				"name": "maxHeight",
				"attribute": "max-height",
				"type": "number"
			},
			{
				"name": "noAutoClose",
				"attribute": "no-auto-close",
				"type": "boolean"
			},
			{
				"name": "noAutoFit",
				"attribute": "no-auto-fit",
				"type": "boolean"
			},
			{
				"name": "noAutoFocus",
				"attribute": "no-auto-focus",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "noPadding",
				"attribute": "no-padding",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "noPointer",
				"attribute": "no-pointer",
				"type": "boolean"
			},
			{
				"name": "openedAbove",
				"attribute": "opened-above",
				"description": "Private.",
				"type": "boolean"
			},
			{
				"name": "verticalOffset",
				"attribute": "vertical-offset",
				"type": "string"
			},
			{
				"name": "opened",
				"attribute": "opened",
				"type": "boolean"
			},
			{
				"name": "noPaddingFooter",
				"attribute": "no-padding-footer",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "noPaddingHeader",
				"attribute": "no-padding-header",
				"type": "boolean",
				"default": "false"
			}
		],
		"events": [
			{
				"name": "d2l-dropdown-open"
			},
			{
				"name": "d2l-dropdown-close"
			},
			{
				"name": "d2l-dropdown-position"
			}
		]
	},
	{
		"name": "d2l-dropdown-more",
		"path": "./components/dropdown/dropdown-more.js",
		"attributes": [
			{
				"name": "text",
				"description": "Label for the more button (required for accessibility).",
				"type": "string"
			},
			{
				"name": "translucent",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "dropdownOpener",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "no-auto-open",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "visible-on-ancestor",
				"type": "boolean"
			}
		],
		"properties": [
			{
				"name": "text",
				"attribute": "text",
				"description": "Label for the more button (required for accessibility).",
				"type": "string"
			},
			{
				"name": "translucent",
				"attribute": "translucent",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "dropdownOpener",
				"attribute": "dropdownOpener",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "noAutoOpen",
				"attribute": "no-auto-open",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "visibleOnAncestor",
				"attribute": "visible-on-ancestor",
				"type": "boolean"
			}
		]
	},
	{
		"name": "d2l-dropdown-tabs",
		"path": "./components/dropdown/dropdown-tabs.js",
		"attributes": [
			{
				"name": "align",
				"type": "string"
			},
			{
				"name": "boundary",
				"type": "object"
			},
			{
				"name": "max-width",
				"type": "number"
			},
			{
				"name": "min-width",
				"type": "number"
			},
			{
				"name": "max-height",
				"type": "number"
			},
			{
				"name": "no-auto-close",
				"type": "boolean"
			},
			{
				"name": "no-auto-fit",
				"type": "boolean"
			},
			{
				"name": "no-auto-focus",
				"type": "boolean"
			},
			{
				"name": "no-padding",
				"type": "boolean"
			},
			{
				"name": "no-pointer",
				"type": "boolean"
			},
			{
				"name": "opened-above",
				"description": "Private.",
				"type": "boolean"
			},
			{
				"name": "vertical-offset",
				"type": "string"
			},
			{
				"name": "opened",
				"type": "boolean"
			},
			{
				"name": "no-padding-footer",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "no-padding-header",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "align",
				"attribute": "align",
				"type": "string"
			},
			{
				"name": "boundary",
				"attribute": "boundary",
				"type": "object"
			},
			{
				"name": "maxWidth",
				"attribute": "max-width",
				"type": "number"
			},
			{
				"name": "minWidth",
				"attribute": "min-width",
				"type": "number"
			},
			{
				"name": "maxHeight",
				"attribute": "max-height",
				"type": "number"
			},
			{
				"name": "noAutoClose",
				"attribute": "no-auto-close",
				"type": "boolean"
			},
			{
				"name": "noAutoFit",
				"attribute": "no-auto-fit",
				"type": "boolean"
			},
			{
				"name": "noAutoFocus",
				"attribute": "no-auto-focus",
				"type": "boolean"
			},
			{
				"name": "noPadding",
				"attribute": "no-padding",
				"type": "boolean"
			},
			{
				"name": "noPointer",
				"attribute": "no-pointer",
				"type": "boolean"
			},
			{
				"name": "openedAbove",
				"attribute": "opened-above",
				"description": "Private.",
				"type": "boolean"
			},
			{
				"name": "verticalOffset",
				"attribute": "vertical-offset",
				"type": "string"
			},
			{
				"name": "opened",
				"attribute": "opened",
				"type": "boolean"
			},
			{
				"name": "noPaddingFooter",
				"attribute": "no-padding-footer",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "noPaddingHeader",
				"attribute": "no-padding-header",
				"type": "boolean",
				"default": "false"
			}
		],
		"events": [
			{
				"name": "d2l-dropdown-open"
			},
			{
				"name": "d2l-dropdown-close"
			},
			{
				"name": "d2l-dropdown-position"
			}
		]
	},
	{
		"name": "d2l-dropdown",
		"path": "./components/dropdown/dropdown.js",
		"attributes": [
			{
				"name": "dropdownOpener",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "no-auto-open",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "dropdownOpener",
				"attribute": "dropdownOpener",
				"type": "boolean",
				"default": "true"
			},
			{
				"name": "noAutoOpen",
				"attribute": "no-auto-open",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean",
				"default": "false"
			}
		]
	},
	{
		"name": "d2l-expand-collapse-content",
		"path": "./components/expand-collapse/expand-collapse-content.js",
		"attributes": [
			{
				"name": "expanded",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "expanded",
				"attribute": "expanded",
				"type": "boolean",
				"default": "false"
			}
		],
		"events": [
			{
				"name": "d2l-expand-collapse-content-expand"
			},
			{
				"name": "d2l-expand-collapse-content-collapse"
			}
		]
	},
	{
		"name": "d2l-hierarchical-view",
		"path": "./components/hierarchical-view/hierarchical-view.js",
		"attributes": [
			{
				"name": "shown",
				"type": "boolean"
			},
			{
				"name": "child-view",
				"type": "boolean"
			},
			{
				"name": "hierarchicalView",
				"type": "boolean",
				"default": "true"
			}
		],
		"properties": [
			{
				"name": "shown",
				"attribute": "shown",
				"type": "boolean"
			},
			{
				"name": "childView",
				"attribute": "child-view",
				"type": "boolean"
			},
			{
				"name": "hierarchicalView",
				"attribute": "hierarchicalView",
				"type": "boolean",
				"default": "true"
			}
		],
		"events": [
			{
				"name": "d2l-hierarchical-view-hide-start"
			},
			{
				"name": "d2l-hierarchical-view-show-start"
			},
			{
				"name": "d2l-hierarchical-view-hide-complete"
			},
			{
				"name": "d2l-hierarchical-view-show-complete"
			},
			{
				"name": "d2l-hierarchical-view-resize"
			}
		]
	},
	{
		"name": "d2l-icon-custom",
		"path": "./components/icons/icon-custom.js",
		"attributes": [
			{
				"name": "size",
				"type": "string"
			}
		],
		"properties": [
			{
				"name": "size",
				"attribute": "size",
				"type": "string"
			}
		]
	},
	{
		"name": "d2l-input-checkbox-spacer",
		"path": "./components/inputs/input-checkbox-spacer.js"
	},
	{
		"name": "d2l-input-checkbox",
		"path": "./components/inputs/input-checkbox.js",
		"attributes": [
			{
				"name": "aria-label",
				"type": "string"
			},
			{
				"name": "checked",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "indeterminate",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "name",
				"type": "string",
				"default": "\"\""
			},
			{
				"name": "not-tabbable",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "value",
				"type": "string",
				"default": "\"on\""
			}
		],
		"properties": [
			{
				"name": "ariaLabel",
				"attribute": "aria-label",
				"type": "string"
			},
			{
				"name": "checked",
				"attribute": "checked",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "indeterminate",
				"attribute": "indeterminate",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "name",
				"attribute": "name",
				"type": "string",
				"default": "\"\""
			},
			{
				"name": "notTabbable",
				"attribute": "not-tabbable",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "value",
				"attribute": "value",
				"type": "string",
				"default": "\"on\""
			}
		],
		"events": [
			{
				"name": "change"
			}
		]
	},
	{
		"name": "d2l-input-text",
		"path": "./components/inputs/input-text.js",
		"attributes": [
			{
				"name": "aria-haspopup",
				"type": "string"
			},
			{
				"name": "aria-invalid",
				"type": "string"
			},
			{
				"name": "atomic",
				"type": "string"
			},
			{
				"name": "autocomplete",
				"type": "string"
			},
			{
				"name": "label",
				"type": "string"
			},
			{
				"name": "live",
				"type": "string"
			},
			{
				"name": "max",
				"type": "string"
			},
			{
				"name": "maxlength",
				"type": "number"
			},
			{
				"name": "min",
				"type": "string"
			},
			{
				"name": "minlength",
				"type": "number"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "pattern",
				"type": "string"
			},
			{
				"name": "placeholder",
				"type": "string"
			},
			{
				"name": "size",
				"type": "number"
			},
			{
				"name": "step",
				"type": "string"
			},
			{
				"name": "title",
				"type": "string"
			},
			{
				"name": "autofocus",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "label-hidden",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "prevent-submit",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "readonly",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "required",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "type",
				"type": "string",
				"default": "\"text\""
			},
			{
				"name": "value",
				"type": "string",
				"default": "\"\""
			}
		],
		"properties": [
			{
				"name": "ariaHaspopup",
				"attribute": "aria-haspopup",
				"type": "string"
			},
			{
				"name": "ariaInvalid",
				"attribute": "aria-invalid",
				"type": "string"
			},
			{
				"name": "atomic",
				"attribute": "atomic",
				"type": "string"
			},
			{
				"name": "autocomplete",
				"attribute": "autocomplete",
				"type": "string"
			},
			{
				"name": "label",
				"attribute": "label",
				"type": "string"
			},
			{
				"name": "live",
				"attribute": "live",
				"type": "string"
			},
			{
				"name": "max",
				"attribute": "max",
				"type": "string"
			},
			{
				"name": "maxlength",
				"attribute": "maxlength",
				"type": "number"
			},
			{
				"name": "min",
				"attribute": "min",
				"type": "string"
			},
			{
				"name": "minlength",
				"attribute": "minlength",
				"type": "number"
			},
			{
				"name": "name",
				"attribute": "name",
				"type": "string"
			},
			{
				"name": "pattern",
				"attribute": "pattern",
				"type": "string"
			},
			{
				"name": "placeholder",
				"attribute": "placeholder",
				"type": "string"
			},
			{
				"name": "size",
				"attribute": "size",
				"type": "number"
			},
			{
				"name": "step",
				"attribute": "step",
				"type": "string"
			},
			{
				"name": "title",
				"attribute": "title",
				"type": "string"
			},
			{
				"name": "autofocus",
				"attribute": "autofocus",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "labelHidden",
				"attribute": "label-hidden",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "preventSubmit",
				"attribute": "prevent-submit",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "readonly",
				"attribute": "readonly",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "required",
				"attribute": "required",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "type",
				"attribute": "type",
				"type": "string",
				"default": "\"text\""
			},
			{
				"name": "value",
				"attribute": "value",
				"type": "string",
				"default": "\"\""
			}
		],
		"events": [
			{
				"name": "change"
			}
		]
	},
	{
		"name": "d2l-input-date",
		"path": "./components/inputs/input-date.js",
		"attributes": [
			{
				"name": "disabled",
				"type": "boolean"
			},
			{
				"name": "label",
				"type": "string"
			},
			{
				"name": "label-hidden",
				"type": "boolean"
			},
			{
				"name": "max-value",
				"type": "string"
			},
			{
				"name": "min-value",
				"type": "string"
			},
			{
				"name": "empty-text",
				"type": "string",
				"default": "\"\""
			},
			{
				"name": "value",
				"type": "string",
				"default": "\"\""
			}
		],
		"properties": [
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean"
			},
			{
				"name": "label",
				"attribute": "label",
				"type": "string"
			},
			{
				"name": "labelHidden",
				"attribute": "label-hidden",
				"type": "boolean"
			},
			{
				"name": "maxValue",
				"attribute": "max-value",
				"type": "string"
			},
			{
				"name": "minValue",
				"attribute": "min-value",
				"type": "string"
			},
			{
				"name": "emptyText",
				"attribute": "empty-text",
				"type": "string",
				"default": "\"\""
			},
			{
				"name": "value",
				"attribute": "value",
				"type": "string",
				"default": "\"\""
			}
		],
		"events": [
			{
				"name": "change"
			},
			{
				"name": "d2l-localize-behavior-language-changed"
			}
		]
	},
	{
		"name": "d2l-input-fieldset",
		"path": "./components/inputs/input-fieldset.js",
		"attributes": [
			{
				"name": "label",
				"type": "string"
			},
			{
				"name": "required",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "label",
				"attribute": "label",
				"type": "string"
			},
			{
				"name": "required",
				"attribute": "required",
				"type": "boolean",
				"default": "false"
			}
		]
	},
	{
		"name": "d2l-menu-item-return",
		"path": "./components/menu/menu-item-return.js",
		"attributes": [
			{
				"name": "disabled",
				"type": "boolean"
			},
			{
				"name": "first",
				"type": "boolean"
			},
			{
				"name": "hasChildView",
				"type": "boolean"
			},
			{
				"name": "hidden",
				"type": "boolean"
			},
			{
				"name": "last",
				"type": "string"
			},
			{
				"name": "text"
			},
			{
				"name": "role",
				"type": "string",
				"default": "\"menuitem\""
			},
			{
				"name": "tabindex",
				"type": "string",
				"default": "-1"
			}
		],
		"properties": [
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean"
			},
			{
				"name": "first",
				"attribute": "first",
				"type": "boolean"
			},
			{
				"name": "hasChildView",
				"attribute": "hasChildView",
				"type": "boolean"
			},
			{
				"name": "hidden",
				"attribute": "hidden",
				"type": "boolean"
			},
			{
				"name": "last",
				"attribute": "last",
				"type": "string"
			},
			{
				"name": "text",
				"attribute": "text"
			},
			{
				"name": "role",
				"attribute": "role",
				"type": "string",
				"default": "\"menuitem\""
			},
			{
				"name": "tabindex",
				"attribute": "tabindex",
				"type": "string",
				"default": "-1"
			}
		],
		"events": [
			{
				"name": "d2l-localize-behavior-language-changed"
			},
			{
				"name": "d2l-menu-item-select"
			},
			{
				"name": "d2l-menu-item-visibility-change"
			}
		]
	},
	{
		"name": "d2l-menu",
		"path": "./components/menu/menu.js",
		"attributes": [
			{
				"name": "active",
				"type": "boolean"
			},
			{
				"name": "label",
				"type": "string"
			},
			{
				"name": "role",
				"type": "string",
				"default": "\"menu\""
			},
			{
				"name": "shown",
				"type": "boolean"
			},
			{
				"name": "child-view",
				"type": "boolean"
			},
			{
				"name": "hierarchicalView",
				"type": "boolean",
				"default": "true"
			}
		],
		"properties": [
			{
				"name": "active",
				"attribute": "active",
				"type": "boolean"
			},
			{
				"name": "label",
				"attribute": "label",
				"type": "string"
			},
			{
				"name": "role",
				"attribute": "role",
				"type": "string",
				"default": "\"menu\""
			},
			{
				"name": "shown",
				"attribute": "shown",
				"type": "boolean"
			},
			{
				"name": "childView",
				"attribute": "child-view",
				"type": "boolean"
			},
			{
				"name": "hierarchicalView",
				"attribute": "hierarchicalView",
				"type": "boolean",
				"default": "true"
			}
		],
		"events": [
			{
				"name": "d2l-menu-resize"
			},
			{
				"name": "d2l-hierarchical-view-hide-start"
			},
			{
				"name": "d2l-hierarchical-view-show-start"
			},
			{
				"name": "d2l-hierarchical-view-hide-complete"
			},
			{
				"name": "d2l-hierarchical-view-show-complete"
			},
			{
				"name": "d2l-hierarchical-view-resize"
			}
		]
	},
	{
		"name": "d2l-menu-item-radio",
		"path": "./components/menu/menu-item-radio.js",
		"attributes": [
			{
				"name": "value",
				"type": "string"
			},
			{
				"name": "selected",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"type": "boolean"
			},
			{
				"name": "first",
				"type": "boolean"
			},
			{
				"name": "hasChildView",
				"type": "boolean"
			},
			{
				"name": "hidden",
				"type": "boolean"
			},
			{
				"name": "last",
				"type": "string"
			},
			{
				"name": "text"
			},
			{
				"name": "role",
				"type": "string",
				"default": "\"menuitemradio\""
			},
			{
				"name": "tabindex",
				"type": "string",
				"default": "-1"
			}
		],
		"properties": [
			{
				"name": "value",
				"attribute": "value",
				"type": "string"
			},
			{
				"name": "selected",
				"attribute": "selected",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean"
			},
			{
				"name": "first",
				"attribute": "first",
				"type": "boolean"
			},
			{
				"name": "hasChildView",
				"attribute": "hasChildView",
				"type": "boolean"
			},
			{
				"name": "hidden",
				"attribute": "hidden",
				"type": "boolean"
			},
			{
				"name": "last",
				"attribute": "last",
				"type": "string"
			},
			{
				"name": "text",
				"attribute": "text"
			},
			{
				"name": "role",
				"attribute": "role",
				"type": "string",
				"default": "\"menuitemradio\""
			},
			{
				"name": "tabindex",
				"attribute": "tabindex",
				"type": "string",
				"default": "-1"
			}
		],
		"events": [
			{
				"name": "d2l-menu-item-change"
			},
			{
				"name": "d2l-menu-item-select"
			},
			{
				"name": "d2l-menu-item-visibility-change"
			}
		]
	},
	{
		"name": "d2l-input-time",
		"path": "./components/inputs/input-time.js",
		"attributes": [
			{
				"name": "default-value",
				"type": "string"
			},
			{
				"name": "label",
				"type": "string"
			},
			{
				"name": "max-height",
				"type": "number"
			},
			{
				"name": "value",
				"type": "string"
			},
			{
				"name": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "enforce-time-intervals",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "label-hidden",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "time-interval",
				"type": "string",
				"default": "\"thirty\""
			}
		],
		"properties": [
			{
				"name": "defaultValue",
				"attribute": "default-value",
				"type": "string"
			},
			{
				"name": "label",
				"attribute": "label",
				"type": "string"
			},
			{
				"name": "maxHeight",
				"attribute": "max-height",
				"type": "number"
			},
			{
				"name": "value",
				"attribute": "value",
				"type": "string"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "enforceTimeIntervals",
				"attribute": "enforce-time-intervals",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "labelHidden",
				"attribute": "label-hidden",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "timeInterval",
				"attribute": "time-interval",
				"type": "string",
				"default": "\"thirty\""
			}
		],
		"events": [
			{
				"name": "change"
			}
		]
	},
	{
		"name": "d2l-input-date-time",
		"path": "./components/inputs/input-date-time.js",
		"attributes": [
			{
				"name": "disabled",
				"type": "boolean"
			},
			{
				"name": "label",
				"type": "string"
			},
			{
				"name": "value",
				"type": "string"
			}
		],
		"properties": [
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean"
			},
			{
				"name": "label",
				"attribute": "label",
				"type": "string"
			},
			{
				"name": "value",
				"attribute": "value",
				"type": "string"
			}
		],
		"events": [
			{
				"name": "change"
			},
			{
				"name": "d2l-localize-behavior-language-changed"
			}
		]
	},
	{
		"name": "d2l-input-radio-spacer",
		"path": "./components/inputs/input-radio-spacer.js"
	},
	{
		"name": "d2l-input-search",
		"path": "./components/inputs/input-search.js",
		"attributes": [
			{
				"name": "label",
				"type": "string"
			},
			{
				"name": "maxlength",
				"type": "number"
			},
			{
				"name": "placeholder",
				"type": "string"
			},
			{
				"name": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "no-clear",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "value",
				"type": "string",
				"default": "\"\""
			}
		],
		"properties": [
			{
				"name": "label",
				"attribute": "label",
				"type": "string"
			},
			{
				"name": "maxlength",
				"attribute": "maxlength",
				"type": "number"
			},
			{
				"name": "placeholder",
				"attribute": "placeholder",
				"type": "string"
			},
			{
				"name": "lastSearchValue",
				"type": "string"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "noClear",
				"attribute": "no-clear",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "value",
				"attribute": "value",
				"type": "string",
				"default": "\"\""
			}
		],
		"events": [
			{
				"name": "d2l-input-search-searched"
			},
			{
				"name": "d2l-localize-behavior-language-changed"
			}
		]
	},
	{
		"name": "d2l-link",
		"path": "./components/link/link.js",
		"attributes": [
			{
				"name": "aria-label",
				"type": "string"
			},
			{
				"name": "download",
				"type": "boolean"
			},
			{
				"name": "href",
				"type": "string"
			},
			{
				"name": "target",
				"type": "string"
			},
			{
				"name": "main",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "small",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "ariaLabel",
				"attribute": "aria-label",
				"type": "string"
			},
			{
				"name": "download",
				"attribute": "download",
				"type": "boolean"
			},
			{
				"name": "href",
				"attribute": "href",
				"type": "string"
			},
			{
				"name": "target",
				"attribute": "target",
				"type": "string"
			},
			{
				"name": "main",
				"attribute": "main",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "small",
				"attribute": "small",
				"type": "boolean",
				"default": "false"
			}
		]
	},
	{
		"name": "d2l-list-item-content",
		"path": "./components/list/list-item-content.js"
	},
	{
		"name": "d2l-list-item-drag-handle",
		"path": "./components/list/list-item-drag-handle.js",
		"attributes": [
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "disabled",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "text",
				"attribute": "text",
				"type": "string"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean",
				"default": "false"
			}
		],
		"events": [
			{
				"name": "d2l-list-item-drag-handle-action"
			}
		]
	},
	{
		"name": "d2l-list-item-generic-layout",
		"path": "./components/list/list-item-generic-layout.js"
	},
	{
		"name": "d2l-list-item",
		"path": "./components/list/list-item.js",
		"attributes": [
			{
				"name": "href",
				"type": "string"
			},
			{
				"name": "key",
				"type": "string"
			},
			{
				"name": "selected",
				"type": "boolean"
			},
			{
				"name": "breakpoints",
				"type": "array",
				"default": "[842,636,580,0]"
			},
			{
				"name": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "role",
				"type": "string",
				"default": "\"listitem\""
			},
			{
				"name": "selectable",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "href",
				"attribute": "href",
				"type": "string"
			},
			{
				"name": "key",
				"attribute": "key",
				"type": "string"
			},
			{
				"name": "selected",
				"attribute": "selected",
				"type": "boolean"
			},
			{
				"name": "breakpoints",
				"attribute": "breakpoints",
				"type": "array",
				"default": "[842,636,580,0]"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "role",
				"attribute": "role",
				"type": "string",
				"default": "\"listitem\""
			},
			{
				"name": "selectable",
				"attribute": "selectable",
				"type": "boolean",
				"default": "false"
			}
		],
		"events": [
			{
				"name": "d2l-list-item-selected"
			}
		]
	},
	{
		"name": "d2l-list",
		"path": "./components/list/list.js",
		"attributes": [
			{
				"name": "extend-separators",
				"type": "boolean"
			},
			{
				"name": "separators",
				"type": "string"
			}
		],
		"properties": [
			{
				"name": "extendSeparators",
				"attribute": "extend-separators",
				"type": "boolean"
			},
			{
				"name": "separators",
				"attribute": "separators",
				"type": "string"
			}
		],
		"events": [
			{
				"name": "d2l-list-selection-change"
			}
		]
	},
	{
		"name": "d2l-menu-item-checkbox",
		"path": "./components/menu/menu-item-checkbox.js",
		"attributes": [
			{
				"name": "value",
				"type": "string"
			},
			{
				"name": "selected",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"type": "boolean"
			},
			{
				"name": "first",
				"type": "boolean"
			},
			{
				"name": "hasChildView",
				"type": "boolean"
			},
			{
				"name": "hidden",
				"type": "boolean"
			},
			{
				"name": "last",
				"type": "string"
			},
			{
				"name": "text"
			},
			{
				"name": "role",
				"type": "string",
				"default": "\"menuitemcheckbox\""
			},
			{
				"name": "tabindex",
				"type": "string",
				"default": "-1"
			}
		],
		"properties": [
			{
				"name": "value",
				"attribute": "value",
				"type": "string"
			},
			{
				"name": "selected",
				"attribute": "selected",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean"
			},
			{
				"name": "first",
				"attribute": "first",
				"type": "boolean"
			},
			{
				"name": "hasChildView",
				"attribute": "hasChildView",
				"type": "boolean"
			},
			{
				"name": "hidden",
				"attribute": "hidden",
				"type": "boolean"
			},
			{
				"name": "last",
				"attribute": "last",
				"type": "string"
			},
			{
				"name": "text",
				"attribute": "text"
			},
			{
				"name": "role",
				"attribute": "role",
				"type": "string",
				"default": "\"menuitemcheckbox\""
			},
			{
				"name": "tabindex",
				"attribute": "tabindex",
				"type": "string",
				"default": "-1"
			}
		],
		"events": [
			{
				"name": "d2l-menu-item-change"
			},
			{
				"name": "d2l-menu-item-select"
			},
			{
				"name": "d2l-menu-item-visibility-change"
			}
		]
	},
	{
		"name": "d2l-menu-item-link",
		"path": "./components/menu/menu-item-link.js",
		"attributes": [
			{
				"name": "href",
				"type": "string"
			},
			{
				"name": "target",
				"type": "string"
			},
			{
				"name": "disabled",
				"type": "boolean"
			},
			{
				"name": "first",
				"type": "boolean"
			},
			{
				"name": "hasChildView",
				"type": "boolean"
			},
			{
				"name": "hidden",
				"type": "boolean"
			},
			{
				"name": "last",
				"type": "string"
			},
			{
				"name": "text"
			},
			{
				"name": "role",
				"type": "string",
				"default": "\"menuitem\""
			},
			{
				"name": "tabindex",
				"type": "string",
				"default": "-1"
			}
		],
		"properties": [
			{
				"name": "href",
				"attribute": "href",
				"type": "string"
			},
			{
				"name": "target",
				"attribute": "target",
				"type": "string"
			},
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean"
			},
			{
				"name": "first",
				"attribute": "first",
				"type": "boolean"
			},
			{
				"name": "hasChildView",
				"attribute": "hasChildView",
				"type": "boolean"
			},
			{
				"name": "hidden",
				"attribute": "hidden",
				"type": "boolean"
			},
			{
				"name": "last",
				"attribute": "last",
				"type": "string"
			},
			{
				"name": "text",
				"attribute": "text"
			},
			{
				"name": "role",
				"attribute": "role",
				"type": "string",
				"default": "\"menuitem\""
			},
			{
				"name": "tabindex",
				"attribute": "tabindex",
				"type": "string",
				"default": "-1"
			}
		],
		"events": [
			{
				"name": "click"
			},
			{
				"name": "d2l-menu-item-select"
			},
			{
				"name": "d2l-menu-item-visibility-change"
			}
		]
	},
	{
		"name": "d2l-menu-item-separator",
		"path": "./components/menu/menu-item-separator.js"
	},
	{
		"name": "d2l-menu-item",
		"path": "./components/menu/menu-item.js",
		"attributes": [
			{
				"name": "disabled",
				"type": "boolean"
			},
			{
				"name": "first",
				"type": "boolean"
			},
			{
				"name": "hasChildView",
				"type": "boolean"
			},
			{
				"name": "hidden",
				"type": "boolean"
			},
			{
				"name": "last",
				"type": "string"
			},
			{
				"name": "text"
			},
			{
				"name": "role",
				"type": "string",
				"default": "\"menuitem\""
			},
			{
				"name": "tabindex",
				"type": "string",
				"default": "-1"
			}
		],
		"properties": [
			{
				"name": "disabled",
				"attribute": "disabled",
				"type": "boolean"
			},
			{
				"name": "first",
				"attribute": "first",
				"type": "boolean"
			},
			{
				"name": "hasChildView",
				"attribute": "hasChildView",
				"type": "boolean"
			},
			{
				"name": "hidden",
				"attribute": "hidden",
				"type": "boolean"
			},
			{
				"name": "last",
				"attribute": "last",
				"type": "string"
			},
			{
				"name": "text",
				"attribute": "text"
			},
			{
				"name": "role",
				"attribute": "role",
				"type": "string",
				"default": "\"menuitem\""
			},
			{
				"name": "tabindex",
				"attribute": "tabindex",
				"type": "string",
				"default": "-1"
			}
		],
		"events": [
			{
				"name": "d2l-menu-item-select"
			},
			{
				"name": "d2l-menu-item-visibility-change"
			}
		]
	},
	{
		"name": "d2l-meter-circle",
		"path": "./components/meter/meter-circle.js",
		"attributes": [
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "max",
				"type": "number",
				"default": "100"
			},
			{
				"name": "percent",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "value",
				"type": "number",
				"default": "0"
			}
		],
		"properties": [
			{
				"name": "text",
				"attribute": "text",
				"type": "string"
			},
			{
				"name": "max",
				"attribute": "max",
				"type": "number",
				"default": "100"
			},
			{
				"name": "percent",
				"attribute": "percent",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "value",
				"attribute": "value",
				"type": "number",
				"default": "0"
			}
		],
		"events": [
			{
				"name": "d2l-localize-behavior-language-changed"
			}
		]
	},
	{
		"name": "d2l-meter-linear",
		"path": "./components/meter/meter-linear.js",
		"attributes": [
			{
				"name": "text-inline",
				"type": "boolean"
			},
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "max",
				"type": "number",
				"default": "100"
			},
			{
				"name": "percent",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "value",
				"type": "number",
				"default": "0"
			}
		],
		"properties": [
			{
				"name": "textInline",
				"attribute": "text-inline",
				"type": "boolean"
			},
			{
				"name": "text",
				"attribute": "text",
				"type": "string"
			},
			{
				"name": "max",
				"attribute": "max",
				"type": "number",
				"default": "100"
			},
			{
				"name": "percent",
				"attribute": "percent",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "value",
				"attribute": "value",
				"type": "number",
				"default": "0"
			}
		],
		"events": [
			{
				"name": "d2l-localize-behavior-language-changed"
			}
		]
	},
	{
		"name": "d2l-meter-radial",
		"path": "./components/meter/meter-radial.js",
		"attributes": [
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "max",
				"type": "number",
				"default": "100"
			},
			{
				"name": "percent",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "value",
				"type": "number",
				"default": "0"
			}
		],
		"properties": [
			{
				"name": "text",
				"attribute": "text",
				"type": "string"
			},
			{
				"name": "max",
				"attribute": "max",
				"type": "number",
				"default": "100"
			},
			{
				"name": "percent",
				"attribute": "percent",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "value",
				"attribute": "value",
				"type": "number",
				"default": "0"
			}
		],
		"events": [
			{
				"name": "d2l-localize-behavior-language-changed"
			}
		]
	},
	{
		"name": "d2l-more-less",
		"path": "./components/more-less/more-less.js",
		"description": "The `d2l-more-less` element can be used to minimize the display of long content, while providing a way to reveal the full content.",
		"attributes": [
			{
				"name": "blur-color",
				"description": "The gradient color of the blurring effect.",
				"type": "string"
			},
			{
				"name": "h-align",
				"description": "The h-align property of the more-less button.",
				"type": "string"
			},
			{
				"name": "expanded",
				"description": "Indicates whether element is in \"more\" state.",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "height",
				"description": "The maximum height of the content when in \"less\" state.",
				"type": "string",
				"default": "\"4em\""
			},
			{
				"name": "inactive",
				"description": "Whether the component is active or inactive.",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "blurColor",
				"attribute": "blur-color",
				"description": "The gradient color of the blurring effect.",
				"type": "string"
			},
			{
				"name": "hAlign",
				"attribute": "h-align",
				"description": "The h-align property of the more-less button.",
				"type": "string"
			},
			{
				"name": "expanded",
				"attribute": "expanded",
				"description": "Indicates whether element is in \"more\" state.",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "height",
				"attribute": "height",
				"description": "The maximum height of the content when in \"less\" state.",
				"type": "string",
				"default": "\"4em\""
			},
			{
				"name": "inactive",
				"attribute": "inactive",
				"description": "Whether the component is active or inactive.",
				"type": "boolean",
				"default": "false"
			}
		],
		"events": [
			{
				"name": "d2l-more-less-render",
				"description": "Dispatched when the component finishes rendering"
			},
			{
				"name": "d2l-localize-behavior-language-changed"
			}
		],
		"slots": [
			{
				"name": "",
				"description": "Default content placed inside of the component"
			}
		]
	},
	{
		"name": "d2l-status-indicator",
		"path": "./components/status-indicator/status-indicator.js",
		"attributes": [
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "state",
				"description": "Valid values are: 'default', 'success', 'alert', and 'none'.",
				"type": "string",
				"default": "\"default\""
			},
			{
				"name": "bold",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "text",
				"attribute": "text",
				"type": "string"
			},
			{
				"name": "state",
				"attribute": "state",
				"description": "Valid values are: 'default', 'success', 'alert', and 'none'.",
				"type": "string",
				"default": "\"default\""
			},
			{
				"name": "bold",
				"attribute": "bold",
				"type": "boolean",
				"default": "false"
			}
		]
	},
	{
		"name": "d2l-tab-internal",
		"path": "./components/tabs/tab-internal.js",
		"attributes": [
			{
				"name": "controls-panel",
				"type": "string"
			},
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "aria-selected",
				"type": "string",
				"default": "\"false\""
			},
			{
				"name": "role",
				"type": "string",
				"default": "\"tab\""
			}
		],
		"properties": [
			{
				"name": "controlsPanel",
				"attribute": "controls-panel",
				"type": "string"
			},
			{
				"name": "text",
				"attribute": "text",
				"type": "string"
			},
			{
				"name": "ariaSelected",
				"attribute": "aria-selected",
				"type": "string",
				"default": "\"false\""
			},
			{
				"name": "role",
				"attribute": "role",
				"type": "string",
				"default": "\"tab\""
			},
			{
				"name": "tabIndex",
				"type": "number",
				"default": "-1"
			}
		],
		"events": [
			{
				"name": "d2l-tab-selected"
			}
		]
	},
	{
		"name": "d2l-tab-panel",
		"path": "./components/tabs/tab-panel.js",
		"attributes": [
			{
				"name": "no-padding",
				"type": "boolean"
			},
			{
				"name": "selected",
				"type": "boolean"
			},
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "role",
				"type": "string",
				"default": "\"tabpanel\""
			}
		],
		"properties": [
			{
				"name": "noPadding",
				"attribute": "no-padding",
				"type": "boolean"
			},
			{
				"name": "selected",
				"attribute": "selected",
				"type": "boolean"
			},
			{
				"name": "text",
				"attribute": "text",
				"type": "string"
			},
			{
				"name": "role",
				"attribute": "role",
				"type": "string",
				"default": "\"tabpanel\""
			}
		],
		"events": [
			{
				"name": "d2l-tab-panel-text-changed"
			},
			{
				"name": "d2l-tab-panel-selected"
			}
		]
	},
	{
		"name": "d2l-tabs",
		"path": "./components/tabs/tabs.js",
		"attributes": [
			{
				"name": "max-to-show",
				"type": "number",
				"default": "-1"
			},
			{
				"name": "arrow-keys-direction",
				"type": "string",
				"default": "\"leftright\""
			},
			{
				"name": "arrow-keys-no-wrap",
				"type": "boolean",
				"default": "false"
			}
		],
		"properties": [
			{
				"name": "maxToShow",
				"attribute": "max-to-show",
				"type": "number",
				"default": "-1"
			},
			{
				"name": "arrowKeysDirection",
				"attribute": "arrow-keys-direction",
				"type": "string",
				"default": "\"leftright\""
			},
			{
				"name": "arrowKeysNoWrap",
				"attribute": "arrow-keys-no-wrap",
				"type": "boolean",
				"default": "false"
			}
		],
		"events": [
			{
				"name": "d2l-tabs-initialized"
			},
			{
				"name": "d2l-localize-behavior-language-changed"
			}
		]
	},
	{
		"name": "d2l-tooltip",
		"path": "./components/tooltip/tooltip.js",
		"attributes": [
			{
				"name": "align",
				"type": "string"
			},
			{
				"name": "boundary",
				"type": "object"
			},
			{
				"name": "for",
				"type": "string"
			},
			{
				"name": "position",
				"type": "string"
			},
			{
				"name": "showing",
				"type": "boolean"
			},
			{
				"name": "close-on-click",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "delay",
				"type": "number",
				"default": "0"
			},
			{
				"name": "disable-focus-lock",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "force-show",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "for-type",
				"type": "string",
				"default": "\"descriptor\""
			},
			{
				"name": "offset",
				"type": "number"
			},
			{
				"name": "state",
				"type": "string",
				"default": "\"info\""
			}
		],
		"properties": [
			{
				"name": "align",
				"attribute": "align",
				"type": "string"
			},
			{
				"name": "boundary",
				"attribute": "boundary",
				"type": "object"
			},
			{
				"name": "for",
				"attribute": "for",
				"type": "string"
			},
			{
				"name": "position",
				"attribute": "position",
				"type": "string"
			},
			{
				"name": "showing",
				"attribute": "showing",
				"type": "boolean"
			},
			{
				"name": "closeOnClick",
				"attribute": "close-on-click",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "delay",
				"attribute": "delay",
				"type": "number",
				"default": "0"
			},
			{
				"name": "disableFocusLock",
				"attribute": "disable-focus-lock",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "forceShow",
				"attribute": "force-show",
				"type": "boolean",
				"default": "false"
			},
			{
				"name": "forType",
				"attribute": "for-type",
				"type": "string",
				"default": "\"descriptor\""
			},
			{
				"name": "offset",
				"attribute": "offset",
				"type": "number"
			},
			{
				"name": "state",
				"attribute": "state",
				"type": "string",
				"default": "\"info\""
			}
		],
		"events": [
			{
				"name": "d2l-tooltip-show"
			},
			{
				"name": "d2l-tooltip-hide"
			}
		]
	}
];
