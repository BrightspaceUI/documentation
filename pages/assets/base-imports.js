import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui/core/components/typography/typography.js';
import './table.js';

window.addEventListener('DOMContentLoaded', () => {
	const elem = document.querySelector('div.d2l-component-catalog-content');
	if (elem) elem.classList.remove('d2l-component-catalog-content-unresolved'); // prevent FOUC
});
