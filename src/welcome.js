import { css, html, LitElement } from 'lit-element';
import { heading2Styles } from '@brightspace-ui/core/components/typography/styles.js';

export class DesignSystemWelcome extends LitElement {
	static get properties() {
		return {
			_components: { type: Array },
			_componentsFetched: { type: Boolean }
		};
	}

	static get styles() {
		return [heading2Styles, css`
			:host {
				display: block;
			}
		`];
	}

	render() {
		return html`
			<div>Welcome to the Brightspace Component Design System documentation.</div>
		`;
	}
}
customElements.define('d2l-design-system-welcome', DesignSystemWelcome);
