import '../node_modules/@brightspace-ui/core/components/link/link.js';
import '../node_modules/@brightspace-ui/core/components/typography/typography.js';

const tables = document.querySelectorAll('table');
tables.forEach((table) => {
	const tableParent = table.parentNode;
	table.classList.add('d2l-table');
	const parentWrapper = document.createElement('d2l-table-wrapper');
	tableParent.replaceChild(parentWrapper, table);

	parentWrapper.appendChild(table);
});

const links = document.querySelectorAll('a');
links.forEach((link) => {
	const linkParent = link.parentNode;
	const newLink = document.createElement('d2l-link');
	newLink.innerText = link.innerText;
	newLink.setAttribute('href', link.getAttribute('href'));
	linkParent.replaceChild(newLink, link);
});
