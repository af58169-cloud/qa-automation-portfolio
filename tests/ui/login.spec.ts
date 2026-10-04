import { test, expect } from '../fixtures';

test.beforeEach(async ({ login }) => { await login.goto(); });

test('standard user reaches the product catalog @smoke', async ({ login, inventory, page }) => {
  await login.login();
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(inventory.title).toHaveText('Products');
  await expect(inventory.names).toHaveCount(6);
});

for (const scenario of [
  { name: 'invalid password', username: 'standard_user', password: 'wrong-password', error: 'Username and password do not match any user in this service' },
  { name: 'locked account', username: 'locked_out_user', password: 'secret_sauce', error: 'Sorry, this user has been locked out.' },
  { name: 'missing username', username: '', password: 'secret_sauce', error: 'Username is required' },
  { name: 'missing password', username: 'standard_user', password: '', error: 'Password is required' },
]) {
  test(`login rejects ${scenario.name}`, async ({ login, page }) => {
    await login.login(scenario.username, scenario.password);
    await expect(login.error).toContainText(scenario.error);
    await expect(page.getByTestId('login-button')).toBeVisible();
    await expect(page).not.toHaveURL(/inventory\.html/);
  });
}
