import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/NavigationPage"

test("Navigate to page object", async ({ page }) => {
    const navigationPage = new NavigationPage(page)
    await navigationPage.navigate()
});
