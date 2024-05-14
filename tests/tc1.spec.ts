import { test } from "@playwright/test";

test("First test", async ({page}) => {
    console.log(`Run test case`)
    // await page.goto('http://localhost:4200/');
    // await page.getByText('Forms').click();
    // await page.getByText('Form Layouts').click();
});

test("Navigate to datapicker page", async ({page}) => {
    // await page.goto('http://localhost:4200/');
    // await page.getByText('Forms').click();
    // await page.getByText('Date picker').click();
});

test.describe("First test suite", () => {
  console.log(`Run test suite`)

  test("First test", () => {
    console.log(`Run first test case`)
  });

  test("Second test", () => {
    console.log(`Run second test case`)
  });
});
