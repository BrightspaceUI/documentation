import puppeteer from 'puppeteer';
import VisualDiff from '@brightspace-ui/visual-diff';

describe('d2l-component-catalog-demo-attribute-table', () => {

	const visualDiff = new VisualDiff('demo-attribute-table', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser);
		await page.goto(`${visualDiff.getBaseUrl()}/test/demo-attribute-table.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
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

});
