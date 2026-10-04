import { test, expect } from '@playwright/test';

// This API is a separate public practice service, not SauceDemo's backend.
test('product catalog returns usable product data @smoke', async ({ request }) => {
  const response = await request.get('/api/productsList');
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);
  for (const product of body.products) {
    expect(product).toEqual(expect.objectContaining({
      id: expect.any(Number), name: expect.any(String), price: expect.any(String), brand: expect.any(String),
    }));
    expect(product.name.trim().length).toBeGreaterThan(0);
    expect(product.price).toMatch(/^Rs\. \d+$/);
  }
});

test('search returns products matching the requested term', async ({ request }) => {
  const response = await request.post('/api/searchProduct', { form: { search_product: 'jeans' } });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.responseCode).toBe(200);
  expect(body.products.length).toBeGreaterThan(0);
  for (const product of body.products) expect(product.name.toLowerCase()).toContain('jeans');
});

test('search rejects a missing required parameter', async ({ request }) => {
  const response = await request.post('/api/searchProduct', { form: {} });
  // The demo encodes the application error in JSON while returning HTTP 200.
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({
    responseCode: 400,
    message: 'Bad request, search_product parameter is missing in POST request.',
  });
});
