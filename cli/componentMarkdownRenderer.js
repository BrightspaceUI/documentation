import marked from 'marked';

const defaultRenderer = new marked.Renderer();

function tryGetTag(code) {
	const match = code.match(/<(d2l-[a-zA-Z-]+)/i);
	if (match === null || match.length < 2) return null;
	return match[1];
}

export function createComponentRenderer() {

	let isExampleBlock = false;

	const componentRenderer = {
		code(code, infostring, escaped) {
			if (isExampleBlock) {
				isExampleBlock = false;
				const tagName = tryGetTag(code);
				if (tagName) {
					return `${defaultRenderer.code(code, infostring, escaped)}
						<d2l-design-system-component-attribute-table tag-name="${tagName}"></d2l-design-system-component-attribute-table>`;
				}
			}
			return defaultRenderer.code(code, infostring, escaped);
		},
		heading(text, level, raw, slugger) {
			if (text === 'Examples' || text === 'Example') {
				isExampleBlock = true;
			}
			return defaultRenderer.heading(text, level, raw, slugger);
		}
	};

	return componentRenderer;

}
