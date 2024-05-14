import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('http://uitestingplayground.com/ajax')
  await page.getByText('Button Triggering AJAX Request').click()
});

test("Auto-waiting", async ({ page }) => {
  const successButton = page.locator('.bg-success')
  await successButton.click()

  const text = await successButton.textContent()
  expect(text).toEqual('Data loaded with AJAX get request.')
});

test("Auto-waiting need waitFor command", async ({ page }) => {
  const successButton = page.locator('.bg-success')
  await successButton.click()

  await successButton.waitFor({state : "attached"})
  const text = await successButton.allTextContents()
  expect(text).toContain('Data loaded with AJAX get request.')

  // await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

});


test("Alternative wait", async ({ page }) => {
  const successButton = page.locator('.bg-success')

  // .. wait for selector
  // await page.waitForSelector('.bg-success')

  // .. wait for response
  // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
  
  // const text = await successButton.allTextContents()
  // expect(text).toContain('Data loaded with AJAX get request.')

    // .. wait for timeout
});
