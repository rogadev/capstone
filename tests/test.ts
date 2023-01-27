import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	// expect the page to load
	expect(
		await page.waitForSelector('h1', { state: 'attached' })
	).toBeTruthy();
});
