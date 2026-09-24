import { test, expect } from "@playwright/test";

test("home page loads and shows hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Kakuma");
});