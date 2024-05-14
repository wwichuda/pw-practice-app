import{ test, expect } from '@playwright/test'

test('', async ({page}) => { 
    /**
     * Generate pibonacci value
     * Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ... 
     */

    let x = 0
    let y = 1
    for(let i=1; i < 20; i++){
        let z = x + y
        console.log(`${x} + ${y} = ${z}`)
        
        x = y
        y = z
    }
        
})