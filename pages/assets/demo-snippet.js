import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/demo/demo-snippet.js';
import './demo-resizable-preview.js';
import 'playground-elements/playground-code-editor';
import 'playground-elements/playground-project';
import { css, html, LitElement } from 'lit-element';

const defaultImports = [
	'import \'@brightspace-ui/core/components/typography/typography.js?module\';\n',
];
const getImports = (allContent) => {
	const content = /<script.*>([\s\S]*)<\/script>/g.exec(allContent);
	if (!content || content.length !== 2 || content[1] === '') return '';

	const importsArray = content[1].split('\n');
	let imports = '';
	importsArray.forEach((importUrl) => {
		if (!importUrl.includes('import')) return;
		// append ?module to resolve imports in playground-demo components
		const appendedModule = importUrl.slice(0, -2).concat('?module\';').trim();
		imports += `${appendedModule}\n`;
	});
	// Append default imports for IFrames
	defaultImports.forEach((importStatement) => imports += importStatement);
	return imports;
};
const MINIMUM_WIDTH = 300;
class ComponentCatalogDemoSnippetWrapper extends LitElement {
	static get properties() {
		return {
			/**
			* Code from the markdown to manipulate before previewing in the IFrame
			*/
			demoSnippet:  { type: String, attribute: 'demo-snippet' },
			/**
			* Hide the read-only code view
			*/
			hideCode: { type: Boolean, attribute: 'hide-code' },
			/**
			* Should the attribute table be rendered for interactivity
			*/
			interactive: { type: Boolean, reflect: true },
			/**
			* Is the preview resizable
			*/
			resizable : { type: Boolean, reflect: true },
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

			playground-code-editor {
				/* stylelint-disable */
				--playground-code-font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
				--playground-code-background: var(--d2l-color-ferrite);
				--playground-code-tag-color: var(--d2l-color-malachite);
				--playground-code-string-color: var(--d2l-color-citrine-plus-1);
				--playground-code-attribute-color: var(--d2l-color-zircon-plus-1);
				--playground-code-default-color: var(--d2l-color-gypsum);
				/* stylelint-enable */
				border-radius: 0 0 10px 10px;
				display: inline-block;
				min-width: ${MINIMUM_WIDTH}px;
				width: 100%;
			}

			.d2l-editor-wrapper {
				position: relative;
			}

			.d2l-button-container {
				padding-right: 10px;
				position: absolute;
				right: 0;
				z-index: 10;
			}
		`;
	}

	constructor() {
		super();
		this.hideCode = false;
		this.resizable = false;
		this.interactive = false;
	}

	get code() {
		// remove comment line from code snippet
		const lines = this.demoSnippet.split('\n');
		lines.splice(0, 1);
		const codeSnippet = lines.join('\n');

		if (this.interactive) {
			const splitItems = codeSnippet.split('$attributes');
			if (splitItems.length === 2) {
				// todo insert attributes based on table results
				const withAttributes = `${splitItems[0]} -- insert attributes -- ${splitItems[1]}`;
				return `${withAttributes}`;
			}
		}

		return codeSnippet;
	}

	get imports() {
		return getImports(this.demoSnippet);
	}

	render() {
		return html`
			<d2l-component-catalog-demo-resizable-preview code=${this.code} imports=${this.imports} ?attached=${!this.hideCode} ?resizable=${this.resizable}></d2l-component-catalog-demo-resizable-preview>
			<div class="d2l-editor-wrapper">
				<div class="d2l-button-container">
					<!-- Add button items to the overlay and pass through props -->
				</div>
				${ !this.hideCode ? html`<playground-code-editor readonly type="html" .value=${this.code}></playground-code-editor>` : null }
			</div>
			${ this.interactive ? html`<div> interactive attribute table </div>` : null }
		`;
	}
}
customElements.define('d2l-component-catalog-demo-snippet', ComponentCatalogDemoSnippetWrapper);
