import { Page } from '@playwright/test';

export class NavigationPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async navigate(){
        console.log('Result from NavigationPage')
    }
}