import puppeteer from 'puppeteer';
import VisualDiff from '@brightspace-ui/visual-diff';

describe('d2l-component-catalog-demo-tables', () => {

	const visualDiff = new VisualDiff('demo-tables', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser);
		await page.goto(`${visualDiff.getBaseUrl()}/test/demo-tables.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	beforeEach(async() => {
		await visualDiff.resetFocus(page);
	});

	after(async() => {
		await browser.close();
	});

	it('No tag', async function() {
		const rect = await visualDiff.getRect(page, '#no-tag');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('Invalid tag', async function() {
		const rect = await visualDiff.getRect(page, '#invalid-tag');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('Valid tag', async function() {
		const rect = await visualDiff.getRect(page, '#valid-tag');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('Interactive', async function() {
		const rect = await visualDiff.getRect(page, '#interactive');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('No slot items', async function() {
		const rect = await visualDiff.getRect(page, '#no-slots');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('Hide slots table', async function() {
		const rect = await visualDiff.getRect(page, '#hide-slots');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('Hide Events table', async function() {
		const rect = await visualDiff.getRect(page, '#hide-events');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

});
