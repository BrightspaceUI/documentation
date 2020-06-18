import './component.js';
import './component-list.js';
import './welcome.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import { css, html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { default as components } from '../data/components.js';
import { linkStyles } from '@brightspace-ui/core/components/link/link.js';
import page from 'page';

export class DesignSystem extends LitElement {
	static get properties() {
		return {
			_categories: { type: Object },
			_component: { type: String },
			_currentView: { type: String },
			_shownCategory: { type: String },
			_shownComponent: { type: String },
			_shownNested: { type: String }
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
				padding-left: 4.5rem;
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
				flex: 0 1 24%;
				padding-top: 1.5rem;
			}

			nav {
				overflow-y: scroll;
				height: calc(100vh - 4.5rem);
			}

			.d2l-design-system-main {
				background-color: white;
				flex: 1 1 auto;
				padding: 2rem 1.5rem;
			}

			ul {
				padding-left: 4.5rem;
			}

			li {
				list-style-type: none;
				padding-bottom: 1rem;
			}

			.d2l-link.d2l-design-system-link-selected {
				border-left: 4px solid var(--d2l-color-celestine-minus-1);
				color: var(--d2l-color-celestine-minus-1);
				padding-left: 0.3rem;
				padding-bottom: 0.15rem;
				padding-top: 0.15rem;
			}

			ul ul {
				padding-left: 0.8rem;
			}

			ul ul li {
				padding-bottom: 0.2rem;
				padding-top: 0.1rem;
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
		this._component = '';
		this._currentView = 'welcome';
		this._shownCategory = '';
		this._shownComponent = '';
		this._shownNested = '';
		this._installRoutes();

		this._categories = {};
		components.forEach((component) => {
			if (!this._categories[component.type]) this._categories[component.type] = [];
			this._categories[component.type].push(component);
		});
	}

	render() {
		const categories = Object.keys(this._categories).map((category) => {
			const children = this._categories[category].map((component) => {
				if (component.childComponents) {
					const nestedChildren = component.childComponents.map((childComponent) => {
						const classes = {
							'd2l-link': true,
							'd2l-link-small': true,
							'd2l-design-system-link-selected': this._shownComponent === childComponent.name
						};
						return html`<li><a class="${classMap(classes)}" href="/components/${component.name}/${childComponent.tag}">${childComponent.name}</a></li>`;
					});
					return html`<li class="d2l-design-system-nested">
						<d2l-link small @click="${this._onClickNested}" data-type="${component.name}" href="/components/${component.name}/${component.childComponents[0].tag}">
							<d2l-icon icon="tier1:arrow-expand-small" ?hidden="${this._shownNested === component.name}"></d2l-icon>
							<d2l-icon icon="tier1:arrow-collapse-small" ?hidden="${this._shownNested !== component.name}"></d2l-icon>
							${component.name}
						</d2l-link>
						<ul ?hidden="${this._shownNested !== component.name}">
							${nestedChildren}
						</ul>
					</li>`;
				} else {
					const classes = {
						'd2l-link': true,
						'd2l-link-small': true,
						'd2l-design-system-link-selected': this._shownComponent === component.name
					};
					return html`<li><a class="${classMap(classes)}" href="/components/${component.tag}">${component.name}</a></li>`;
				}
			});
			return html`<li role="listitem">
				<d2l-link @click="${this._onClick}" data-type="${category}" href="/components/${this._categories[category][0].tag}">${category}</d2l-link>
				<ul ?hidden="${this._shownCategory !== category}">
					${children}
				</ul>
			</li>`;
		});

		return html`
			<header>
				<div>
					Brightspace Component Design System
				</div>
			</header>
			<main>
				<div class="d2l-design-system-side-nav">
					<nav aria-label="Component Information">
						<ul role="list">
							<li role="listitem">
								<d2l-link href="/">Welcome</d2l-link>
							</li>
							<li role="listitem">
								<d2l-link href="/components">Component Status</d2l-link>
							</li>
							${categories}
						</ul>
					</nav>
				</div>
				<div class="d2l-design-system-main">
					${this._renderCurrentView()}
				</div>
			</main>
		`;
	}

	_componentRoute(context) {
		this._shownNested = '';
		this._currentView = 'component';
		const componentName = context.params['component'];
		const filtered = components.filter((component) =>  component.tag === componentName);
		this._shownCategory = filtered[0].type;
		this._component = JSON.stringify(filtered[0]);
		this._shownComponent = filtered[0].name;
	}

	_installRoutes() {
		page.redirect('/', '/welcome');
		page('/welcome', () => {
			this._currentView = 'welcome';
			this._shownCategory = '';
			this._shownNested = '';
			this._shownComponent = '';
		});
		page('/components', () => {
			this._currentView = 'component-list';
			this._shownCategory = '';
			this._shownNested = '';
			this._shownComponent = '';
		});
		page('/components/:component', this._componentRoute.bind(this));
		page('/components/:parentComponent/:component', this._nestedComponentRoute.bind(this));
		page('*', () => this._currentView = 'welcome');
		page();
	}

	_nestedComponentRoute(context) {
		this._currentView = 'component';
		const componentName = context.params['component'];
		const parentName = context.params['parentComponent'];
		const filtered1 = components.filter((component) => component.name === parentName);
		const filtered2 = filtered1[0].childComponents.filter((component) =>  component.tag === componentName);
		this._shownCategory = filtered1[0].type;
		this._component = JSON.stringify(filtered2[0]);
		this._shownComponent = filtered2[0].name;
	}

	_onClick(e) {
		const type = e.target.getAttribute('data-type');
		if (this._shownCategory === type) this._shownCategory = '';
		else this._shownCategory = type;
	}

	_onClickNested(e) {
		const type = e.target.getAttribute('data-type');
		if (this._shownNested === type) this._shownNested = '';
		else this._shownNested = type;
	}

	_renderCurrentView() {
		switch (this._currentView) {
			case 'welcome': return html`<d2l-design-system-welcome></d2l-design-system-welcome>`;
			case 'component': return html`<d2l-design-system-component component="${this._component}"></d2l-design-system-component>`;
			case 'component-list': return html`<d2l-design-system-component-list></d2l-design-system-component-list>`;
		}
	}
}
customElements.define('d2l-design-system', DesignSystem);
