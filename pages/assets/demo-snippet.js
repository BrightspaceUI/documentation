import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/demo/demo-snippet.js';
import './demo-resizable-preview.js';
import './demo-attribute-table.js';
import 'playground-elements/playground-code-editor';
import { css, html, LitElement } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';

const defaultImports = [
	'import \'@brightspace-ui/core/components/typography/typography.js?module\';\n',
];
const parseImports = (allContent) => {
	const content = /<script.*>([\s\S]*)<\/script>/g.exec(allContent);
	if (!content || content.length !== 2 || content[1] === '') return '';

	const importsArray = content[1].split('\n');
	let imports = '';
	importsArray.forEach((importUrl) => {
		if (!importUrl.includes('import')) return;
		// append ?module to resolve imports in playground-demo components
		const appendedModule = importUrl.slice(0, -2).concat('?module\';').trim();
		imports += `${appendedModule}\n`;
	});
	// Append default imports for IFrames
	defaultImports.forEach((importStatement) => imports += importStatement);
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
			_attributes: { type: Object, reflect: true },
			/**
			* Should the attribute table be rendered for interactivity
			*/
			interactive: { type: Boolean, reflect: true },
			/**
			* Is the preview resizable
			*/
			resizable : { type: Boolean, reflect: true },
		};
	}
	static get styles() {
		return css`
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
		`;
	}

	constructor() {
		super();
		this._attributes = {};
		this.hideCode = false;
		this.interactive = false;
		this.resizable = false;
	}

	get code() {
		// remove comment line from code snippet
		const lines = this.demoSnippet.split('\n');
		lines.splice(0, 1);
		const codeSnippet = lines.join('\n');
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
		const tag = 'size:';
		let size;
		if (this.demoSnippet.includes(tag)) {
			const nameSection = this.demoSnippet.split(tag)[1];
			size = nameSection.split(' ')[0];
		}
		return size;
	}
	get tagName() {
		const tag = 'name:';
		let name;
		if (this.demoSnippet.includes(tag)) {
			const nameSection = this.demoSnippet.split(tag)[1];
			name = nameSection.split(' ')[0];
		}
		return name;
	}
	render() {
		const codeSnippet = this.code;
		return html`
			<d2l-component-catalog-demo-resizable-preview code=${codeSnippet} imports=${this.imports} ?resizable=${this.resizable} ?attached=${!this.hideCode} size=${ifDefined(this.size)}></d2l-component-catalog-demo-resizable-preview>
			<div class="d2l-editor-wrapper">
				<div class="d2l-button-container">
					<!-- Add button items to the overlay and pass through props -->
				</div>
				${ !this.hideCode ? html`<playground-code-editor readonly type="html" .value=${codeSnippet}></playground-code-editor>` : null }
			</div>
			${ this.interactive ? html`<d2l-component-catalog-demo-attribute-table @property-change=${this._handlePropertyChange} editable tag-name="${this.tagName}"></d2l-component-catalog-demo-attribute-table>` : null }
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
}
customElements.define('d2l-component-catalog-demo-snippet', ComponentCatalogDemoSnippetWrapper);
