import '@brightspace-ui/core/components/demo/code-view.js';
import { css, html, LitElement } from 'lit-element';

class ComponentCatalogCodeViewWrapper extends LitElement {

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
			<d2l-code-view language="html" hide-language><div class="d2l-component-catalog-code-view-wrapper-content"><slot @slotchange="${this._getCode}"></slot></div>
			</d2l-code-view>
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
customElements.define('d2l-component-catalog-code-view-wrapper', ComponentCatalogCodeViewWrapper);
