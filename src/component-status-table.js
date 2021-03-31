import '@brightspace-ui/core/components/inputs/input-search.js';
import '@brightspace-ui/core/components/link/link.js';
import 'd2l-table/d2l-table.js';
import { css, html, LitElement } from 'lit-element';
import { default as components } from './.generated/component-issue-data.js';
import { tableStyles } from './table-styles.js';

function _getStateMessage(state, readme) {
	const stateText = readme
		? html`<d2l-link href="${readme}">${state}</d2l-link>`
		: html`<div class="d2l-component-catalog-status-table-text">${state}</div>`;
	return stateText;
}

export class ComponentCatalogStatusTable extends LitElement {
	static get properties() {
		return {
			_filter: { type: String }
		};
	}

	static get styles() {
		return [tableStyles, css`
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
			.d2l-component-catalog-status-table-text {
				display: inline-block;
			}
		`];
	}

	constructor() {
		super();

		this.components = [];
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);

		this.shadowRoot.querySelector('d2l-input-search').addEventListener('d2l-input-search-searched', (e) => {
			this._filter = e.detail.value;
		});
	}

	render() {
		const rows = components.map(component => {
			const devState = _getStateMessage(component.development, component.repo);
			const designState = _getStateMessage(component.design, component.designDoc);
			return html`
		 		<d2l-tr>
		 			<d2l-td><d2l-link href="${component.issueUrl}">${component.name}</d2l-link></d2l-td>
		 			<d2l-td>${devState}</d2l-td>
		 			<d2l-td>${designState}</d2l-td>
		 		</d2l-tr>
			`;
		});
		return html`
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
customElements.define('d2l-component-catalog-status-table', ComponentCatalogStatusTable);
