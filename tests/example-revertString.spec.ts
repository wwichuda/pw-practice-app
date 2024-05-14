import{ test, expect } from '@playwright/test'

test('', async ({page}) => { 
    let str = 'test'
    let reverseStr = ''
    // console.log(`${str} ${str.length}`)

    console.log(`String: ${str}`)

    for(let i=str.length-1; i >= 0; i--){
        reverseStr = reverseStr.concat(str[i])
    }

    console.log(`String: ${reverseStr}`)

})