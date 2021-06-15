import 'prismjs/prism.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/demo/demo-snippet.js';
import './demo-attribute-table.js';
import './demo-resizable-preview.js';
import 'playground-elements/playground-code-editor';
import { css, html, LitElement } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { themeStyles } from './code-style.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

const defaultImports = [
	'import \'@brightspace-ui/core/components/typography/typography.js?module\';\n',
];
const parseImports = (allContent) => {
	const content = /<script.*>([\s\S]*)<\/script>/g.exec(allContent);
	if (!content || content.length !== 2 || content[1] === '') return '';

	const importsArray = content[1].split('\n');
	let imports = '';

	// Append default imports for IFrames
	defaultImports.forEach((importStatement) => imports += importStatement);

	importsArray.forEach((importUrl) => {
		if (!importUrl.includes('import')) return;
		// append ?module to resolve imports in playground-demo components
		const appendedModule = importUrl.slice(0, -2).concat('?module\';').trim();
		imports += `${appendedModule}\n`;
	});
	return imports;
};
const MINIMUM_WIDTH = 300;
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
			hideDemo: { type: Boolean, attribute: 'hide-demo' },
			/**
			* Should the attribute table be rendered for interactivity
			*/
			interactive: { type: Boolean, reflect: true },
			/**
			* Is the preview resizable
			*/
			resizable : { type: Boolean, reflect: true },
			_attributes: { type: Object, reflect: true }
		};
	}
	static get styles() {
		return [css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}

			playground-code-editor {
				/* stylelint-disable */
				--playground-code-font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
				--playground-code-background: var(--d2l-color-ferrite);
				--playground-code-tag-color: var(--d2l-color-malachite);
				--playground-code-string-color: var(--d2l-color-citrine-plus-1);
				--playground-code-attribute-color: var(--d2l-color-zircon-plus-1);
				--playground-code-default-color: var(--d2l-color-gypsum);
				/* stylelint-enable */
				border-radius: 0 0 10px 10px;
				display: inline-block;
				min-width: ${MINIMUM_WIDTH}px;
				width: 100%;
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
		`, themeStyles];
	}

	constructor() {
		super();
		this._attributes = {};
		this.hideCode = false;
		this.hideDemo = false;
		this.interactive = false;
		this.resizable = false;
	}

	get code() {
		// remove comment lines from code snippet
		const lines = this.demoSnippet.split('-->');
		const codeSnippet = lines[1];
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

	render() {
		const codeSnippet = this.code;
		const formattedCodeSnippet = Prism.highlight(this.code, Prism.languages['html'], 'html');
		return html`
			${ !this.hideDemo ? html`<d2l-component-catalog-demo-resizable-preview 
				code=${codeSnippet}
				imports=${this.imports}
				?resizable=${this.resizable}
				?attached=${!this.hideCode}
				size=${ifDefined(this.size)}>
				</d2l-component-catalog-demo-resizable-preview>` : null}
			<div class="d2l-editor-wrapper">
				<div class="d2l-button-container">
					<!-- Add button items to the overlay and pass through props -->
				</div>
				${ !this.hideCode ? html`<pre class="language-html"><code class="language-html">${unsafeHTML(formattedCodeSnippet)}</code></pre>` : null }
			</div>
			${ this.interactive ? html`<d2l-component-catalog-demo-attribute-table @property-change=${this._handlePropertyChange} interactive tag-name="${this.tagName}"></d2l-component-catalog-demo-attribute-table>` : null }
		`;

	}
	_handlePropertyChange(event) {
		const { name, type, value } = event.detail;
		if (value === '' || !value) {
			delete this._attributes[name];
		} else {
			this._attributes[name] = { type, value };
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
