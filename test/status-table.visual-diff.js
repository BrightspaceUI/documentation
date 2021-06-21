import puppeteer from 'puppeteer';
import VisualDiff from '@brightspace-ui/visual-diff';

describe('d2l-component-catalog-status-table', () => {

	const visualDiff = new VisualDiff('status-table', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser);
		await page.goto(`${visualDiff.getBaseUrl()}/test/status-table.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	beforeEach(async() => {
		await visualDiff.resetFocus(page);
	});

	after(async() => {
		await browser.close();
	});

	it('No tier', async function() {
		const rect = await visualDiff.getRect(page, '#no-tier');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('Invalid tier', async function() {
		const rect = await visualDiff.getRect(page, '#invalid-tier');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });

	});

	it('Labs tier with one component', async function() {
		const rect = await visualDiff.getRect(page, '#labs');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('Request tier with five components', async function() {
		const rect = await visualDiff.getRect(page, '#request');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('Official tier', async function() {
		const rect = await visualDiff.getRect(page, '#official');
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

});
