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
			.d2l-component-catalog-demo-snippet-wrapper-content {
				display: flex;
				justify-content: space-evenly;
			}
		`;
	}

	render() {
		return html`
			<polymer-code-editor reaonly .value=${this._getCode}>
			</polymer-code-editor>
		`;
	}

	async _getCode(e) {
		if (!e.target) return;
		const slotContent = e.target.assignedNodes({ flatten: true })[0];
		if (!slotContent) return;
		const demoSnippet = this.shadowRoot.querySelector('div.d2l-component-catalog-demo-snippet-wrapper-content');
		demoSnippet.innerHTML = unescape(slotContent.data);
	}

}
customElements.define('d2l-component-catalog-demo-snippet-wrapper', ComponentCatalogDemoSnippetWrapper);
