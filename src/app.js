import './component.js';
import './component-list.js';
import './welcome.js';
import '@brightspace-ui/core/components/link/link.js';
import { css, html, LitElement } from 'lit-element';
import { default as components } from '../data/components.js';
import page from 'page';

export class DesignSystem extends LitElement {
	static get properties() {
		return {
			_categories: { type: Object },
			_component: { type: String },
			_currentView: { type: String },
			_shownCategory: { type: String }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
				height: 100%;
				min-height: 100%;
			}

			header {
				align-items: center;
				background-color: white;
				box-shadow: rgba(0, 0, 0, 0.22) 0px 0px 3px 0px;
				box-sizing: border-box;
				display: flex;
				height: 4.5rem;
				padding-left: 4.5rem;
				// position: sticky;
				top: 0;
			}

			main {
				align-content: stretch;
				align-items: stretch;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: flex-start;
				height: 100%;
				padding-top: 2px;
			}

			.d2l-design-system-side-nav {
				background: linear-gradient(to right, #FFFFFF, #F9FAFB);
				border-right: 1px solid #e6eaf0;
				box-sizing: border-box;
				flex: 0 1 30%;
				padding-top: 1.5rem;
				position: sticky;
				top: 3rem;
				overflow-y: scroll;
			}

			.d2l-design-system-main {
				background-color: white;
				flex: 1 1 auto;
				overflow: scroll;
				padding-bottom: 2rem;
				padding-left: 1.5rem;
				padding-right: 1.5rem;
				padding-top: 2rem;
			}

			ul {
				padding-left: 4.5rem;
			}

			ul ul li {
				padding-bottom: 0.2rem;
			}

			ul ul {
				padding-left: 1rem;
			}

			li {
				list-style-type: none;
				padding-bottom: 1rem;
			}
		`;
	}

	constructor() {
		super();
		this._component = '';
		this._currentView = 'welcome';
		this._shownCategory = '';
		this._installRoutes();

		this._categories = {
			'Actions': [],
			'Feedback': [],
			'Forms': [],
			'Navigation': [],
			'Overlay': [],
			'Structure': [],
			'Other': []
		};
		components.forEach((component) => {
			Object.keys(this._categories).forEach((category) => {
				if (component.type === category) this._categories[category].push(component);
			});
		});
	}

	render() {
		const categories = Object.keys(this._categories).map((category) => {
			const children = this._categories[category].map((component) => html`
			 	<li><d2l-link small href="/components/${component.tag}">${component.name}</d2l-link></li>
			`);
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
		this._currentView = 'component';
		const componentName = context.params['component'];
		const thing = components.filter((component) =>  component.tag === componentName);
		this._component = JSON.stringify(thing[0]);
	}

	_installRoutes() {
		page.redirect('/', '/welcome');
		page('/welcome', () => this._currentView = 'welcome');
		page('/components', () => this._currentView = 'component-list');
		page('/components/actions', () => this._currentView = 'welcome');
		page('/components/forms', () => this._currentView = 'welcome');
		page('/components/:component', this._componentRoute.bind(this));
		page('*', () => this._currentView = 'welcome');
		page();
	}

	_onClick(e) {
		this._shownCategory = e.target.getAttribute('data-type');
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
