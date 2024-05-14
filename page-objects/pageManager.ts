import { Page } from "@playwright/test"
import { DatepickerPage } from "../page-objects/datepickerPage"

export class PageManager{
    private readonly page:Page
    private readonly datepickerPage:DatepickerPage

    constructor(page: Page){
        this.page = page
        this.datepickerPage = new DatepickerPage(this.page)
    }
    
    onDatepickerPage(){
        return this.datepickerPage
    }
}