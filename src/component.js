import '@brightspace-ui/core/components/inputs/input-text.js';
import '@brightspace-ui/core/components/switch/switch.js';
import 'd2l-table/d2l-table.js';
import { css, html, LitElement } from 'lit-element';
import { heading2Styles, heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { default as components } from '../data/component-doc-details.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { inputLabelStyles } from '@brightspace-ui/core/components/inputs/input-label-styles.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { tableStyles } from './table-styles.js';

function _getAttributesTable(componentInformation, title, changeFunc) {
	const stringValidValuesRe = /\(('.*?'\|?)\)/;
	const validTypes = [
		'array',
		'boolean',
		'number',
		'object',
		'string'
	];

	const rows = componentInformation.map((info) => {
		const infoDefault = info.default ? info.default.replace(/\\"/g, '') : null;
		const match = info.type ? info.type.match(stringValidValuesRe) : null;
		let demoType = info.type;
		let displayedType = info.type;
		if (match && match.length === 2) {
			demoType = match[1];
			displayedType = 'string';
		}
		const demoValue = validTypes.includes(displayedType) ? _getDemoValueOptions(demoType, info.name, changeFunc, infoDefault) : null;
		return html`
			<d2l-tr>
				<d2l-td>${info.name}</d2l-td>
				<d2l-td>${info.description}</d2l-td>
				<d2l-td>${displayedType}</d2l-td>
				<d2l-td>${infoDefault}</d2l-td>
				<d2l-td>${demoValue}</d2l-td>
			</d2l-tr>
		`;
	});
	return html`
		<h2 class="d2l-heading-4">${title}</h2>
		<d2l-table class="d2l-table">
			<d2l-thead>
				<d2l-tr>
					<d2l-th>Name</d2l-th>
					<d2l-th>Description</d2l-th>
					<d2l-th>Type</d2l-th>
					<d2l-th>Default</d2l-th>
					<d2l-th>Demo Value</d2l-th>
				</d2l-tr>
			</d2l-thead>
			<d2l-tbody>
				${rows}
			</d2l-tbody>
		</d2l-table>
	`;
}

function _getDemoValueOptions(type, attributeName, changeFunc, defaultVal) {
	const value = defaultVal ? defaultVal.replace(/"/g, '') : undefined;
	switch (type) {
		case 'array':
		case 'object':
			return '';
		case 'boolean':
			return html`
				<d2l-switch
					@change="${changeFunc}"
					data-name="${attributeName}"
					?on="${value === 'true'}"
					text="${attributeName}"
					text-position="hidden">
				</d2l-switch>
			`;
		case 'number':
		case 'string':
			return html`
				<d2l-input-text
					@change="${changeFunc}"
					data-name="${attributeName}"
					label="${attributeName}"
					label-hidden
					value="${ifDefined(value)}">
				</d2l-input-text>
			`;
		default: {
			// the case of an array of strings
			const optsHtml = type.replace(/'/g, '').split('|').map(opt => html`<option>${opt}</option>`);
			return html`
				<label>
					<span class="d2l-input-label">Valid string values</span>
					<select
						@change="${changeFunc}"
						class="d2l-input-select"
						data-name="${attributeName}"
						type="select">
						${optsHtml}
					</select>
				</label>
			`;
		}
	}
}

function _getTable(componentInformation, title) {
	const rows = componentInformation.map((info) => {
		return html`
			<d2l-tr>
				<d2l-td>${info.name}</d2l-td>
				<d2l-td>${info.description}</d2l-td>
			</d2l-tr>
		`;
	});
	return html`
		<h2 class="d2l-heading-4">${title}</h2>
		<d2l-table class="d2l-table">
			<d2l-thead>
				<d2l-tr>
					<d2l-th>Name</d2l-th>
					<d2l-th>Description</d2l-th>
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
		return [heading2Styles, heading4Styles, inputLabelStyles, selectStyles, tableStyles, css`
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

			d2l-td.d2l-table-cell-first {
				white-space: nowrap;
			}

			d2l-td d2l-input-text {
				min-width: 200px;
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
		const attributes = componentInfo.attributes ? _getAttributesTable(componentInfo.attributes, 'Attributes', this._onChange) : null;
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

	_onChange(e) {
		const attributeName = e.target.getAttribute('data-name');
		const attributeValue = e.target.value || e.target.hasAttribute('on');
		console.warn(`ATTRIBUTE CHANGE: name: ${attributeName}, value: ${attributeValue}`);
	}

}
customElements.define('d2l-design-system-component', DesignSystemComponent);
