import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import '@brightspace-ui/core/components/link/link.js';
import 'd2l-table/d2l-table.js';
import { bodySmallStyles, heading2Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element';
import { default as components } from '../data/components.js';
import { tableStyles } from './table-styles.js';

function _getStateMessage(componentStateInfo, readme) {
	let icon = 'tier1:important';
	switch (componentStateInfo.state) {
		case 'action':
			icon = 'tier1:important';
			break;
		case 'alert':
			icon = 'tier1:close-default';
			break;
		case 'success':
			icon = 'tier1:check';
			break;
	}
	const stateText = readme
		? html`<d2l-link small href="${readme}">${componentStateInfo.text}</d2l-link>`
		: html`<div class="d2l-body-small d2l-design-system-component-list-info-text">${componentStateInfo.text}</div>`;
	return html`<d2l-icon data-state="${componentStateInfo.state}" icon="${icon}"></d2l-icon>${stateText}`;
}

export class DesignSystemComponentList extends LitElement {
	static get properties() {
		return {
			_filter: { type: String }
		};
	}

	static get styles() {
		return [bodySmallStyles, heading2Styles, tableStyles, css`
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

			d2l-icon {
				padding-right: 0.3rem;
			}

			d2l-icon[data-state="action"] {
				color: var(--d2l-color-feedback-warning);
			}

			d2l-icon[data-state="alert"] {
				color: var(--d2l-color-feedback-error);
			}

			d2l-icon[data-state="default"] {
				color: var(--d2l-color-feedback-action);
			}

			d2l-icon[data-state="success"] {
				color: var(--d2l-color-feedback-success);
			}

			.d2l-design-system-component-list-info-text {
				display: inline-block;
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
			if (component.childComponents) {
				return component.childComponents.map((childComponent) => {
					const devState = _getStateMessage(childComponent.development, childComponent.readme);
					const designState = _getStateMessage(childComponent.design);
					return html`
						<d2l-tr>
							<d2l-td><d2l-link href="/components/${component.name}/${childComponent.tag}">${childComponent.name}</d2l-link></d2l-td>
							<d2l-td>${devState}</d2l-td>
							<d2l-td>${designState}</d2l-td>
						</d2l-tr>
					`;
				});
			} else {
				const devState = _getStateMessage(component.development, component.readme);
				const designState = _getStateMessage(component.design);
				return html`
					<d2l-tr>
						<d2l-td><d2l-link href="/components/${component.tag}">${component.name}</d2l-link></d2l-td>
						<d2l-td>${devState}</d2l-td>
						<d2l-td>${designState}</d2l-td>
					</d2l-tr>
				`;
			}
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
