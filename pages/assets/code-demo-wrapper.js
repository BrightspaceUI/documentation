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
			.editor-wrapper {
				position: relative;
			}
		`;
	}
	get getCode() {
		return `
		<!-- playground-hide -->
		test
		<!-- playground-hide-end -->	
			${this.code}
		`;
	}
	get getModuleImports() {
		return this.script;
	}
	render() {
		console.log(this.script)
		return html`
			<div class="code-demo-container">
				<playground-project id="p1">
					<script type="sample/importmap">
						{
							"imports": {
								"@brightspace-ui/core": "https://unpkg.com/@brightspace-ui/core",
								"@brightspace-ui/core/": "https://unpkg.com/@brightspace-ui/core/"
							}
						}
					</script>
					<script filename="index.html" type="sample/html"> 
						<script type="module" src="index.js">&lt;/script>
						<body class="d2l-typography">
							${this.getCode}
						</body>
					</script>	
					<script filename="index.js" type="sample/html">
${this.getModuleImports}
					</script>
				</playground-project>
				
				<playground-preview id="preview" project="p1" filename="index.html">
				</playground-preview>
				<div class="editor-wrapper">
					<div class="button-container">
						test
					</div>
					<playground-code-editor readonly type="html" pragmas="on" .value=${this.getCode}>
					</playground-code-editor>
				</div>
				
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
