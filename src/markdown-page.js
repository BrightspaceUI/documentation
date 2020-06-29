import './interactive-demo.js';
import { css, html, LitElement } from 'lit-element';
import {loadPage} from '../.generated/pages/pageLoader.js';
import { tableStyles } from './table-styles.js';

export class DesignSystemMarkdownPage extends LitElement {

	static get properties() {
		return {
			path: {
				type: String,
				reflect: true
			},
			_val: {
				type: Object,
				attribute: false
			}
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
		`];
	}

	render() {
		return html`
			${this._val}
		`;
	}

	async updated(changedProperties) {
		if (!changedProperties.has('path')) return;
		const path = `/${this.path.replace('.md', '.js')}`;
		const page = await loadPage(path);
		if (page === undefined) {
			console.error(`Unable to load static page: "${path}"`);
			return;
		}
		this._val = page.val;
	}

}
customElements.define('d2l-design-system-markdown-page', DesignSystemMarkdownPage);
