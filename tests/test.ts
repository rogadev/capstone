import { expect, test } from '@playwright/test';

test('Welcome page has a Login button', async ({ page }) => {
	await page.goto('/');
	expect(await page.waitForSelector('text=Login')).toBeTruthy();
});