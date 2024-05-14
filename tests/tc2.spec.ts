import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});


test.describe("First test suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
  });

  test("First test", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });
  
  test("Navigate to datapicker page", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
});

test.describe("Second test suite", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByText("Charts").click();
    });
  
    test("First test", async ({ page }) => {
      await page.getByText("Echarts").click();
    });
    
    test("Navigate to datapicker page", async ({ page }) => {
      await page.getByText("Datepicker").click();
    });
  });
  

test.afterAll(async ({ page }) => {});
