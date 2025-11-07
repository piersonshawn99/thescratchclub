import { test, expect } from '@playwright/test';

test('coaching page renders', async ({ page }) => {
  await page.goto('/coaching');
  // page should include heading 'Coaching'
  const h1 = page.locator('h1');
  await expect(h1).toHaveText('Coaching');
});
