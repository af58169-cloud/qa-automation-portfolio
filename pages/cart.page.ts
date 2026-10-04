import { type Page } from '@playwright/test';

export class CartPage {
  constructor(readonly page: Page) {}
  get items() { return this.page.getByTestId('inventory-item'); }
  item(name: string) { return this.items.filter({ hasText: name }); }
  async remove(name: string) { await this.item(name).getByRole('button', { name: 'Remove' }).click(); }
  async checkout() { await this.page.getByTestId('checkout').click(); }
  async continueShopping() { await this.page.getByTestId('continue-shopping').click(); }
}

