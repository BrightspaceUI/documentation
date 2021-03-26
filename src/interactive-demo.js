import './component-attribute-table.js';
import '@brightspace-ui/core/components/demo/demo-snippet.js';
import { css, html, LitElement } from 'lit-element';

export class DesignSystemInteractiveDemo extends LitElement {
	static get properties() {
		return {
			_tagName: { type: String }
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
		`;
	}

	render() {
		return html`
			<d2l-demo-snippet><slot @slotchange="${this._getCode}"></slot></d2l-demo-snippet>
			<d2l-design-system-component-attribute-table
				@change="${this._onChange}"
				tag-name="${this._tagName}">
			</d2l-design-system-component-attribute-table>
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
		this._component = demoSnippet.children[0].tagName === 'SCRIPT' ? demoSnippet.children[1] : demoSnippet.children[0];
		this._tagName = this._component.tagName.toLowerCase();
	}

	_onChange(e) {
		const details = e.detail;
		if (details.type === 'Boolean') {
			if (details.value === false && this._component.hasAttribute(details.name)) this._component.removeAttribute(details.name);
			else if (details.value && !this._component.hasAttribute(details.name)) this._component.setAttribute(details.name, '');
		} else {
			this._component.setAttribute(details.name, details.value);
		}
		this.shadowRoot.querySelector('d2l-demo-snippet').forceCodeUpdate();
	}

}
customElements.define('d2l-design-system-interactive-demo', DesignSystemInteractiveDemo);
