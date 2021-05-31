import '@brightspace-ui/core/components/demo/demo-snippet.js';
import './resizable-demo.js';
import 'playground-elements/playground-ide';
import 'playground-elements/playground-code-editor';
import 'playground-elements/playground-preview';
import 'playground-elements/playground-project';
import { css, html, LitElement } from 'lit-element';

const MINIMUM_WIDTH = 300;
class ComponentCatalogDemoSnippetWrapper extends LitElement {
	static get properties() {
		return {
			/**
			* Code for the preview IFrame to display
			*/
			code: { type: String },
			/**
			* Necessary imports for the code running in the IFrame
			*/
			imports: { type: String },
			/**
			* Hide the read-only code view
			*/
			hideCode: { type: Boolean, attribute: 'hide-code' }
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

	render() {
		return html`
			<d2l-resizable-demo code=${this.code} imports=${this.imports}></d2l-resizable-demo>
			<div class="editor-wrapper">
				<div class="button-container">
					<!-- Add button items to the overlay and pass through props -->
				</div>
				${!this.hideCode ? html`<playground-code-editor readonly type="html" .value=${this.code}></playground-code-editor>` : null}
			</div>
		`;
	}

}
customElements.define('d2l-component-catalog-code-demo', ComponentCatalogDemoSnippetWrapper);
