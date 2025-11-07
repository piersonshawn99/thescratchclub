import { test, expect } from '@playwright/test';

test('footer contains link to /leagues', async ({ page }) => {
  await page.goto('/');

  // Footer should include a link with href '/leagues' and visible text 'Leagues'
  const link = page.locator('footer a[href="/leagues"]');
  await expect(link).toHaveCount(1);
  await expect(link).toHaveText('Leagues');
});
