import '@brightspace-ui/core/components/inputs/input-search.js';
import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui/core/components/status-indicator/status-indicator.js';
import 'd2l-table/d2l-table.js';
import { css, html, LitElement } from 'lit-element';
import { default as components } from '../data/components.js';
import { heading2Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { tableStyles } from './table-styles.js';

export class DesignSystemComponentList extends LitElement {
	static get properties() {
		return {
			_filter: { type: String }
		};
	}

	static get styles() {
		return [heading2Styles, tableStyles, css`
			:host {
				display: block;
			}

			:host([hidden]) {
				display: none;
			}

			h1.d2l-heading-2 {
				margin-top: 0;
			}

			d2l-input-search {
				max-width: 50%;
			}
			d2l-table {
				padding-top: 1rem;
			}
			d2l-link d2l-status-indicator {
				cursor: pointer;
			}
		`];
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);

		this.shadowRoot.querySelector('d2l-input-search').addEventListener('d2l-input-search-searched', (e) => {
			this._filter = e.detail.value;
		});
	}

	render() {
		const rows = components.map(component => {
			if (this._filter && !component.name.toLowerCase().includes(this._filter.toLowerCase())) return null;
			const baseState = html`<d2l-status-indicator state="${component.development.state}" text="${component.development.text}"></d2l-status-indicator>`;
			const state = component.readme ? html`<d2l-link href="${component.readme}">${baseState}</d2l-link>` : baseState;
			return html`
				<d2l-tr>
					<d2l-td><d2l-link href="/components/${component.tag}">${component.name}</d2l-link></d2l-td>
					<d2l-td>${state}</d2l-td>
					<d2l-td><d2l-status-indicator state="${component.design.state}" text="${component.design.text}"></d2l-status-indicator></d2l-td>
				</d2l-tr>
			`;
		});
		return html`
			<h1 class="d2l-heading-2">Component Status</h1>
			<d2l-input-search label="Search individuals" placeholder="Filter results"></d2l-input-search>
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
