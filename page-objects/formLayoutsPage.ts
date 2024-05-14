import { Page } from "@playwright/test";

export class FromLayoutsPage {

    readonly page: Page
    
    constructor(page: Page){
        this.page = page
    }
}