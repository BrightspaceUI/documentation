import { css, html, LitElement } from 'lit-element';

export class DesignSystemComponent extends LitElement {
	static get properties() {
		return {
			component: { type: String },
			_componentInfo: { type: Object }
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

		this.component = '';
		this._componentInfo = {};
	}

	render() {
		return html`
			<h1>${this._componentInfo.name}</h1>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		changedProperties.forEach((_, prop) => {
			if (prop === 'component') this._componentInfo = JSON.parse(this.component);
		});
	}
}
customElements.define('d2l-design-system-component', DesignSystemComponent);
