import { type Page } from '@playwright/test';

export class InventoryPage {
  constructor(readonly page: Page) {}
  get title() { return this.page.getByTestId('title'); }
  get names() { return this.page.getByTestId('inventory-item-name'); }
  get prices() { return this.page.getByTestId('inventory-item-price'); }
  get badge() { return this.page.getByTestId('shopping-cart-badge'); }

  item(name: string) {
    return this.page.getByTestId('inventory-item').filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: name }),
    });
  }
  async add(name: string) { await this.item(name).getByRole('button', { name: 'Add to cart' }).click(); }
  async remove(name: string) { await this.item(name).getByRole('button', { name: 'Remove' }).click(); }
  async sort(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.getByTestId('product-sort-container').selectOption(value);
  }
  async openProduct(name: string) { await this.item(name).getByTestId('inventory-item-name').click(); }
  async openCart() { await this.page.getByTestId('shopping-cart-link').click(); }
}

