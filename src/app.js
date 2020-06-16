import './component.js';
import './component-list.js';
import './welcome.js';
import 'd2l-table/d2l-table.js';
import '@brightspace-ui/core/components/link/link.js';
import { css, html, LitElement } from 'lit-element';
import page from 'page';

export class DesignSystem extends LitElement {
	static get properties() {
		return {
			_component: { type: String },
			_currentView: { type: String },
			_showActionComponents: { type: Boolean },
			_showFormComponents: { type: Boolean }
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
				flex: 0 1 24%;
				padding-top: 1.5rem;
				position: sticky;
				top: 3rem;
			}

			.d2l-design-system-main {
				background-color: white;
				flex: 1 1 auto;
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
		this._showActionComponents = false;
		this._showFormComponents = false;
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
						<ul role="list">
							<li role="listitem">
								<d2l-link href="/">Welcome</d2l-link>
							</li>
							<li role="listitem">
								<d2l-link href="/components">Component Status</d2l-link>
							</li>
							<li role="listitem">
								<d2l-link @click="${this._onClickActions}" href="/components/actions">Actions</d2l-link>
								<ul ?hidden="${!this._showActionComponents}">
									<li><d2l-link small href="/components/button">Button</d2l-link></li>
								</ul>
							</li>
							<li role="listitem">
								<d2l-link @click="${this._onClickForms}" href="/components/forms">Forms</d2l-link>
								<ul ?hidden="${!this._showFormComponents}">
									<li><d2l-link small href="/components/input">Input</d2l-link></li>
								</ul>
							</li>
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
		this._component = componentName;
	}

	_installRoutes() {
		page.redirect('/', '/welcome');
		page('/welcome', () => this._currentView = 'welcome');
		page('/components', () => this._currentView = 'component-list');
		page('/components/actions', () => this._currentView = 'actions');
		page('/components/forms', () => this._currentView = 'forms');
		page('/components/:component', this._componentRoute.bind(this));
		page('*', () => this._currentView = 'welcome');
		page();
	}

	_onClickActions() {
		this._showActionComponents = !this._showActionComponents;
	}

	_onClickForms() {
		this._showFormComponents = !this._showFormComponents;
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
