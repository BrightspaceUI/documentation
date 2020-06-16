import { css, html, LitElement } from 'lit-element';

export class DesignSystemComponent extends LitElement {
	static get properties() {
		return {
			component: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
		`;
	}

	constructor() {
		super();

		this.component = '';
	}

	render() {
		return html`
			<div>${this.component}</div>
		`;
	}
}
customElements.define('d2l-design-system-component', DesignSystemComponent);
