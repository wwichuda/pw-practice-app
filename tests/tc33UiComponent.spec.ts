import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText("Forms").click();
        await page.getByText("Form Layouts").click();
    })

    test("33.Input Fields", async ({ page }) => {
        const emailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})
        await emailInput.fill('test@test.com')
        await emailInput.clear()
        await emailInput.pressSequentially('test2@test.com', {delay: 500})
        expect(emailInput).toHaveValue('test2@test.com')
    })
    
    test("34.Radio Button", async ({ page }) => {
        const gridFrom = page.locator('nb-card', {hasText: 'Using the Grid'})
        // await gridFrom.getByLabel('Option 1').check({force: true})
        await gridFrom.getByRole('radio',{ name: "Option 2"}).check({force: true})
        const radioStatuOption1 = await gridFrom.getByRole('radio', { name: "Option 1"}).isChecked()
        const radioStatuOption2 = await gridFrom.getByRole('radio', { name: "Option 2"}).isChecked()
        const radioStatsDisabledOption = await gridFrom.getByRole('radio', { name: "Disabled Option"}).isDisabled()


        expect(radioStatuOption1).toBeFalsy()
        expect(radioStatuOption2).toBeTruthy()
        expect(radioStatsDisabledOption).toBeTruthy()

    })
})

test.describe('Modal & Overlays page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText("Modal & Overlays").click();
        await page.getByText("Toastr").click();
    })

    test("35.Checkboxes", async ({ page }) => {
        await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})
        await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).uncheck({force: true})
        await page.getByRole('checkbox', {name: 'Show toast with icon'}).uncheck({force: true})

        const allBoxes = page.getByRole('checkbox')

        for(const box of await allBoxes.all()){
            await box.check({force: true})
            expect(await box.isChecked()).toBeTruthy()
        }

        for(const box of await allBoxes.all()){
            await box.uncheck({force: true})
            expect(await box.isChecked()).toBeFalsy()
        }

    })
    
})

test.describe('Lists and Dropdodwns', () => {
    test("36.Lists and Dropdodwns", async ({ page }) => {
        const dropdownMenu = page.locator('ngx-header nb-select')
        await dropdownMenu.click()

        page.getByRole('list') //when the list has a UL tag
        page.getByRole('listitem') //when the list has a LI tag
    
        // const optionList = await page.getByRole('list').locator('nb-option', {hasText: 'Light'})
        const optionList = page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

        const optionLight = page.locator('nb-option-list nb-option', {hasText: 'Dark'})
        await optionLight.click()

        const theme = await page.locator('.nb-theme-dark').isVisible()
        expect(theme).toBeTruthy()


        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color','rgb(34, 43, 69)')

        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)"
        }

        await dropdownMenu.click()
        for(const color in colors){
            await optionList.filter({hasText: color}).click()
            await expect(header).toHaveCSS('background-color', colors[color])
            if(color!="Corporate"){
                await dropdownMenu.click()
            }
        }
    })
    
})

test.describe('Tooltips', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText("Modal & Overlays").click();
        await page.getByText("Tooltip").click();
    })

    test("37.Tooltips", async ({ page }) => {
        const tooltipCard = page.locator('nb-card', { hasText: "Tooltip Placements"})
        await tooltipCard.getByRole('button', {name: "Top"}).hover()

        const tooltip = await page.locator('nb-tooltip').textContent()
        expect(tooltip).toEqual('This is a tooltip')
    })
    
})


test.describe('Tables & Data', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText("Tables & Data").click();
    })

    test("38.Dialog box with browser control", async ({ page }) => {
        await page.getByText("Smart Table").click();

        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })

        await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
        await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
    })
    
})