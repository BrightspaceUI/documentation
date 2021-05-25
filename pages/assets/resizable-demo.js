import '@brightspace-ui/core/components/demo/code-view.js';
import 'playground-elements/playground-ide';
import 'playground-elements/playground-code-editor';
import 'playground-elements/playground-preview';
import 'playground-elements/playground-project';

import { css, html, LitElement } from 'lit-element';

class ComponentCatalogCodeViewWrapper extends LitElement {
	static get properties() {
		return {
			code: { type: String },
			imports: { type: String },
			previewStyles: { type: String },
		};
	}
	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.slider-region {
				height: 100%;
				width:100%;
				z-index:5;
			}
			.code-demo-container {
				width: 100%;
			}
			playground-preview {
				height: 100%;
				width:100%;
			}
			.preview-container {
				height: 200px;
				width: max(300px, var(--playground-preview-width, 100%));
				position: relative;
				border-radius: inherit;
			}

			.slider {
				position: absolute;
				top: 0;
				right: 0px;
				width: 20px;
				height: 100%;
				background-color: red;
				z-index: 9;
				cursor: col-resize;
			}
			#resizeOverlay {
				display: none;
			}
			#resizeOverlay.resizing {
				display: block;
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				z-index: 99999;
				cursor: col-resize;
			}
			#preview::part(preview-toolbar) {
				display: none;
			}
			.content-wrapper { 
				display: inline;
			}
			.empty-space {
				height: 100%;
				-webkit-overflow-scrolling: touch;
				overflow-x: hidden;
				position: relative;
			}
		`;
	}
	constructor() {
		super();
		this.configuredStyles = '';
	}
	get configuredStyles() {
		return this.previewStyles;
	}

	firstUpdated() {
		this._previewContainer = this.shadowRoot.querySelector('.preview-container');
		this._slider = this.shadowRoot.querySelector('.slider');
	}

	render() {
		//todo: allow toggle for resizable
		return html`
			<div class="slider-region">
				<playground-project id="p1">
					<script type="sample/importmap">
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
							/* todo: add this to md template and provide configuration for display/justify/align */
							.layout {
								display: flex;
								justify-content: space-evenly;
								${this.getConfiguredStyles}
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
					</script>
				</playground-project>
				<div class="preview-container">
					<playground-preview id="preview" project="p1" filename="index.html"></playground-preview>
					<div class="slider" @pointerdown=${this._onResizeBarPointerdown}> </div>
				</div>
			</div>
		`;
	}
	
	_onResizeBarPointerdown({ pointerId }) {
		const bar = this._slider;
		bar.setPointerCapture(pointerId);

		const previewContainerStyles = this._previewContainer.style;
		const { left: hostLeft, right: hostRight } = this.getBoundingClientRect();
		const hostWidth = hostRight - hostLeft;
		const rhsMinWidth = 0;
		const rhsMaxWidth = hostWidth;

		const onPointermove = (event) => {
			const emptySpaceWidth = hostRight - event.clientX;
			const rhsWidth = Math.min(
				rhsMaxWidth,
				Math.max(rhsMinWidth, emptySpaceWidth) // prevent from expanding past right border
			);
			const percent = (rhsWidth / hostWidth) * 100;
			previewContainerStyles.setProperty('--playground-preview-width', `${100 - percent}%`);
		};
		bar.addEventListener('pointermove', onPointermove);

		const onPointerup = () => {
			bar.releasePointerCapture(pointerId);
			bar.removeEventListener('pointermove', onPointermove);
			bar.removeEventListener('pointerup', onPointerup);
		};
		bar.addEventListener('pointerup', onPointerup);
	}

}
customElements.define('d2l-resizable-demo', ComponentCatalogCodeViewWrapper);
