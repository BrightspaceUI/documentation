import '@brightspace-ui/core/components/demo/demo-snippet.js';
import { css, html, LitElement } from 'lit-element';

class ComponentCatalogDemoSnippetWrapper extends LitElement {

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	render() {
		return html`
			<d2l-demo-snippet><slot @slotchange="${this._getCode}"></slot></d2l-demo-snippet>
		`;
	}

	async _getCode(e) {
		if (!e.target) return;
		const slotContent = e.target.assignedNodes({ flatten: true })[0];
		if (!slotContent) return;
		const code = slotContent.data;
		const unescaped = unescape(code);
		const demoSnippet = this.shadowRoot.querySelector('d2l-demo-snippet');
		demoSnippet.innerHTML = unescaped;
	}

}
customElements.define('d2l-component-catalog-demo-snippet-wrapper', ComponentCatalogDemoSnippetWrapper);