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
import { validTypes } from './utils.mjs';

export class ComponentCatalogDemoTables extends LitElement {
	static get properties() {
		return {
			defaults: { type: String },
			hideOtherTables: { type: Boolean, attribute: 'hide-other-tables', reflect: true },
			interactive: { type: Boolean },
			tagName: { type: String, attribute: 'tag-name', reflect: true },
			_componentInfo: { type: Object },
			_defaults: { type: Object }
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
	constructor() {
		super();
		this.hideOtherTables = false;
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);

		this._componentInfo = components.find((component) =>  component.name === this.tagName);

		if (this._componentInfo && this._componentInfo.attributes) {
			this._componentInfo.attributes.sort((a, b) => {
				if (a.description && a.description.includes('REQUIRED:')) {
					if (b.description && b.description.includes('REQUIRED:')) {
						if (a.name < b.name) return -1;
						else if (a.name > b.name) return 1;
						else return 0;
					} else {
						return -1;
					}
				}
				else if (b.description && b.description.includes('REQUIRED:')) return 1;
				else if (a.name < b.name) return -1;
				else if (b.name < a.name) return 1;
				else return 0;
			});
		}

		this._defaults = this.defaults ? JSON.parse(this.defaults) : {};
	}

	render() {
		if (!this._componentInfo) return;

		const rows = this._componentInfo.attributes.map((info) => {
			const infoDefault = info.default ? info.default.replace(/\\"/g, '') : null;
			let demoType = info.type;
			let demoValue = null;
			let initialValue = infoDefault;

			if (info.type && info.type.includes('|')) {
				demoType = info.type.replace(/\|/g, ' | ');
			}

			if (this.interactive) {
				if (Object.values(validTypes).includes(demoType)) {
					const defaultForName = this._defaults[info.name];
					if (defaultForName) initialValue = info.type !== 'string' ? `"${defaultForName}"` : defaultForName;
					else initialValue = infoDefault;
				}

				demoValue = this._getDemoValueOptions(demoType, info.name, initialValue);

			}

			const demoValueRow = this.interactive ? html`<td>${demoValue}</td>` : null;
			const defaultShown = infoDefault ? infoDefault.replace(/'/g, '') : undefined;

			return html`
				<tr>
					<th scope="row"><span class="d2l-property-name">${info.name}</span></th>
					<td class="d2l-design-system-component-type">${demoType}</td>
					<td>${info.description}</td>
					<td>${defaultShown}</td>
					${demoValueRow}
				</tr>`;
		});

		const slotRows = this._componentInfo.slots ? this._componentInfo.slots.map((slotInfo) => {
			return html`
				<tr>
					<th scope="row"><span class="d2l-property-name">${slotInfo.name || 'Default'}</span></th>
					<td class="d2l-design-system-component-type">${slotInfo.description}</td>
				</tr>
			`;
		}) : null;

		const eventRows = this._componentInfo.events ? this._componentInfo.events.map((info) => {
			return html`
				<tr>
					<th scope="row"><span class="d2l-property-name">${info.name}</span></th>
					<td class="d2l-design-system-component-type">${info.description}</td>
				</tr>
			`;
		}) : null;

		const demoValueHeading = this.interactive ? html`<th>Demo Value</th>` : null;
		return html`
			<h3 class="d2l-heading-4">Properties</h3>
			<d2l-scroll-wrapper>
				<table class="d2l-cc-custom-table d2l-attribute-table">
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
			${!this.hideOtherTables && eventRows && eventRows.length ? html`<h3 class="d2l-heading-4">Events</h3>
				<d2l-scroll-wrapper>
					<table class="d2l-cc-custom-table d2l-component-info-table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							${eventRows}
						</tbody>
					</table>
				</d2l-scroll-wrapper>` : null}

			${!this.hideOtherTables && slotRows && slotRows.length ? html`<h3 class="d2l-heading-4">Slots</h3>
				<d2l-scroll-wrapper>
					<table class="d2l-cc-custom-table d2l-component-info-table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							${slotRows}
						</tbody>
					</table>
				</d2l-scroll-wrapper>` : null}`;
	}

	_dispatchChangeEvent(details) {
		this.dispatchEvent(new CustomEvent(
			'property-change',
			{ bubbles: true, composed: false, detail: details }
		));
	}

	_getDemoValueOptions(type, attributeName, defaultVal) {
		if (!type) return;
		let strippedDefaultVal = defaultVal?.replace(/"/g, '').replace(/'/g, '');
		let value = defaultVal ? strippedDefaultVal : undefined;
		switch (type) {
			case validTypes.array:
			case validTypes.object:
				return;
			case validTypes.boolean:
				return html`
					<d2l-switch
						@change="${this._onSwitchChange}"
						data-name="${attributeName}"
						?on="${value === 'true'}"
						text="${attributeName}"
						text-position="hidden">
					</d2l-switch>`;
			case validTypes.number:
				return html`
					<d2l-input-number
						@change="${this._onNumberChange}"
						data-name="${attributeName}"
						label="${attributeName}"
						label-hidden
						value="${ifDefined(value)}">
					</d2l-input-number>`;
			case validTypes.string:
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
				if (strippedDefaultVal === undefined) {
					strippedDefaultVal = '';
					value = '';
				}

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
		const value = type === validTypes.boolean ? e.target.hasAttribute('on') : e.target.value;
		return {
			name: e.target.getAttribute('data-name'),
			type: type,
			value
		};
	}
	_onNumberChange(e) {
		const eventDetails = this._getEventDetails(e, validTypes.number);
		this._dispatchChangeEvent(eventDetails);
	}

	_onSelectChange(e) {
		const eventDetails = this._getEventDetails(e, validTypes.string);
		this._dispatchChangeEvent(eventDetails);
	}

	_onStringChange(e) {
		const eventDetails = this._getEventDetails(e, validTypes.string);
		this._dispatchChangeEvent(eventDetails);
	}

	_onSwitchChange(e) {
		const eventDetails = this._getEventDetails(e, validTypes.boolean);
		this._dispatchChangeEvent(eventDetails);
	}

}
customElements.define('d2l-component-catalog-demo-tables', ComponentCatalogDemoTables);
