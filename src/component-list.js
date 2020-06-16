import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui/core/components/status-indicator/status-indicator.js';
import 'd2l-table/d2l-table.js';
import { css, html, LitElement } from 'lit-element';
import { default as coreComponents } from '../data/core.js';
import { heading2Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { tableStyles } from './table-styles.js';

export class DesignSystemComponentList extends LitElement {
	static get properties() {
		return {
			_components: { type: Array },
			_componentsFetched: { type: Boolean }
		};
	}

	static get styles() {
		return [heading2Styles, tableStyles, css`
			:host {
				display: block;
			}
		`];
	}

	constructor() {
		super();

		this._commponents = [];
		this._componentsFetched = false;
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);

		this._commponents = this._commponents.concat(coreComponents);
		this._componentsFetched = true;
	}

	render() {
		const rows = this._commponents.map(component => {
			const name = component.readme ? html`<d2l-link href="${component.readme}">${component.name}</d2l-link>` : html`<div>${component.name}</div>`;
			return html`
				<d2l-tr>
					<d2l-td>${name}</d2l-td>
					<d2l-td><d2l-status-indicator state="${component.development.state}" text="${component.development.text}"></d2l-status-indicator></d2l-td>
					<d2l-td><d2l-status-indicator state="${component.design.state}" text="${component.design.text}"></d2l-status-indicator></d2l-td>
				</d2l-tr>
			`;
		});
		return html`
			<h1 class="d2l-heading-2">Component Status</h1>
			<d2l-table class="d2l-table">
				<d2l-thead>
					<d2l-tr>
						<d2l-th>Component</d2l-th>
						<d2l-th>Development Status</d2l-th>
						<d2l-th>Design Status</d2l-th>
					</d2l-tr>
				</d2l-thead>
				<d2l-tbody>
					${rows}
				</d2l-tbody>
			</d2l-table>
		`;
	}
}
customElements.define('d2l-design-system-component-list', DesignSystemComponentList);
