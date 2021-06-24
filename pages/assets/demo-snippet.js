import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/demo/demo-snippet.js';
import './demo-attribute-table.js';
import './demo-resizable-preview.js';
import 'playground-elements/playground-code-editor';
import 'prismjs/prism.js';
import { css, html, LitElement } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { parseImports } from './utils.js';
import { themeStyles } from './code-style.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

class ComponentCatalogDemoSnippetWrapper extends LitElement {
	static get properties() {
		return {
			/**
			* Code from the markdown to manipulate before previewing in the IFrame
			*/
			demoSnippet:  { type: String, attribute: 'demo-snippet' },
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
			_attributes: { type: Object, reflect: true }
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
		this.hideCode = false;
		this.hideDemo = false;
		this.interactive = false;
		this.language = 'html';
		this.resizable = false;
	}

	get code() {
		// remove comment lines from code snippet
		const lines = this.demoSnippet.split('-->');
		const codeSnippet = lines.length === 1 ? lines[0] : lines[1]; // if there was no `-->` found lines[1] will be null
		if (this.interactive) {
			const splitItems = codeSnippet.split('$attributes');
			if (splitItems.length === 2) {

				const attributes = [];
				for (const attribute in this._attributes) {
					const { type, value } = this._attributes[attribute];
					switch (type) {
						case 'String':
							attributes.push(`${attribute}="${value}"`);
							break;
						case 'Boolean':
							attributes.push(`${attribute}`);
							break;
						case 'Number':
							attributes.push(`${attribute}=${value}`);
							break;
						default:
							break;
					}
				}
				attributes.sort();
				const attributesText = attributes.length === 0 ? '' : ` ${attributes.join(' ')}`;
				// Append the code snippet back together with our edited attributes
				const withAttributes = `${splitItems[0].trim()}${attributesText}${splitItems[1]}`;
				return `${withAttributes}`;
			}
		}

		return codeSnippet;
	}

	get imports() {
		return parseImports(this.demoSnippet);
	}

	get size() {
		const size = this._parseConfigurationValue('size');
		return size;
	}

	get tagName() {
		const name = this._parseConfigurationValue('name');
		return name;
	}

	connectedCallback() {
		super.connectedCallback();
		this._highlightedCodeSnippet = Prism.highlight(this.code, Prism.languages[this.language], this.language);
	}

	render() {
		const codeSnippet = this.code;

		return html`
			${ !this.hideDemo ? html`
				<d2l-component-catalog-demo-resizable-preview
					?attached=${!this.hideCode}
					code=${codeSnippet}
					imports=${this.imports}
					?resizable=${this.resizable}
					size=${ifDefined(this.size)}>
				</d2l-component-catalog-demo-resizable-preview>` : null}
			<div class="d2l-editor-wrapper">
				<div class="d2l-button-container">
					<!-- Add button items to the overlay and pass through props -->
				</div>
				${ !this.hideCode ? html`<pre class="language-${this.language}"><code class="language-${this.language}">${unsafeHTML(this._highlightedCodeSnippet)}</code></pre>` : null }
			</div>
			${ this.interactive ? html`
				<d2l-component-catalog-demo-attribute-table
					@property-change=${this._handlePropertyChange}
					interactive
					tag-name="${this.tagName}">
				</d2l-component-catalog-demo-attribute-table>` : null }
		`;
	}

	update(changedProperties) {

		if (changedProperties.has('_attributes')) {
			this._highlightedCodeSnippet = Prism.highlight(this.code, Prism.languages[this.language], this.language);
		}

		super.update(changedProperties);
	}

	_handlePropertyChange(event) {
		const { name, type, value } = event.detail;
		if (value === '' || !value) {
			delete this._attributes[name];
			this._attributes = { ...this._attributes };
		} else {
			this._attributes = { ...this._attributes, [name]: { type, value } };
		}
		this.requestUpdate();
	}

	_parseConfigurationValue(tag) {
		let value;
		if (this.demoSnippet.includes(`${tag}:`)) {
			let section = this.demoSnippet.split(`${tag}:`)[1];
			section = section.split('-->')[0];
			// Get configuration values from inline
			if (section.includes(' ')) {
				value = section.split(' ')[0];
			} else {
				// Get configuration values on mulitple lines
				value = section.split('\n')[0];
			}
		}
		return value;
	}

}
customElements.define('d2l-component-catalog-demo-snippet', ComponentCatalogDemoSnippetWrapper);
