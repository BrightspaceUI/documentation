import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { linkStyles } from '@brightspace-ui/core/components/link/link.js';

class ComponentCatalogNavigation extends LitElement {

	static get properties() {
		return {
			navItems: { type: String, attribute: 'nav-items' },
			pageUrl: { type: String, attribute: 'page-url' },
			_navItems: { type: Object },
			_page: { type: Object }
		};
	}

	static get styles() {
		return [linkStyles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			nav {
				margin-top: 1.5rem;
				padding-right: 1rem;
			}
			li {
				list-style-type: none;
				padding-top: 0.75rem;
			}
			a.d2l-link:not(.d2l-component-catalog-link-selected) {
				color: var(--d2l-color-tungsten);
			}
			a.d2l-component-catalog-link-selected {
				color: var(--d2l-color-celestine);
			}
			ul {
				padding-left: 1.25rem;
			}
			ul ul {
				padding-left: 0.75rem;
			}
			ul li {
				padding-top: 0.5rem;
			}
			ul ul ul li {
				padding-top: 0;
			}
			.d2l-component-catalog-hidden {
				display: none;
			}
		`];
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);
		this._navItems = JSON.parse(this.navItems);
	}

	render() {
		const listContent = this._navItems ? this._navItems.map((item) => {
			return this._generateList(item, 'main', true);
		}) : null;
		return html`
			<nav aria-label="Main">
				<ul>${listContent}</ul>
			</nav>
		`;
	}

	_generateList(entry, size) {
		let children = null;
		let isVisible = this.pageUrl.includes(entry.url);
		if (entry.children && entry.children.length > 0) {
			const childLists = entry.children.map((child) => {
				if (child.url === this.pageUrl) isVisible = true;
				const newSize = size === 'main' ? '' : 'small';
				return this._generateList(child, newSize);
			});
			children = html`<ul ?hidden="${!isVisible}">${childLists}</ul>`;
		}

		const linkClasses = {
			'd2l-link': true,
			'd2l-link-main': size === 'main',
			'd2l-link-small': size === 'small',
			'd2l-component-catalog-link-selected': entry.url === this.pageUrl
		};
		return html`
			<li>
				<a href="${entry.url}" class="${classMap(linkClasses)}">${entry.title}</a>
				${children}
			</li>
		`;
	}

}
customElements.define('d2l-component-catalog-navigation', ComponentCatalogNavigation);
