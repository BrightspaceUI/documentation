import './component.js';
import './component-list.js';
import './welcome.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import { css, html, LitElement } from 'lit-element';
import { findItemFromPath, getItemPath, siteStructure } from '../data/structure.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { linkStyles } from '@brightspace-ui/core/components/link/link.js';
import page from 'page';

function buildSidebarItem(item, parents, currentPath) {

	function onSidebarLinkClick(e) {
		page(e.target.getAttribute('href'));
		e.preventDefault();
	}

	parents.push(item);

	const itemPath = getItemPath(item);
	const selected = `${currentPath}/`.indexOf(`${itemPath.realPath}/`) === 0;

	let link = null;
	if (parents.length === 1) {
		link = html`<d2l-link @click="${onSidebarLinkClick}" href="${itemPath.path}">${item.name}</d2l-link>`;
	} else {
		const classes = {
			'd2l-link': true,
			'd2l-link-small': true,
			'd2l-design-system-link-selected': selected
		};
		link = html`<a @click="${onSidebarLinkClick}" class="${classMap(classes)}" href="${itemPath.path}">${item.name}</a>`;
	}

	let children = null;
	if (item.children && item.children.length > 0) {
		if (parents.length === 1) {
			children = html`<ul ?hidden="${!selected}">
				${item.children.map(child => buildSidebarItem(child, parents, currentPath))}
			</ul>`;
		} else if (parents.length === 2) {
			link = html`<d2l-link @click="${onSidebarLinkClick}" small href="${itemPath.path}">
					<d2l-icon icon="tier1:arrow-expand-small" ?hidden="${selected}"></d2l-icon>
					<d2l-icon icon="tier1:arrow-collapse-small" ?hidden="${!selected}"></d2l-icon>
					${item.name}
				</d2l-link>`;
			children = html`<ul ?hidden="${!selected}">
				${item.children.map(child => buildSidebarItem(child, parents, currentPath))}
			</ul>`;
		}
	}

	parents.pop();

	return html`
		<li>${link}${children}</li>
	`;
}

export class DesignSystem extends LitElement {
	static get properties() {
		return {
			_currentPath: { type: String, attribute: false }
		};
	}

	static get styles() {
		return [linkStyles, css`
			header {
				align-items: center;
				background-color: white;
				box-shadow: rgba(0, 0, 0, 0.22) 0px 0px 3px 0px;
				display: flex;
				height: 4.5rem;
				padding-left: 4rem;
				position: sticky;
				top: 0;
				z-index: 1000;
			}

			main {
				display: flex;
				min-height: calc(100vh - 4.5rem);
			}

			.d2l-design-system-side-nav {
				background: linear-gradient(to right, #FFFFFF, #F9FAFB);
				border-right: 1px solid #e6eaf0;
				flex: 0 0 22%;
				padding-top: 1.5rem;
			}

			nav {
				height: calc(100vh - 4.5rem);
				overflow-y: scroll;
			}

			.d2l-design-system-main {
				background-color: white;
				flex: 1 1 auto;
				padding: 2rem 1.5rem;
			}

			ul {
				padding-left: 4rem;
			}

			li {
				list-style-type: none;
				padding-bottom: 1rem;
			}

			.d2l-link.d2l-design-system-link-selected {
				border-left: 4px solid var(--d2l-color-celestine-minus-1);
				color: var(--d2l-color-celestine-minus-1);
				padding: 0.15rem 0 0.15rem 0.3rem;
			}

			ul ul {
				padding-left: 0.8rem;
			}

			ul ul li {
				padding-bottom: 0.2rem;
			}

			ul ul li.d2l-design-system-nested {
				margin-left: -1.1rem;
			}

			ul ul li ul {
				padding-left: 1.6rem;
			}

			d2l-link d2l-icon {
				color: var(--d2l-color-celestine);
				margin-bottom: 0.25rem;
			}
		`];
	}

	constructor() {
		super();
		this._installRoutes();
	}

	render() {
		return html`
			<header>
				<div>
					Brightspace Component Design System
				</div>
			</header>
			<main>
				<div class="d2l-design-system-side-nav">
					<nav aria-label="Component Information">
						<ul>
							${siteStructure.map((item) => buildSidebarItem(item, [], this._currentPath))}
						</ul>
					</nav>
				</div>
				<div class="d2l-design-system-main">
					${this._renderCurrentView()}
				</div>
			</main>
		`;
	}

	_installRoutes() {
		page.base('/components');
		page.redirect('/', '/welcome');
		page('*', (context) => this._currentPath = context.canonicalPath);
		page();
	}

	_renderCurrentView() {
		const currentItem = findItemFromPath(this._currentPath);
		if (currentItem.type === 'component') {
			return html`<d2l-design-system-component tag-name="${currentItem.data.tagName}"></d2l-design-system-component>`;
		}
		if (this._currentPath === '/components/component-status') {
			return html`<d2l-design-system-component-list></d2l-design-system-component-list>`;
		}
		return html`<d2l-design-system-welcome></d2l-design-system-welcome>`;
	}

}
customElements.define('d2l-design-system', DesignSystem);
