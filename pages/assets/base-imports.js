import { linkStyles } from '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/typography/typography.js';

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = linkStyles;
document.head.appendChild(styleSheet);

document.fonts.ready.then(() => {
	document.body.classList.remove('d2l-component-catalog-body-unresolved'); // prevent FOUC
});
