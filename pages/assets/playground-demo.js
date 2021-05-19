// import '@brightspace-ui/core/components/demo/code-view.js';
import 'playground-elements/playground-ide.js';
import 'playground-elements/playground-project.js';
import 'playground-elements/playground-code-editor.js';
import 'playground-elements/playground-preview.js';
import { css, html } from 'lit-element';
import { PlaygroundConnectedElement } from 'playground-elements/playground-connected-element.js';

const mimeTypeToTypeEnum = (mimeType) => {
	// TODO: infer type based on extension too
	if (mimeType === undefined) {
		return;
	}
	const encodingSepIndex = mimeType.indexOf(';');
	if (encodingSepIndex !== -1) {
		mimeType = mimeType.substring(0, encodingSepIndex);
	}
	switch (mimeType) {
		case 'video/mp2t':
			return 'ts';
		case 'text/javascript':
		case 'application/javascript':
			return 'js';
		case 'application/json':
			return 'json';
		case 'text/html':
			return 'html';
		case 'text/css':
			return 'css';
	}
	return undefined;
  };
// topics: 
// readonlyness of the component
// 
class Test2 extends PlaygroundConnectedElement {

	static get properties() {
		return {
			code: { type: String, attribute: 'code' },
			filename: { type: String, attribute: 'filename' }
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

			#toolbar {
				display:none;
			}
		`;
	}


	render() {
		console.log('render demo');
		return html`
		<div>
		<playground-project id="project1">

			<script type="sample/importmap">
				{
					"imports": {
						"@brightspace-ui/core/": "https://unpkg.com/@brightspace-ui/core@1.131.2/"
					}
				}
			</script>
			<script type="sample/html" filename="index.html">
<!-- playground-hide -->
<script type="module" src="import.js">			
&lt;/script>
<body class="d2l-typography">
<!-- playground-hide-end -->
${this.code}
<!-- playground-hide -->
</body>
<!-- playground-hide-end -->
			</script>

			<script type="sample/js" filename="import.js">
			
				import '@brightspace-ui/core/components/button/button.js?module';
				import '@brightspace-ui/core/components/typography/typography.js?module';
			</script>
		</playground-project>
		
		<playground-file-editor project="project1" file="index.js"> </playground-file-editor>
		<playground-preview project="project1"> </playground-preview>
		</div>
		`;
	}
	// async update(changedProperties) {
	// 	if (changedProperties.has('_project')) {
	// 		if (this._project) {
	// 			this._project.addEventListener('compileDone', this.requestUpdate);
	// 			// this._project.addEventListener(
	// 			//   'diagnosticsChanged',
	// 			//   this._onDiagnosticsChanged
	// 			// );
	// 		}
	// 	}
	// 	super.update(changedProperties);
	// }
	get _currentFile() {
		return this.filename
			? this._files.find((file) => file.name === this.filename)
			: undefined;
	}
	get _files() {
		return this._project?.files ?? [];
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
customElements.define('my-playground-demo', Test2);

