const { Given, Then } = require('cucumber')
const {expect} = require('expect');
const { By } = require('selenium-webdriver');

require('chromedriver');

Given('{string} element', { timeout: 60000 }, async function (element) {
    switch(element){
        case 'root':
            this.element = await this.driver.findElement(By.id('root'));
            break;
        default:
            throw new Error('element not defined');
    }



});


Then('the element is identified in the page', { timeout: 60000 }, async function () {
    let isDisplayed = await this.driver.findElement(this.element).isDisplayed();
    expect(isDisplayed).toBeTruthy();
});
