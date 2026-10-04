import { test, expect } from '../fixtures';

test.beforeEach(async ({ login, inventory, cart }) => {
  await login.goto(); await login.login();
  await inventory.add('Sauce Labs Backpack');
  await inventory.add('Sauce Labs Bike Light');
  await inventory.openCart(); await cart.checkout();
});

test('complete checkout with correct items and totals @smoke', async ({ checkout, page, inventory }) => {
  await checkout.fillDetails('Test', 'Shopper', '14206');
  await checkout.continue();
  await expect(page).toHaveURL(/checkout-step-two\.html$/);
  await expect(page.getByTestId('inventory-item-name')).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
  await expect(checkout.subtotal).toHaveText('Item total: $39.98');
  await expect(checkout.tax).toHaveText('Tax: $3.20');
  await expect(checkout.total).toHaveText('Total: $43.18');
  await checkout.finish();
  await expect(checkout.complete).toHaveText('Thank you for your order!');
  await expect(inventory.badge).toHaveCount(0);
});

for (const scenario of [
  { field: 'first name', first: '', last: 'Shopper', zip: '14206', error: 'First Name is required' },
  { field: 'last name', first: 'Test', last: '', zip: '14206', error: 'Last Name is required' },
  { field: 'postal code', first: 'Test', last: 'Shopper', zip: '', error: 'Postal Code is required' },
]) {
  test(`checkout requires ${scenario.field}`, async ({ checkout, page }) => {
    await checkout.fillDetails(scenario.first, scenario.last, scenario.zip);
    await checkout.continue();
    await expect(checkout.error).toContainText(scenario.error);
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
  });
}

test('cancel checkout preserves cart', async ({ checkout, cart, page }) => {
  await checkout.cancel();
  await expect(page).toHaveURL(/cart\.html$/);
  await expect(cart.items).toHaveCount(2);
});
