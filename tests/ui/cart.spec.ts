import { test, expect } from '../fixtures';

test.beforeEach(async ({ login }) => { await login.goto(); await login.login(); });

test('add two products and remove one in the cart @smoke', async ({ inventory, cart, page }) => {
  await inventory.add('Sauce Labs Backpack');
  await inventory.add('Sauce Labs Bike Light');
  await expect(inventory.badge).toHaveText('2');
  await inventory.openCart();
  await expect(cart.items).toHaveCount(2);
  await expect(cart.item('Sauce Labs Backpack').getByTestId('inventory-item-price')).toHaveText('$29.99');
  await cart.remove('Sauce Labs Bike Light');
  await expect(cart.item('Sauce Labs Bike Light')).toHaveCount(0);
  await expect(cart.items).toHaveCount(1);
  await expect(inventory.badge).toHaveText('1');
  await page.reload();
  await expect(cart.items).toHaveCount(1);
  await expect(cart.item('Sauce Labs Backpack')).toBeVisible();
});

test('remove last product from inventory clears the cart', async ({ inventory, cart }) => {
  await inventory.add('Sauce Labs Backpack');
  await inventory.remove('Sauce Labs Backpack');
  await expect(inventory.badge).toHaveCount(0);
  await inventory.openCart();
  await expect(cart.items).toHaveCount(0);
  await cart.continueShopping();
  await expect(inventory.title).toHaveText('Products');
});
