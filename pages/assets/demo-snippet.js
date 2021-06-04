import '@brightspace-ui/core/components/demo/demo-snippet.js';
import './demo-resizable-preview.js';
import './demo-attribute-table.js';
import 'playground-elements/playground-ide';
import 'playground-elements/playground-code-editor';
import 'playground-elements/playground-preview';
import 'playground-elements/playground-project';
import { css, html, LitElement } from 'lit-element';

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
			interactive: { type: Boolean },
			// Name of the demo if interactive
			name: { type: String },
			attributes: { type: Object, reflect: true }
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
				min-width: ${MINIMUM_WIDTH}px;
				width: 100%;
				display: inline-block;
				--playground-code-font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
				--playground-code-background: var(--d2l-color-ferrite);
				/* todo: do some of these colors have names?? */
				--playground-code-tag-color: #2de2c0; 
				--playground-code-string-color: #FFF9D6;
				--playground-code-attribute-color: #00D2ED;
				--playground-code-default-color: var(--d2l-color-gypsum);
				border-radius: 0 0 10px 10px;
			}

			.editor-wrapper {
				position: relative;
			}

			.CodeMirror {
				padding: 40px 10px 0px 10px;
			}

			.button-container {
				z-index:10;
				position: absolute;
				padding-right: 10px;
				right:0;
			}
		`;
	}

	constructor() {
		super();
		this.hideCode = false;
		this.attributes = {};
	}

	get code() {
		// remove comment line from code snippet
		const lines = this.demoSnippet.split('\n');
		lines.splice(0, 1);
		const codeSnippet = lines.join('\n');
		if (this.interactive) {
			const splitItems = codeSnippet.split('$attributes');
			if (splitItems.length === 2) {

				let attributes = [];

				for(const attribute in this.attributes) {
					console.log(attribute)
					const { type, value } = this.attributes[attribute];
					console.log(type)
					switch(type) {
						// todo: add other attribute types
						case 'String': 
							attributes.push(`${attribute}="${value}"`)
							break;
						case 'Boolean': 
							attributes.push(`${attribute}`)
							break;
						default:
							break;
					}
				}
				// Append the code snippet back together with 
				const withAttributes = `${splitItems[0].trim()} ${attributes.join(' ')}${splitItems[1]}`;
				return `${withAttributes}`;
			}
		}

		return codeSnippet;
	}

	get imports() {
		return parseImports(this.demoSnippet);
	}

	render() {
		const codeSnippet = this.code;
		return html`
			<d2l-component-catalog-demo-resizable-preview .code=${codeSnippet} .imports=${this.imports} ?attached=${!this.hideCode}></d2l-component-catalog-demo-resizable-preview>
			<div class="editor-wrapper">
				<div class="button-container">
					<!-- Add button items to the overlay and pass through props -->
				</div>
				${ !this.hideCode ? html`<playground-code-editor readonly type="html" .value=${codeSnippet}></playground-code-editor>` : null }
			</div>
			${ this.interactive ? html`<d2l-component-catalog-demo-attribute-table @property-change=${this._handlePropertyChange} editable tag-name="${this.name}"></d2l-component-catalog-demo-attribute-table>` : null }
		`;
	}
	_handlePropertyChange(event) {
		const { name, type, value } = event.detail;
		this.attributes[name] = {type, value}
		this.requestUpdate();
	}
}
customElements.define('d2l-component-catalog-demo-snippet', ComponentCatalogDemoSnippetWrapper);
