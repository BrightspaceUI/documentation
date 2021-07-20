import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/demo/demo-snippet.js';
import './demo-resizable-preview.js';
import './demo-tables.js';
import 'playground-elements/playground-code-editor';
import 'prismjs/prism.js';
import { css, html, LitElement } from 'lit-element';
import { getCode, parseImports } from './utils.mjs';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { themeStyles } from './code-style.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

class ComponentCatalogDemoSnippetWrapper extends LitElement {
	static get properties() {
		return {
			/**
			 * If true then all instances of tagName component are affected by property table changes, else only the first
			 */
			allInstancesInteractive: { type: Boolean, attribute: 'all-instances-interactive' },
			/**
			 * Default values for demo attributes. Formatted as a stringified object.
			 */
			autoSize: { type: Boolean, attribute: 'auto-size' },
			/**
			 * Default values for demo attributes. Formatted as a stringified object.
			 */
			defaults: { type: String },
			/**
			* Hide the read-only code view
			*/
			hideCode: { type: Boolean, attribute: 'hide-code' },
			/**
			* Hide the IFramed demo
			*/
			hideDemo: { type: Boolean, attribute: 'code-only' },
			/**
			* Should the attribute table be rendered for interactivity
			*/
			interactive: { type: Boolean, reflect: true },
			/**
			* Language used to highlight code, defaults to `html`
			*/
			language: { type: String, reflect: true },
			/**
			* Is the preview resizable
			*/
			resizable : { type: Boolean, reflect: true },
			/**
			* Size of the IFrame demo portion
			* @type {'small'|'medium'|'large'|'xlarge'}
			*/
			size: { type: String },
			/**
			 * The tag of the component being showcased in the demo which has its properties shown (if interactive)
			 */
			tagName: { attribute: 'tag-name', type: String },
			_attributes: { type: Object, reflect: true },
			_demoSnippet:  { type: String },
		};
	}
	static get styles() {
		return [themeStyles, css`
			:host {
				display: block;
				margin-bottom: 15px;
			}

			:host([hidden]) {
				display: none;
			}

			:host([code-only]) pre {
				border-radius: 10px;
			}

			.d2l-editor-wrapper {
				min-width: 300px;
				position: relative;
			}

			.d2l-button-container {
				padding-right: 10px;
				position: absolute;
				right: 0;
				z-index: 10;
			}
		`];
	}

	constructor() {
		super();
		this._attributes = {};
		this.allInstancesInteractive = false;
		this.autoSize = false;
		this.hideCode = false;
		this.hideDemo = false;
		this.interactive = false;
		this.language = 'html';
		this.resizable = false;
	}

	get code() {
		return getCode(this._demoSnippet, this.interactive, this._attributes, this.tagName, this.allInstancesInteractive);
	}

	get imports() {
		return parseImports(this._demoSnippet);
	}

	connectedCallback() {
		super.connectedCallback();

		if (this.defaults) {
			const defaults = JSON.parse(this.defaults);
			Object.keys(defaults).forEach((key) => {
				const value = defaults[key];
				this._updateAttributes({ name: key, type: typeof(value), value });
			});
		}
		this._highlightedCodeSnippet = Prism.highlight(this.code, Prism.languages[this.language], this.language);
	}

	render() {
		if (!this._demoSnippet) return html`<slot @slotchange="${this._handleSlotChange}"></slot>`;
		const codeSnippet = this.code;
		return html`
			${ !this.hideDemo ? html`
				<d2l-component-catalog-demo-resizable-preview
					?attached=${!this.hideCode}
					?auto-size=${this.autoSize}
					code=${codeSnippet}
					imports=${this.imports}
					?resizable=${this.resizable}
					size=${ifDefined(this.size)}
					tag-name="${this.tagName}">
				</d2l-component-catalog-demo-resizable-preview>` : null}
			<div class="d2l-editor-wrapper">
				<div class="d2l-button-container">
					<!-- Add button items to the overlay and pass through props -->
				</div>
				${ !this.hideCode ? html`<pre class="language-${this.language}"><code class="language-${this.language}">${unsafeHTML(this._highlightedCodeSnippet)}</code></pre>` : null }
			</div>
			${ this.interactive ? html`
				<d2l-component-catalog-demo-tables
					defaults="${ifDefined(this.defaults)}"
					@property-change=${this._handlePropertyChange}
					interactive
					tag-name="${this.tagName}">
				</d2l-component-catalog-demo-tables>` : null }
		`;
	}

	update(changedProperties) {

		if (changedProperties.has('_attributes')) {
			this._highlightedCodeSnippet = Prism.highlight(this.code, Prism.languages[this.language], this.language);
		}

		super.update(changedProperties);
	}

	_handlePropertyChange(event) {
		this._updateAttributes(event.detail);
		this.requestUpdate();
	}

	_handleSlotChange() {
		const slot = this.shadowRoot.querySelector('slot');
		if (slot && slot.assignedNodes().length > 0) {
			this._demoSnippet = slot.assignedNodes()[0].textContent;
			this._highlightedCodeSnippet = Prism.highlight(this.code, Prism.languages[this.language], this.language);
		}
	}

	_updateAttributes(detail) {
		const { name, type, value } = detail;
		if (value === '' || !value) {
			delete this._attributes[name];
			this._attributes = { ...this._attributes };
		} else {
			this._attributes = { ...this._attributes, [name]: { type, value } };
		}
	}

}
customElements.define('d2l-component-catalog-demo-snippet', ComponentCatalogDemoSnippetWrapper);
