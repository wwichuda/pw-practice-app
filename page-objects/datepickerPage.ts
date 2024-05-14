import { Page, expect } from "@playwright/test";

export class DatepickerPage {
    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInCalendar(numberOfDaysFromToday)
        await expect(calendarInputField).toHaveValue(dateToAssert)

    }

    async selectDatepickerWithRangeFromToday(startDaysFromToday: number, endDateFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()

        const dateToAssertStart = await this.selectDateInCalendar(startDaysFromToday)
        const dateToAssertEnd = await this.selectDateInCalendar(endDateFromToday)

        await expect(calendarInputField).toHaveValue(`${dateToAssertStart} - ${dateToAssertEnd}`)


    }

    private async selectDateInCalendar(numberOfDaysFromToday: number){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonth = date.getMonth()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        console.log(`expectedDate: ${expectedDate}`)
        console.log(`expectedMonth: ${expectedMonth}`)
        console.log(`expectedMonthShort: ${expectedMonthShort}`)
        console.log(`expectedMonthLong: ${expectedMonthLong}`)
        console.log(`expectedYear: ${expectedYear}`)
        console.log(`dateToAssert: ${dateToAssert}`)

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        // console.log(`expectedMonthAndYear: ${expectedMonthAndYear}`)
        // console.log(`calendarMonthAndYear: ${calendarMonthAndYear}`)
        // console.log(!calendarMonthAndYear.includes(expectedMonthAndYear))

        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            
            // console.log(`expectedMonthAndYear: ${expectedMonthAndYear}`)
            // console.log(`calendarMonthAndYear: ${calendarMonthAndYear}`)
            // console.log(!calendarMonthAndYear.includes(expectedMonthAndYear))

            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        
        // console.log(`expectedMonthAndYear: ${expectedMonthAndYear}`)
        // console.log(`calendarMonthAndYear: ${calendarMonthAndYear}`)
        // console.log(!calendarMonthAndYear.includes(expectedMonthAndYear))

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()
        
        return dateToAssert
    }
}