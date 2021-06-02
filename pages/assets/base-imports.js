import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui/core/components/typography/typography.js';
import { tableStyles } from '@brightspace-ui/core/components/table/table-wrapper.js';

if (document.getElementById('d2l-table-style-shared') === null) {
	const style = document.createElement('style');
	style.id = 'd2l-table-style-shared';
	style.appendChild(document.createTextNode(tableStyles.cssText));
	document.head.appendChild(style);
}

window.addEventListener('DOMContentLoaded', () => {
	const elem = document.querySelector('div.d2l-component-catalog-content');
	if (elem) elem.classList.remove('d2l-component-catalog-content-unresolved'); // prevent FOUC
});
