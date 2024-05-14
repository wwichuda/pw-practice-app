import { Page } from "@playwright/test"
import { DatepickerPage } from "../page-objects/datepickerPage"

export class PageHelperBase{
    private readonly page:Page
    private readonly datepickerPage:DatepickerPage

    constructor(page: Page){
        this.page = page
    }
    
    async waitFroNumberOfSeconds(timeInSeconds: number){
        return this.page.waitForTimeout(timeInSeconds * 1000)
    }
}