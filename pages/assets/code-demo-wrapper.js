import '@brightspace-ui/core/components/demo/demo-snippet.js';
import 'playground-elements/playground-ide';
import 'playground-elements/playground-code-editor';
import 'playground-elements/playground-preview';
import 'playground-elements/playground-project';
import { css, html, LitElement } from 'lit-element';

class ComponentCatalogDemoSnippetWrapper extends LitElement {
	static get properties() {
		return {
			code: { type: String, attribute: 'code', reflect: true },
			script: { type: String, attribute: 'script' },
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
			.d2l-component-catalog-demo-snippet-wrapper-content {
				display: flex;
				justify-content: space-evenly;
			}
			.code-demo-container {
				width: 100%;
				height: 100px;
			}
			#preview::part(preview-toolbar) {
				display: none;
			}
		`;
	}
	get getCode() {
		return this.code;
	}
	get getModuleImports() {
		return this.imports;
	}
	render() {
		return html`
			<div class="code-demo-container">
				<playground-project id="p1">
				<script type="sample/importmap">
					{
						"imports": {
							"@brightspace-ui/core": "https://cdn.skypack.dev/@brightspace-ui/core",
							"@brightspace-ui/core/": "https://cdn.skypack.dev/@brightspace-ui/core/"
						}
					}
				</script>
				<script filename="index.html" type="sample/html"> 

					<script filename="index.html" type="sample/html"> 
						<script type="module"> 
							import '@brightspace-ui/core/button/button.js?module';
						&lt;script>
						${this.getCode}
					</script>
					<script filename="index.js" type="sample/html"> 
					</script>
				</playground-project>

				<playground-preview id="preview" project="p1" filename="index.html">
				</playground-preview>
				<playground-code-editor  type="html" .value=${this.getCode}>
				</playground-code-editor>
			</div>
		`;
	}
	async _getCode(e) {
		if (!e.target) return;
		const slotContent = e.target.assignedNodes({ flatten: true })[0];
		if (!slotContent) return;
		const demoSnippet = this.shadowRoot.querySelector('div.d2l-component-catalog-code-view-wrapper-content');
		const textNode = document.createTextNode(unescape(slotContent.data));
		demoSnippet.textContent = textNode.textContent;
	}
}
customElements.define('d2l-component-catalog-code-demo', ComponentCatalogDemoSnippetWrapper);
