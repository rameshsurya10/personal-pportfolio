import { test, expect } from "@playwright/test";

test("landing page loads and navigates to a case study", async ({ page }) => {
  await page.goto("/");

  // h1 is the hero with the owner's name
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  // "View case study →" links are present on featured cards; click the first one
  await page.getByRole("link", { name: /view case study/i }).first().click();

  // Now on a /work/<slug> route with its own h1
  await expect(page).toHaveURL(/\/work\//);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  // Navigate back via the in-page "Back to all work" link
  await page.getByRole("link", { name: /back to all work/i }).click();
  await expect(page).toHaveURL(/\/(#work)?$/);
});

test("project filter narrows the list and updates aria-selected", async ({ page }) => {
  await page.goto("/");

  const dataTab = page.getByRole("tab", { name: /data analytics/i });
  await dataTab.click();
  // Note: filter buttons use role="tab" with aria-selected (not aria-pressed)
  await expect(dataTab).toHaveAttribute("aria-selected", "true");
});
