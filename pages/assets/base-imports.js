import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui/core/components/typography/typography.js';

document.fonts.ready.then(() => {
	document.body.classList.remove('d2l-component-catalog-body-unresolved'); // prevent FOUC
});
