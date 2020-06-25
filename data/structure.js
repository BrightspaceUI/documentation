import { default as components } from '../data/components.js';

export const siteStructure = [
	{
		name: 'Welcome',
		type: 'markdown',
		path: 'pages/welcome.md'
	},
	{
		name: 'Component Status',
		type: 'custom'
	},
	{
		name: 'Actions',
		type: 'container',
		children: [
			{
				name: 'Button 2',
				type: 'markdown',
				subtype: 'component',
				path: 'pages/components/button2.md',
				data: {
					tagName: 'd2l-button'
				}
			}
		]
	},
	{
		name: 'Feedback',
		type: 'container'
	},
	{
		name: 'Overlay',
		type: 'container'
	},
	{
		name: 'Navigation',
		type: 'container'
	},
	{
		name: 'Structure',
		type: 'container'
	},
	{
		name: 'Forms',
		type: 'container'
	},
	{
		name: 'Other',
		type: 'container'
	}
];
components.forEach((component) => {
	let cat = siteStructure.find((c) => c.name === component.type);
	if (!cat) {
		cat = { name: component.type };
		siteStructure.push(cat);
	}
	cat.children = cat.children || [];
	cat.children.push(convertComponentToItem(component));
});

function convertComponentToItem(component) {
	const item = { name: component.name, type: 'component', children: [], data: { tagName: component.tag } };
	if (component.childComponents) {
		item.type = 'container';
		item.children = component.childComponents.map((c) => convertComponentToItem(c));
	}
	return item;
}

function makeUrlFriendly(name) {
	return name.replace(/\s/g, '-').toLowerCase();
}

export function findItemFromPath(path) {
	function search(items, parents) {
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			parents.push(item);
			const itemPath = `/components/${parents.map((p) => makeUrlFriendly(p.name)).join('/')}`;
			if (itemPath === path) {
				return item;
			}
			if (item.children) {
				const result = search(item.children, parents);
				if (result !== null) {
					return result;
				}
			}
			parents.pop();
		}
		return null;
	}
	return search(siteStructure, []);
}

export function getComponentPathFromTagName(tagName) {
	function search(items) {
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			if (item.type === 'component' && item.data.tagName === tagName) {
				return getItemPath(item).realPath;
			}
			if (item.children) {
				const result = search(item.children);
				if (result !== null) {
					return result;
				}
			}
		}
		return null;
	}
	return search(siteStructure);
}

export function getItemPath(searchItem) {
	function search(items, parents) {
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			parents.push(item);
			if (searchItem === item) {
				const realPath = `/components/${parents.map((p) => makeUrlFriendly(p.name)).join('/')}`;
				let itemPath = realPath;
				if (item.type === 'container' && item.children.length > 0) {
					itemPath += `/${makeUrlFriendly(item.children[0].name)}`;
				}
				return {path: itemPath, realPath: realPath};
			}
			if (item.children) {
				const result = search(item.children, parents);
				if (result !== null) {
					return result;
				}
			}
			parents.pop();
		}
		return null;
	}
	return search(siteStructure, []);
}
