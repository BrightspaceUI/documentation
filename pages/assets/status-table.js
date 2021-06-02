import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/link/link.js';
import { CC_STATES, DEV_STATES } from '../../tools/states.mjs';
import { css, html, LitElement } from 'lit-element';
import { default as components } from '../../.generated/component-issue-data.js';
import { tableStyles } from '@brightspace-ui/core/components/table/table-wrapper.js';

function getStatus(devStatus) {
	if (devStatus === DEV_STATES.COMPLETE) {
		return html`
			<div class="d2l-component-catalog-status-table-stable">
				<d2l-icon icon="tier1:check" style="color: var(--d2l-color-olivine);"></d2l-icon>
				${CC_STATES.STABLE}
			</div>`;
	} else if (devStatus === DEV_STATES.IN_PROGRESS) {
		return CC_STATES.IN_DEVELOPMENT;
	} else if (devStatus === DEV_STATES.BACKLOG) {
		return CC_STATES.BACKLOG;
	} else if (devStatus === DEV_STATES.DEPRECATED) {
		return CC_STATES.DEPRECATED;
	} else {
		return CC_STATES.NOT_PLANNED;
	}
}

class ComponentCatalogStatusTable extends LitElement {

	static get properties() {
		return {
			type: { type: String },
			_components: { type: Array }
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
			d2l-table-wrapper {
				padding-top: 1rem;
			}
			.d2l-component-catalog-status-table-stable {
				align-items: center;
				color: var(--d2l-color-olivine);
				display: flex;
			}
			.d2l-component-catalog-status-table-stable d2l-icon {
				padding-right: 0.25rem;
			}
			.d2l-component-catalog-status-table-name {
				align-items: center;
				display: flex;
			}
			.d2l-component-catalog-status-table-name img {
				padding-left: 0.5rem;
			}
		`];
	}

	constructor() {
		super();

		this._components = [];
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);

		if (!this.type) return;

		this._components = components[this.type];
		this._components.sort((a, b) => {
			if (a.name < b.name) return -1;
			else if (a.name > b.name) return 1;
			else return 0;
		});
	}

	render() {
		if (!this._components || this._components.length === 0) return html`<div>There are currently no components of this type.</div>`;

		const rows = this._components.map(component => {
			const linkHref = component.fileName ? `../${component.fileName}.html` : component.issueUrl;
			const name = this.type === 'official'
				? html`<d2l-link href="${linkHref}">${component.name}</d2l-link>`
				: html `<d2l-link class="d2l-component-catalog-status-table-name" href="${linkHref}">${component.name}<img src="/img/${this.type}-icon.svg" alt="${this.type} icon"></d2l-link>`;

			const status = getStatus(component.development);
			const owner = component.owner && component.owner.includes('#')
				? html`<d2l-link href="https://d2l.slack.com/messages/${component.owner}">${component.owner}</d2l-link>`
				: component.owner;
			return html`
				<tr>
					<td>${name}</td>
					<td>${status}</td>
					<td>${owner}</td>
				</tr>
			`;
		});

		return html`
			<d2l-table-wrapper>
				<table class="d2l-table">
					<thead>
						<th>Component</th>
						<th>Status</th>
						<th>Questions?</th>
					</thead>
					<tbody>
						${rows}
					</tbody>
				</table>
			</d2l-table-wrapper>
		`;
	}
}
customElements.define('d2l-component-catalog-status-table', ComponentCatalogStatusTable);
