import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('http://uitestingplayground.com/ajax')
  await page.getByText('Button Triggering AJAX Request').click()
});

// Global timeout 
// Test timeout default: 30000ms
// Action timeout
// Navigation timeout
// Expect timeout default: 5000ms
test("Timeout wait", async ({ page }) => {
  // test.setTimeout(100000)
  // test.slow() for increate 3*actual config timeout
  const successButton = page.locator('.bg-success')
  await successButton.click({timeout: 150000})
});
