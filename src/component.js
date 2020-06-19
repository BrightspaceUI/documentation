import 'd2l-table/d2l-table.js';
import { css, html, LitElement } from 'lit-element';
import { heading2Styles, heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { default as components } from '../data/component-doc-details.js';
import { tableStyles } from './table-styles.js';

function _getTable(componentInformation, title, hasTypeAndDefault) {
	const rows = componentInformation.map((info) => {
		const typeDefaultRows = hasTypeAndDefault ? html`
				<d2l-td>${info.type}</d2l-td>
				<d2l-td>${info.default}</d2l-td>`
			: null;
		return html`
			<d2l-tr>
				<d2l-td>${info.name}</d2l-td>
				<d2l-td>${info.description}</d2l-td>
				${typeDefaultRows}
			</d2l-tr>
		`;
	});
	const typeDefaultHeadings = hasTypeAndDefault ? html`
			<d2l-th>Type</d2l-th>
			<d2l-th>Default</d2l-th>`
		: null;
	return html`
		<h2 class="d2l-heading-4">${title}</h2>
		<d2l-table class="d2l-table">
			<d2l-thead>
				<d2l-tr>
					<d2l-th>Name</d2l-th>
					<d2l-th>Description</d2l-th>
					${typeDefaultHeadings}
				</d2l-tr>
			</d2l-thead>
			<d2l-tbody>
				${rows}
			</d2l-tbody>
		</d2l-table>
	`;
}

export class DesignSystemComponent extends LitElement {
	static get properties() {
		return {
			component: { type: String },
			_componentInfo: { type: Object },
			_componentName: { type: String }
		};
	}

	static get styles() {
		return [heading2Styles, heading4Styles, tableStyles, css`
			:host {
				display: block;
			}

			:host([hidden]) {
				display: none;
			}

			h1.d2l-heading-2 {
				margin-top: 0;
			}

			h2.d2l-heading-4 {
				margin-bottom: 0.3rem;
			}
		`];
	}

	constructor() {
		super();

		this.component = '';
		this._componentInfo = {};
	}

	render() {
		if (!this._componentInfo) return html`<h1 class="d2l-heading-2">${this._componentName}</h1>`;

		const description = this._componentInfo.description ? html`<h2 class="d2l-heading-4">Description:</h2><div>${this._componentInfo.description}</div>` : null;
		const attributes = this._componentInfo.attributes ? _getTable(this._componentInfo.attributes, 'Attributes', true) : null;
		const events = this._componentInfo.events ? _getTable(this._componentInfo.events, 'Events') : null;
		const slots = this._componentInfo.slots ? _getTable(this._componentInfo.slots, 'Slots') : null;

		return html`
			<h1 class="d2l-heading-2">${this._componentName}</h1>
			${description}
			${attributes}
			${events}
			${slots}
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		changedProperties.forEach((_, prop) => {
			if (prop === 'component') {
				const parsed = JSON.parse(this.component);
				this._componentName = parsed.name;
				const filtered = components.filter((component) =>  component.name === parsed.tag);
				this._componentInfo = filtered[0];
			}
		});
	}
}
customElements.define('d2l-design-system-component', DesignSystemComponent);
