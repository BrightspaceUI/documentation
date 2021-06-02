import '@brightspace-ui/core/components/demo/demo-snippet.js';
import './resizable-demo.js';
import 'playground-elements/playground-ide';
import 'playground-elements/playground-code-editor';
import 'playground-elements/playground-preview';
import 'playground-elements/playground-project';
import { css, html, LitElement } from 'lit-element';

const defaultImports = [
	'import \'@brightspace-ui/core/components/typography/typography.js?module\';\n',
];
const getImports = (allContent) => {
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
	}

	get code() {
		// remove comment line from code snippet
		const lines = this.demoSnippet.split('\n');
		lines.splice(0, 1);
		const codeSnippet = lines.join('\n');
		if (this.interactive) {
			const splitItems = this.code.split('$attributes');
			if (splitItems.length === 2) {
				// todo insert attributes based on table results
				const withAttributes = `${splitItems[0]} -- insert attributes -- ${splitItems[1]}`;
				return `${withAttributes}`;
			}
		}

		return codeSnippet;
	}

	get imports() {
		return getImports(this.demoSnippet);
	}

	render() {
		return html`
			<d2l-component-catalog-resizable-demo code=${this.code} imports=${this.imports} ?attached=${!this.hideCode}></d2l-component-catalog-resizable-demo>
			<div class="editor-wrapper">
				<div class="button-container">
					<!-- Add button items to the overlay and pass through props -->
				</div>
				${ !this.hideCode ? html`<playground-code-editor readonly type="html" .value=${this.code}></playground-code-editor>` : null }
			</div>
			${ this.interactive ? html`<div> interactive attribute table </div>` : null }
		`;
	}
}
customElements.define('d2l-component-catalog-code-demo', ComponentCatalogDemoSnippetWrapper);
