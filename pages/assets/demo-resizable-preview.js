import '@brightspace-ui/core/components/demo/code-view.js';
import 'playground-elements/playground-preview';
import 'playground-elements/playground-project';

import { css, html, LitElement } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map.js';

const SLIDER_WIDTH = 35;
const MINIMUM_WIDTH = 300;
const PREVIEW_FILE = 'index.html';
class ComponentCatalogDemoResizablePreview extends LitElement {
	static get properties() {
		return {
			/**
			*  Is a code editor attached to the preview
			*/
			attached : { type: Boolean, reflect: true },
			/**
			* Code for the preview IFrame to display
			*/
			code: { type: String },
			/**
			* Necessary imports for the code running in the IFrame
			*/
			imports: { type: String },
			/**
			* Is the preview resizable
			*/
			resizable : { type: Boolean, reflect: true },
			/**
			* Size of the IFrame demo portion
			* @type {'small'|'medium'|'large'}
			*/
			size: { type: String, reflect: true },
			_previewWidth: { type: Number, reflect: true }
		};
	}
	update() {
		super.update();
		const pp = this.shadowRoot.querySelector('playground-preview')
	}
	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-slider-region {
				height: 100%;
				width: 100%;
				z-index: 5;
			}
			:host([size="small"]) {
				height: 200px;
			}
			:host([size="medium"]) {
				height: 300px;
			}
			:host([size="large"]) {
				height: 400px;
			}

			.d2l-preview-container {
				border-radius: inherit;
				height: 100%;
				max-width: 100%; /* prevent preview from expanding past code block when page resizes */
				min-width: ${MINIMUM_WIDTH}px;
				position: relative;
			}

			:host([resizable]) .d2l-slider {
				border-radius: 0 10px 10px 0;
			}
			:host([attached]) .d2l-slider {
				border-radius: 0 10px 0 0;
			}
			.d2l-slider {
				align-items: center;
				background-color: white;
				border-left: 1px solid #eff3fa;
				cursor: col-resize;
				display: flex;
				height: 100%;
				justify-content: center;
				position: absolute;
				right: 0;
				top: 0;
				width: ${SLIDER_WIDTH}px;
				z-index: 9;
			}
			.d2l-slider:hover {
				background-color: var(--d2l-color-gypsum);
			}
			playground-preview::part(preview-toolbar) {
				display: none;
			}
			playground-preview {
				border-radius: 10px;
				height: 100%;
			}
			:host([resizable]) playground-preview {
				border-radius: 10px 0 0 10px;
			}
			:host([attached]) playground-preview {
				border-radius: 10px 10px 0 0;
			}
		`;
	}
	constructor() {
		super();
		this.resizable = false;
		this.attached = false;
		this.size = 'small';
	}
	get indexHTML() {
		return `
			<script type="module" src="index.js"></script>
			<script>
				window.addEventListener('load', function () {
					var demoEl = document.getElementById('demo-element');
					demoEl.classList.remove('hide');
				});
			</script>
			<style>
				/* todo?: add this to md template and provide configuration for different item alignments? */
				html {
					margin: 20px;
				}
				.layout {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					width: 100%;
					height: 100%;
				}
				.hide {
					display:none;
				}
			</style>
			<body class="d2l-typography">
				<!-- todo: provide layout options for components-->
				<div id="demo-element" class="layout hide">
					${this.code}
				</div>
			</body>`;
	}
	firstUpdated() {
		this._previewContainer = this.shadowRoot.querySelector('.preview-container');
		this._preview = this.shadowRoot.querySelector('playground-preview');
		this._project = this.shadowRoot.querySelector('playground-project');
		this._slider = this.shadowRoot.querySelector('.d2l-slider');
	}
	
	update(changedProperties) {
		console.log(changedProperties)
		if (changedProperties.has('code') && this._preview) {
			this._preview._project = this._project;
		}
		super.update(changedProperties);

	}
	get testCode() {
		return html`<script type="sample/importmap">
		{
			"imports": {
				"@brightspace-ui/core": "https://unpkg.com/@brightspace-ui/core",
				"@brightspace-ui/core/": "https://unpkg.com/@brightspace-ui/core/"
			}
		}
	</script>
	<!-- GETTING RENDERED -->
	<script filename="index.html" type="sample/html">
		<script type="module" src="index.js">&lt;/script>
		<style>
			/* todo?: add this to md template and provide configuration for different item alignments? */
			html {
				margin: 20px;
			}
			.layout {
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				width: 100%;
				height: 100%;
			}
		</style>

		<body class="d2l-typography">
			<!-- todo: provide layout options for components-->
			<div class="layout">
				<!-- script tags are technically within this atm -->
				${this.code}
			</div>
		</body>
	</script>
	<script filename="index.js" type="sample/js">
		${this.imports}
	</script>`
	}
	render() {
		const previewStyles = {
			width: `calc(100% - ${this.resizable ? SLIDER_WIDTH : 0}px)`,
		};
		const previewContainerStyles = {
			width: this._previewWidth ? `${this._previewWidth}px` : '100%',
		};
		console.log(this.code)
		return html`
			<div class="d2l-slider-region">
				<playground-project id='demo'>
					<script type="sample/importmap">
						{
							"imports": {
								"@brightspace-ui/core": "https://unpkg.com/@brightspace-ui/core",
								"@brightspace-ui/core/": "https://unpkg.com/@brightspace-ui/core/"
							}
						}
					</script>
					<script filename=${PREVIEW_FILE} type="sample/html">
						${this.indexHTML}
					</script>
					<script filename="index.js" type="sample/js">
						${this.imports}
					</script>
				</playground-project>
				<div class="d2l-preview-container" style=${styleMap(previewContainerStyles)}>
					<playground-preview id="preview" style=${styleMap(previewStyles)} project='demo' filename=${PREVIEW_FILE}></playground-preview>
					${this.resizable ?  html`<div class="d2l-slider" @pointerdown=${this._onResizeSliderPointerDown}>
						<svg width="5" height="18" viewBox="0 0 5 18" xmlns="http://www.w3.org/2000/svg">
							<g fill="#6E7376" fill-rule="evenodd">
								<rect width="2" height="18" rx="1"/>
								<rect x="3" width="2" height="18" rx="1"/>
							</g>
						</svg>
					</div>` : null}
				</div>
			</div>
		`;
	}

	_onResizeSliderPointerDown({ pointerId }) {
		const slider = this._slider;
		slider.setPointerCapture(pointerId);

		const { left: hostLeft, right: hostRight } = this.getBoundingClientRect();
		const hostWidth = hostRight - hostLeft;
		const rhsMinWidth = 0;
		const rhsMaxWidth = hostWidth;

		const onPointermove = (event) => {
			const emptySpaceWidth = hostRight - event.clientX - (SLIDER_WIDTH / 2); // subtract half the slider size to center cursor
			const rhsWidth = Math.min(
				rhsMaxWidth,
				Math.max(rhsMinWidth, emptySpaceWidth) // prevent from expanding past right border
			);
			this._previewWidth = Math.max(hostWidth - rhsWidth, MINIMUM_WIDTH);
		};
		slider.addEventListener('pointermove', onPointermove);

		const onPointerup = () => {
			slider.releasePointerCapture(pointerId);
			slider.removeEventListener('pointermove', onPointermove);
			slider.removeEventListener('pointerup', onPointerup);
		};
		slider.addEventListener('pointerup', onPointerup);
	}
}
customElements.define('d2l-component-catalog-demo-resizable-preview', ComponentCatalogDemoResizablePreview);
