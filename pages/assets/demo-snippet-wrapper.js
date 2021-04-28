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
			<d2l-demo-snippet code-view-hidden>
				<div class="d2l-component-catalog-demo-snippet-wrapper-content">
					<slot @slotchange="${this._getCode}"></slot>
				</div>
			</d2l-demo-snippet>
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
