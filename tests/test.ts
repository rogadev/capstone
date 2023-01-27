import { expect, test } from '@playwright/test';

test('Index page has h1 element', async ({ page }) => {
	await page.goto('/');
	expect(
		await page.waitForSelector('h1', { state: 'attached' })
	).toBeTruthy();
});
