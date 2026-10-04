import { test, expect } from '../fixtures';

test.beforeEach(async ({ login }) => { await login.goto(); await login.login(); });

test('select a product and verify its detail page', async ({ inventory, page }) => {
  await inventory.openProduct('Sauce Labs Backpack');
  await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
  await expect(page.getByTestId('inventory-item-price')).toHaveText('$29.99');
  await expect(page.getByTestId('inventory-item-desc')).not.toBeEmpty();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(inventory.badge).toHaveText('1');
});

for (const direction of ['az', 'za'] as const) {
  test(`sort all product names ${direction}`, async ({ inventory }) => {
    await inventory.sort(direction);
    const names = await inventory.names.allTextContents();
    expect(names).toHaveLength(6);
    const sorted = [...names].sort();
    expect(names).toEqual(direction === 'az' ? sorted : sorted.reverse());
  });
}
for (const direction of ['lohi', 'hilo'] as const) {
  test(`sort all product prices ${direction}`, async ({ inventory }) => {
    await inventory.sort(direction);
    const prices = (await inventory.prices.allTextContents()).map(value => Number(value.replace('$', '')));
    expect(prices).toHaveLength(6);
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(direction === 'lohi' ? sorted : sorted.reverse());
  });
}
