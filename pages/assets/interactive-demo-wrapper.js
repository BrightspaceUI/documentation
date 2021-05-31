import '@brightspace-ui/core/components/demo/demo-snippet.js';
import './resizable-demo.js';
import 'playground-elements/playground-ide';
import 'playground-elements/playground-code-editor';
import 'playground-elements/playground-preview';
import 'playground-elements/playground-project';
import { css, html, LitElement } from 'lit-element';

class ComponentCatalogDemoSnippetWrapper extends LitElement {
	static get properties() {
		return {
			code: { type: String, attribute: 'code', reflect: true },
			imports: { type: String, attribute: 'imports' },
			showCode: { type: Boolean, attribute: 'show-code' }
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
				width: 100%;
				display: inline-block;
			}

		
			.editor-wrapper {
				position: relative;
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
		this.showCode = true;
	}

	get getCode() {

		const splitItems = this.code.split('$attributes');
		if (splitItems.length === 2) {
			// todo insert attributes
			const withAttributes = `${splitItems[0]} -- insert attributes -- ${splitItems[1]}`;
			return `${withAttributes}`;
		}

		return `${this.code}`;

	}
	get getModuleImports() {
		return this.imports;
	}

	render() {
		console.log(this.getCode)
		console.log(this.getCode())
		return html`
			<div class="code-demo-container">
				
				<d2l-resizable-demo .code=${this.getCode} .imports=${this.imports}></d2l-resizable-demo>

				<div class="editor-wrapper">
					<div class="button-container">
						button container overlay
					</div>
					${this.showCode ? html`<playground-code-editor readonly type="html" .value=${this.getCode}></playground-code-editor>` : null}
				</div>
				<div class="attribute-table-wrapper">
				<!-- todo: Add attribute table -->
				</div>
			</div>
		`;
	}

}
customElements.define('d2l-component-catalog-code-demo', ComponentCatalogDemoSnippetWrapper);
