import { expect, test } from "../fixtures";
import { ModelSelectorPage } from "../pages/model-selector";

test.describe("Model Selector", () => {
  let modelSelectorPage: ModelSelectorPage;

  test.beforeEach(async ({ page }) => {
    modelSelectorPage = new ModelSelectorPage(page);
    await modelSelectorPage.goto();
  });

  test("selecting gemini-pro should show an error", async () => {
    await modelSelectorPage.selectModel("gemini-pro");
    await modelSelectorPage.isErrorVisible();
  });

  test("selecting lm-studio should show an error", async () => {
    await modelSelectorPage.selectModel("lm-studio");
    await modelSelectorPage.isErrorVisible();
  });
});
