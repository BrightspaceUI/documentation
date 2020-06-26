import '@brightspace-ui/core/components/demo/demo-snippet.js';
import { css, html, LitElement } from 'lit-element';

export class DesignSystemInteractiveDemo extends LitElement {
	static get properties() {
		return {
			attributes: { type: String, reflect: true },
			code: { type: String, reflect: true }
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
			<d2l-demo-snippet>
			</d2l-demo-snippet>
		`;
	}

	updated(changedProperties) {
		super.firstUpdated(changedProperties);

		changedProperties.forEach((_, prop) => {
			if (prop === 'attributes' && this.attributes !== '{}') {
				const attributes = JSON.parse(this.attributes);
				const component = this.shadowRoot.querySelector('d2l-demo-snippet').children[0];
				Object.keys(attributes).forEach((key) => {
					if (attributes[key].type === 'Boolean') {
						if (attributes[key].value === false && component.hasAttribute(key)) component.removeAttribute(key);
						else if (attributes[key].value === true && !component.hasAttribute(key)) component.setAttribute(key, '');
					} else {
						component.setAttribute(key, attributes[key].value);
					}
				});
				this.shadowRoot.querySelector('d2l-demo-snippet').forceCodeUpdate();
			}
		});
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

}
customElements.define('d2l-design-system-interactive-demo', DesignSystemInteractiveDemo);
