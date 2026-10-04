import { type Page } from '@playwright/test';

export class CheckoutPage {
  constructor(readonly page: Page) {}
  get error() { return this.page.getByTestId('error'); }
  get subtotal() { return this.page.getByTestId('subtotal-label'); }
  get tax() { return this.page.getByTestId('tax-label'); }
  get total() { return this.page.getByTestId('total-label'); }
  get complete() { return this.page.getByTestId('complete-header'); }

  async fillDetails(firstName: string, lastName: string, postalCode: string) {
    await this.page.getByTestId('firstName').fill(firstName);
    await this.page.getByTestId('lastName').fill(lastName);
    await this.page.getByTestId('postalCode').fill(postalCode);
  }
  async continue() { await this.page.getByTestId('continue').click(); }
  async finish() { await this.page.getByTestId('finish').click(); }
  async cancel() { await this.page.getByTestId('cancel').click(); }
}

