import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
  // by tag name
  // <input ...
  page.locator("input");
  // await page.locator('input').first().click()

  // by id
  // id="inputEmail1"
  page.locator("#inputEmail1");

  // by class
  // class="input-full-width size-medium status-basic shape-rectangle nb-transition cdk-focused cdk-mouse-focused"
  page.locator(".shape-rectangle");
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition cdk-focused cdk-mouse-focused"]'
  );

  // by attribute
  page.locator('[placeholder="Email"]');

  // by combine
  page.locator('input[placeholder="Email"]');

  // by XPATH (NOT RECOMMENDED)
  page.locator('//*[@id="inputEmail1"]');

  // by partial text match
  page.locator(':text("Using")');

  // by partial text match
  page.locator(':text-is("Using the Grid")');
});

test("User-facing Locators", async ({ page }) => {
  await page.getByRole("button", { name: "Sign in" }).first().click();

  // title="IoT Dashboard"
  await page.getByTitle("IoT Dashboard").click();

  // page.getAttribute
  // page.getByAltText
  // page.getByLabel
  // page.getByPlaceholder
  // page.getByText

  // data-testid="SignIn"
  await page.getByTestId("SignIn").click();
});

test("Child locator", async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(':text-is("Option 2")')
    .click();
  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();
  await page.locator("nb-card").nth(3).getByRole("button").click();
});

test("Parent locator", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();
  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("button", { name: "Submit" })
    .first()
    .click();
});

test("Reusing parameter", async ({ page }) => {
  // await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', { name : "Email"}).fill('test@test.com')
  // await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', { name : "Password"}).fill('Test1234')
  // await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('button', { name : "Submit"}).first().click()

  const basic = page.locator("nb-card").filter({ hasText: "Basic form" });
  const emailField = basic.getByRole("textbox", { name: "Email" });

  await emailField.fill("test@test.com");
  await basic.getByRole("textbox", { name: "Password" }).fill("Test1234");
  await basic.getByRole("button", { name: "Submit" }).first().click();

  await expect(emailField).toHaveValue("test@test.com");
});

test("Extracting Values", async ({ page }) => {
  // Single text value
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const buttonText = await basicForm.locator("button").textContent();
  console.log(buttonText);

  await expect(buttonText).toEqual("Submit");

  // All text value
  const allRadioBuottonLabel = await page.locator("nb-radio").allTextContents();

  console.log(allRadioBuottonLabel);
  await expect(allRadioBuottonLabel).toContain("Option 1");

  // Input value
  const basic = page.locator("nb-card").filter({ hasText: "Basic form" });
  const emailField = basic.getByRole("textbox", { name: "Email" });

  await emailField.fill("test@test.com");
  const emailValue = await emailField.inputValue();

  expect(emailValue).toEqual("test@test.com");
});

test("General Assertions", async ({ page }) => {

  // Value assertion
  const value = 5;
  expect(value).toEqual(5)

  const basicFormButton = page.locator("nb-card").filter({ hasText: "Basic form" }).locator('button');
  const buttonValue = await basicFormButton.textContent()

  expect(buttonValue).toEqual("Submit")
  
  // Locator assertion
  await expect(basicFormButton).toBeVisible()
  await expect(basicFormButton).toHaveText("Submit")

  // Soft assertion
  // event the before step is fail, but still continue the next step
  await expect.soft(basicFormButton).toHaveText("Submit2")
  await basicFormButton.click()

});

test("Auto-waiting", async ({ page }) => {});

test("Timeouts", async ({ page }) => {});
