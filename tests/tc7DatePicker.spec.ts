import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager"


test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Datepicker").click();
  });

  
test("Navigate to page object", async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(100)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(1,3)
});
