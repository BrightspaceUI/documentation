import { css, html, LitElement } from 'lit-element';

export class DesignSystemWelcome extends LitElement {
	static get properties() {
		return {
			_components: { type: Array },
			_componentsFetched: { type: Boolean }
		};
	}

	static get styles() {
		return css`
			:host {
				display: inline-block;
			}

			:host([hidden]) {
				display: none;
			}
		`;
	}

	render() {
		return html`
			<div>Welcome to the Brightspace Component Design System documentation.</div>
		`;
	}
}
customElements.define('d2l-design-system-welcome', DesignSystemWelcome);
