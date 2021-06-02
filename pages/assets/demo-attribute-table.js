import '@brightspace-ui/core/components/inputs/input-text.js';
import '@brightspace-ui/core/components/switch/switch.js';
// import 'd2l-table/d2l-table.js';
import { css, html, LitElement } from 'lit-element';
import { default as components } from '../../.generated/custom-elements-all.js';
import { heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
// import { tableStyles } from './table-styles.js';

const validTypes = [
	'array',
	'boolean',
	'number',
	'object',
	'string'
];

export class ComponentCatalogDemoAttributeTable extends LitElement {
	static get properties() {
		return {
			tagName: { type: String, attribute: 'tag-name', reflect: true }
		};
	}

	static get styles() {
		return [heading4Styles, selectStyles, tableStyles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			d2l-td.d2l-table-cell-first,
			d2l-td.d2l-design-system-component-type {
				white-space: nowrap;
			}
			d2l-td d2l-input-text {
				min-width: 200px;
			}
			h2.d2l-heading-4 {
				margin-bottom: 0.5rem;
			}
		`];
	}

	constructor() {
		super();
		this.hideDemo = false;
	}

	render() {
		const componentInfo = components.find((component) =>  component.name === this.tagName);
		if (!componentInfo) return;

		const rows = componentInfo.attributes.map((info) => {
			const infoDefault = info.default ? info.default.replace(/\\"/g, '') : null;
			let demoType = info.type;
			let demoValue = null;

			if (info.type && info.type.includes('|')) {
				demoType = info.type.replace(/\|/g, ' | ');
				demoValue = this._getDemoValueOptions(demoType, info.name, infoDefault);
			} else {
				demoValue = validTypes.includes(demoType) ? this._getDemoValueOptions(demoType, info.name, infoDefault) : null;
			}
			const demoValueRow = !this.hideDemo ? html`<d2l-td>${demoValue}</d2l-td>` : null;
			return html`
				<d2l-tr>
					<d2l-td>${info.name}</d2l-td>
					<d2l-td>${info.description}</d2l-td>
					<d2l-td class="d2l-design-system-component-type">${demoType}</d2l-td>
					<d2l-td>${infoDefault}</d2l-td>
					${demoValueRow}
				</d2l-tr>
			`;
		});
		const demoValueHeading = !this.hideDemo ? html`<d2l-th>Demo Value</d2l-th>` : null;
		return html`
			<h2 class="d2l-heading-4">Attributes</h2>
			<d2l-table class="d2l-table">
				<d2l-thead>
					<d2l-tr>
						<d2l-th>Name</d2l-th>
						<d2l-th>Description</d2l-th>
						<d2l-th>Type</d2l-th>
						<d2l-th>Default</d2l-th>
						${demoValueHeading}
					</d2l-tr>
				</d2l-thead>
				<d2l-tbody>
					${rows}
				</d2l-tbody>
			</d2l-table>
		`;
	}

	_dispatchChangeEvent(details) {
		this.dispatchEvent(new CustomEvent(
			'change',
			{ bubbles: true, composed: false, detail: details }
		));
	}

	_getDemoValueOptions(type, attributeName, defaultVal) {
		const value = defaultVal ? defaultVal.replace(/"/g, '') : undefined;
		switch (type) {
			case 'array':
			case 'object':
				return '';
			case 'boolean':
				return html`
					<d2l-switch
						@change="${this._onSwitchChange}"
						data-name="${attributeName}"
						?on="${value === 'true'}"
						text="${attributeName}"
						text-position="hidden">
					</d2l-switch>
				`;
			case 'number':
				return html`
					<d2l-input-text
						@change="${this._onNumberChange}"
						data-name="${attributeName}"
						label="${attributeName}"
						label-hidden
						value="${ifDefined(value)}">
					</d2l-input-text>
				`;
			case 'string':
				return html`
					<d2l-input-text
						@change="${this._onStringChange}"
						data-name="${attributeName}"
						label="${attributeName}"
						label-hidden
						value="${ifDefined(value)}">
					</d2l-input-text>
				`;
			default: {
				// the case of an array of strings
				const optsHtml = type.replace(/'/g, '').split(' | ').map(opt => html`<option ?selected="${value === opt}">${opt}</option>`);
				return html`
					<select
						aria-label="Valid values"
						@change="${this._onSelectChange}"
						class="d2l-input-select"
						data-name="${attributeName}">
						${optsHtml}
					</select>
				`;
			}
		}
	}

	_onNumberChange(e) {
		const eventDetails = {
			name: e.target.getAttribute('data-name'),
			type: 'Number',
			value: e.target.value
		};
		this._dispatchChangeEvent(eventDetails);
	}

	_onSelectChange(e) {
		const eventDetails = {
			name: e.target.getAttribute('data-name'),
			type: 'String',
			value: e.target.value
		};
		this._dispatchChangeEvent(eventDetails);
	}

	_onStringChange(e) {
		const eventDetails = {
			name: e.target.getAttribute('data-name'),
			type: 'String',
			value: e.target.value
		};
		this._dispatchChangeEvent(eventDetails);
	}

	_onSwitchChange(e) {
		const eventDetails = {
			name: e.target.getAttribute('data-name'),
			type: 'Boolean',
			value: e.target.hasAttribute('on')
		};
		this._dispatchChangeEvent(eventDetails);
	}

}
customElements.define('d2l-component-catalog-demo-attribute-table', ComponentCatalogDemoAttributeTable);