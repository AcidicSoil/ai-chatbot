import { Page, expect } from "@playwright/test";

export class ModelSelectorPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async selectModel(modelName: string) {
    await this.page.click('[data-testid="model-selector"]');
    await this.page.click(`[data-testid="model-selector-item-${modelName}"]`);
  }

  async isErrorVisible() {
    await expect(this.page.locator('[data-testid="error-message"]')).toBeVisible();
  }
}