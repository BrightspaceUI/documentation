import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/link/link.js';
import { css, html, LitElement } from 'lit-element';
import { default as components } from '../../.generated/component-issue-data.js';
import { tableStyles } from '@brightspace-ui/core/components/table/table-wrapper.js';

const DEV_DESIGN_STATES = {
	inProgress: 'In Progress',
	complete: 'Completed',
	notStarted: 'Not Started',
	backlog: 'Backlog',
	notPlanned: 'Not Planned'
};
const CC_STATES = {
	stable: 'Stable',
	inDev: 'In Development',
	backlog: 'On the Backlog',
	notPlanned: 'Not Planned'
};

function getStatus(devStatus, designStatus) {
	if (devStatus === DEV_DESIGN_STATES.complete && designStatus === DEV_DESIGN_STATES.complete)
		return html`
			<div class="d2l-component-catalog-stable">
				<d2l-icon icon="tier1:check" style="color: var(--d2l-color-olivine);"></d2l-icon>
				${CC_STATES.stable}
			</div>`;
	else if (devStatus === DEV_DESIGN_STATES.inProgress)
		return CC_STATES.inDev;
	else if (devStatus === DEV_DESIGN_STATES.backlog || designStatus === DEV_DESIGN_STATES.backlog)
		return CC_STATES.backlog;
	else
		return CC_STATES.notPlanned;
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
			.d2l-component-catalog-stable {
				align-items: center;
				color: var(--d2l-color-olivine);
				display: flex;
			}
			.d2l-component-catalog-stable d2l-icon {
				padding-right: 0.25rem;
			}
			d2l-table-wrapper {
				padding-top: 1rem;
			}
		`];
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
		if (!this._components) return html``;

		const rows = this._components.map(component => {
			const status = getStatus(component.development, component.design);
			const linkHref = component.pageUrl || component.issueUrl;
			return html`
				<tr>
					<td><d2l-link href="${linkHref}">${component.name}</d2l-link></td>
					<td>${status}</td>
					<td>${component.owner}</td>
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
