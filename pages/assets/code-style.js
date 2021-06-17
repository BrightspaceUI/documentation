/* stylelint-disable */
import { css } from 'lit-element';

export const themeStyles = css`
	code,
	pre {
		background: none;
		/* this color is for base text within code snippets */
		color: var(--d2l-color-gypsum);
		font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
		font-size: 0.6rem;
		-webkit-hyphens: none;
		-moz-hyphens: none;
		-ms-hyphens: none;
		hyphens: none;
		line-height: 1.5;
		-moz-tab-size: 4;
		-o-tab-size: 4;
		tab-size: 4;
		text-align: left;
		white-space: pre;
		word-break: normal;
		word-spacing: normal;
		word-wrap: normal;
	}

	/* Code blocks */
	pre {
		border-radius: 0 0 10px 10px;
		margin: 0;
		overflow: auto;
		padding: 40px 24px;
		background: var(--d2l-color-ferrite);
	}

	/* todo: get colors from jeff

	.token.comment,
	.token.block-comment,
	.token.prolog,
	.token.doctype,
	.token.cdata {
		color: #808080;
	}

	.token.number,
	.token.url,
	.token.operator {
		color: #D4D4D4;
	} */

	.token.interpolation,
	.token.attr-name,
	.token.constant,
	.token.property {
		color: var(--d2l-color-zircon-plus-1);
	}

	.token.tag,
	.token.boolean,
	.token.entity,
	.token.interpolation-punctuation {
		color: var(--d2l-color-malachite);
	}

	.token.keyword,
	.token.atrule {
		color: var(--d2l-color-citrine);
	}

	.token.attr-value {
		color: var(--d2l-color-citrine-plus-1);
	}

	.token.string,
	.token.punctuation,
	.token.char {
		color: var(--d2l-color-gypsum);
	}

	.token.important,
	.token.bold {
		font-weight: bold;
	}

	.token.italic {
		font-style: italic;
	}

	.token.entity {
		cursor: help;
	}
`;
