import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { linkStyles } from '@brightspace-ui/core/components/link/link.js';

class ComponentCatalogNavigation extends LitElement {

	static get properties() {
		return {
			navItems: { type: String, attribute: 'nav-items' },
			pageUrl: { type: String, attribute: 'page-url' },
			_navItems: { type: Object }
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
			.d2l-component-catalog-hidden {
				display: none;
			}
			nav {
				margin-right: 1rem;
				padding-top: 0.5rem;
			}
			ul {
				padding-left: 0;
			}
			li {
				list-style-type: none;
				margin-top: 1rem;
			}
			li a {
				display: block;
				padding-left: 1rem;
			}
			ul ul li {
				margin-left: 1rem;
				margin-top: 0.6rem;
			}
			ul ul ul li {
				margin-left: 0.5rem;
				margin-top: 0.5rem;
			}
			a.d2l-component-catalog-link-large {
				font-size: 1.1rem;
			}
			a.d2l-component-catalog-child-selected.d2l-component-catalog-link-large:not(.d2l-component-catalog-link-selected) {
				font-weight: 700;
			}
			a.d2l-component-catalog-child-selected.d2l-component-catalog-link-medium:not(.d2l-component-catalog-link-selected) {
				background-color: var(--d2l-color-celestine-plus-2);
				color: var(--d2l-color-celestine-minus-1);
			}
			a.d2l-link:not(.d2l-component-catalog-link-selected) {
				color: var(--d2l-color-tungsten);
			}
			a.d2l-component-catalog-link-selected {
				color: var(--d2l-color-celestine);
			}
		`];
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);
		this._navItems = JSON.parse(this.navItems);
	}

	render() {
		const listContent = this._navItems ? this._navItems.map((item) => {
			return this._generateList(item, 'large');
		}) : null;
		return html`
			<nav aria-label="Main">
				<ul>${listContent}</ul>
			</nav>
		`;
	}

	_generateList(entry, size, isComponentsGrandchildren) {
		let children = null;
		let isVisible = this.pageUrl.includes(entry.url);
		const isComponents = this.pageUrl.includes('components');
		if (entry.children && entry.children.length > 0) {
			if (isComponents && isComponentsGrandchildren) {
				entry.children.sort((a, b) => {
					if (a.title < b.title) return -1;
					else if (a.title > b.title) return 1;
					else return 0;
				});
			}
			const childLists = entry.children.map((child) => {
				if (child.url === this.pageUrl) isVisible = true;
				const newSize = size === 'large' ? 'medium' : 'small';
				return this._generateList(child, newSize, isComponents);
			});
			children = html`<ul ?hidden="${!isVisible}">${childLists}</ul>`;
		}

		const linkClasses = {
			'd2l-link': true,
			'd2l-link-small': size === 'small',
			'd2l-component-catalog-child-selected': isVisible,
			'd2l-component-catalog-link-medium': size === 'medium',
			'd2l-component-catalog-link-large': size === 'large',
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
