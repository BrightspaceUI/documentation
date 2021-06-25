import '@brightspace-ui/core/components/inputs/input-number.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import '@brightspace-ui/core/components/scroll-wrapper/scroll-wrapper.js';
import '@brightspace-ui/core/components/switch/switch.js';
import { css, html, LitElement } from 'lit-element';
import { default as components } from '../../.generated/custom-elements-all.js';
import { customTableStyles } from './table-style.js';
import { heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
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
			interactive: { type: Boolean },
			tagName: { type: String, attribute: 'tag-name', reflect: true }
		};
	}
	static get styles() {
		return [heading4Styles, selectStyles, customTableStyles, css`
			:host {

				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-property-name {
				background-color: var(--d2l-color-amethyst-plus-2);
				border-radius: 0.3rem;
				font-size: 0.7rem;
				padding: 0.1rem 0.2rem;
			}
			h2.d2l-heading-4 {
				margin-bottom: 0.5rem;
			}
		`];
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
			const demoValueRow = this.interactive ? html`<td>${demoValue}</td>` : null;
			return html`
				<tr>
					<th scope="row"><span class="d2l-property-name">${info.name}</span></th>
					<td class="d2l-design-system-component-type">${demoType}</td>
					<td>${info.description}</td>
					<td>${infoDefault}</td>
					${demoValueRow}
				</tr>
			`;
		});
		const demoValueHeading = this.interactive ? html`<th>Demo Value</th>` : null;
		return html`
			<h3 class="d2l-heading-4">Properties</h3>
			<d2l-scroll-wrapper>
				<table class="d2l-attribute-table">
					<thead>
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
							<th>Default</th>
							${demoValueHeading}
						</tr>
					</thead>
					<tbody>
						${rows}
					</tbody>
				</table>
			</d2l-scroll-wrapper>
		`;
	}

	_dispatchChangeEvent(details) {
		this.dispatchEvent(new CustomEvent(
			'property-change',
			{ bubbles: true, composed: false, detail: details }
		));
	}

	_getDemoValueOptions(type, attributeName, defaultVal) {
		const strippedDefaultVal = defaultVal?.replace(/"/g, '');
		const value = defaultVal ? strippedDefaultVal : undefined;
		switch (type) {
			case 'array':
			case 'object':
				return;
			case 'boolean':
				return html`
					<d2l-switch
						@change="${this._onSwitchChange}"
						data-name="${attributeName}"
						?on="${value === 'true'}"
						text="${attributeName}"
						text-position="hidden">
					</d2l-switch>`;
			case 'number':
				return html`
					<d2l-input-number
						@change="${this._onNumberChange}"
						data-name="${attributeName}"
						label="${attributeName}"
						label-hidden
						value="${ifDefined(value)}">
					</d2l-input-number>`;
			case 'string':
				return html`
					<d2l-input-text
						@change="${this._onStringChange}"
						data-name="${attributeName}"
						label="${attributeName}"
						label-hidden
						value="${ifDefined(value)}">
					</d2l-input-text>`;
			default: {
				// the case of an array of strings
				let options = type.replace(/'/g, '').split(' | ');

				// Add empty default values to the dropdown lists
				if (!options.includes(strippedDefaultVal)) {
					options = [strippedDefaultVal, ...options];
				}
				const optsHtml = options.map(opt => html`<option ?selected="${value === opt}">${opt}</option>`);

				return html`
					<select
						aria-label="Valid values"
						@change="${this._onSelectChange}"
						class="d2l-input-select"
						data-name="${attributeName}">
						${optsHtml}
					</select>`;
			}
		}
	}
	_getEventDetails(e, type) {
		const value = type === 'Boolean' ? e.target.hasAttribute('on') : e.target.value;
		return {
			name: e.target.getAttribute('data-name'),
			type: type,
			value
		};
	}
	_onNumberChange(e) {
		const eventDetails = this._getEventDetails(e, 'Number');
		this._dispatchChangeEvent(eventDetails);
	}

	_onSelectChange(e) {
		const eventDetails = this._getEventDetails(e, 'String');
		this._dispatchChangeEvent(eventDetails);
	}

	_onStringChange(e) {
		const eventDetails = this._getEventDetails(e, 'String');
		this._dispatchChangeEvent(eventDetails);
	}

	_onSwitchChange(e) {
		const eventDetails = this._getEventDetails(e, 'Boolean');
		this._dispatchChangeEvent(eventDetails);
	}

}
customElements.define('d2l-component-catalog-demo-attribute-table', ComponentCatalogDemoAttributeTable);
