import { css, html, LitElement } from 'lit-element';
import { tableStyles } from '@brightspace-ui/core/components/table/table-wrapper.js';

/**
 * @slot - a table (e.g., <table><tableContent /></table>)
 */
class ComponentCatalogTable extends LitElement {

	static get styles() {
		return [tableStyles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`];
	}

	render() {
		return html`
			<d2l-table-wrapper>
				<table class="d2l-table">
					<slot @slotchange="${this._getTableContent}"></slot>
				</table>
			</d2l-table-wrapper>
		`;
	}

	_getTableContent(e) {
		if (!e.target) return;
		const slotContent = e.target.assignedNodes({ flatten: true })[0];
		if (!slotContent) return;
		const table = this.shadowRoot.querySelector('table.d2l-table');
		table.append(...slotContent.childNodes);
	}

}
customElements.define('d2l-component-catalog-table', ComponentCatalogTable);
