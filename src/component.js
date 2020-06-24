import 'd2l-table/d2l-table.js';
import { css, html, LitElement } from 'lit-element';
import { heading2Styles, heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { default as components } from '../data/component-doc-details.js';
import { tableStyles } from './table-styles.js';

function _getTable(componentInformation, title, hasTypeAndDefault) {
	const rows = componentInformation.map((info) => {
		const infoDefault = info.default ? info.default.replace(/\\"/g, '') : null;
		const infoType = info.type ? info.type.replace(/\(/g, '').replace(/\)/g, '').replace(/\|/g, ', ') : null;
		const typeDefaultRows = hasTypeAndDefault ? html`
				<d2l-td>${infoType}</d2l-td>
				<d2l-td>${infoDefault}</d2l-td>`
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
			tagName: { type: String, attribute: 'tag-name', reflect: true }
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

	render() {

		const componentInfo = components.find((component) =>  component.name === this.tagName);
		if (!componentInfo) {
			// TODO: create a 404 view that we can return
			console.error(`Could not find component ${this.tagName}`);
			return;
		}

		const description = componentInfo.description ? html`<h2 class="d2l-heading-4">Description</h2><div>${componentInfo.description}</div>` : null;
		const attributes = componentInfo.attributes ? _getTable(componentInfo.attributes, 'Attributes', true) : null;
		const events = componentInfo.events ? _getTable(componentInfo.events, 'Events') : null;
		const slots = componentInfo.slots ? _getTable(componentInfo.slots, 'Slots') : null;

		return html`
			<h1 class="d2l-heading-2">${componentInfo.name}</h1>
			${description}
			${attributes}
			${events}
			${slots}
		`;
	}

}
customElements.define('d2l-design-system-component', DesignSystemComponent);
