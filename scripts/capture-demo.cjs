// Optional portfolio images. This script is not a test and makes no pass/fail claims.
const { chromium } = require('@playwright/test');
const { mkdir } = require('node:fs/promises');

(async () => {
  await mkdir('docs/screenshots', { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="inventory-item"]').first().waitFor();
    await page.screenshot({ path: 'docs/screenshots/catalog.png', fullPage: true });
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Test');
    await page.locator('[data-test="lastName"]').fill('Shopper');
    await page.locator('[data-test="postalCode"]').fill('14206');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await page.locator('[data-test="complete-header"]').waitFor();
    await page.screenshot({ path: 'docs/screenshots/order-confirmation.png', fullPage: true });
    console.log('Saved catalog and simulated order screenshots in docs/screenshots/.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
