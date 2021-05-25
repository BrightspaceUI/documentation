import '@brightspace-ui/core/components/demo/code-view.js';
import 'playground-elements/playground-ide';
import 'playground-elements/playground-code-editor';
import 'playground-elements/playground-preview';
import 'playground-elements/playground-project';

import { css, html, LitElement } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map.js';

const SLIDER_WIDTH = 35;
class ComponentCatalogCodeViewWrapper extends LitElement {
	static get properties() {
		return {
			code: { type: String },
			imports: { type: String },

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
				width: calc(100% - SLIDER_WIDTH);
			}
			.preview-container {
				/* todo: allow for height adjustments */
				height: 200px;
				width: max(300px, var(--playground-preview-width, 100%));
				position: relative;
				border-radius: inherit;
			}

			.slider {
				position: absolute;
				top: 0;
				right: 0px;
				width: ${SLIDER_WIDTH}px;
				height: 100%;
				background-color: white;
				border-left: 1px solid var(--d2l-color-gypsum);
				z-index: 9;
				cursor: col-resize;
			}
			.slider:hover {
				background-color: var(--d2l-color-gypsum);
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

	firstUpdated() {
		this._previewContainer = this.shadowRoot.querySelector('.preview-container');
		this._slider = this.shadowRoot.querySelector('.slider');
	}

	render() {
		//todo: allow toggle for resizable
		const bottomRightBorderRadius = this.isAttached ? '20px' : '0';
		const sliderStyles = {
			borderRadius: `0 20px ${bottomRightBorderRadius} 0`
		};
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
					<div class="slider" style=${styleMap(sliderStyles)} @pointerdown=${this._onResizeBarPointerdown}> </div>
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
			const emptySpaceWidth = hostRight - event.clientX - (SLIDER_WIDTH / 2); // subtract half the slider size to center cursor
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
