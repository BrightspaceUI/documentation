import './component-attribute-table.js';
import '@brightspace-ui/core/components/demo/demo-snippet.js';
import { css, html, LitElement } from 'lit-element';

export class DesignSystemInteractiveDemo extends LitElement {
	static get properties() {
		return {
			attributes: { type: String, reflect: true },
			code: { type: String, reflect: true },
			tagName: { type: String, attribute: 'tag-name', reflect: true }
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

	constructor() {
		super();
		this.attributes = '';
		this.code = '';
	}

	async firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);
		await this._getCode();
		this.shadowRoot.querySelector('d2l-demo-snippet').forceCodeUpdate();
	}

	render() {
		return html`
			<d2l-demo-snippet></d2l-demo-snippet>
			<d2l-design-system-component-attribute-table
				@change="${this._onChange}"
				tag-name="${this.tagName}">
			</d2l-design-system-component-attribute-table>
		`;
	}

	async _getCode() {
		const unescaped = unescape(this.code);
		let code = '';
		let imports = '';
		let script = '';
		const demoSnippet = this.shadowRoot.querySelector('d2l-demo-snippet');
		if (unescaped.includes('script')) {
			const scriptBeforeAfter = unescaped.split('</script>\n');
			imports = scriptBeforeAfter[0].split('<script type="module">\n')[1].replace(/import '/g, 'import \'../node_modules/');
			code = scriptBeforeAfter[1];
			script = document.createElement('script');
			script.setAttribute('type', 'module');
			const inlineScript = document.createTextNode(imports);
			script.appendChild(inlineScript);
		} else {
			code = unescaped;
		}

		demoSnippet.appendChild(script);
		demoSnippet.innerHTML = code;
	}

	_onChange(e) {
		const component = this.shadowRoot.querySelector('d2l-demo-snippet').children[0];
		const details = e.detail;
		if (details.type === 'Boolean') {
			if (details.value === false && component.hasAttribute(details.name)) component.removeAttribute(details.name);
			else if (details.value && !component.hasAttribute(details.name)) component.setAttribute(details.name, '');
		} else {
			component.setAttribute(details.name, details.value);
		}
		this.shadowRoot.querySelector('d2l-demo-snippet').forceCodeUpdate();
	}

}
customElements.define('d2l-design-system-interactive-demo', DesignSystemInteractiveDemo);
