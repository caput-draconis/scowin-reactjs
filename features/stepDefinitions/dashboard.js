const { Given, Then } = require('cucumber')
const pom = require('./pom/dashboard')
const {expect} = require('expect')

require('chromedriver');

Given('{string} element', { timeout: 60000 }, async function (element) {
    switch(element){
        case 'root':
            this.element = pom.root;
            break;
        default:
            throw new Error('element not defined');
    }



});


Then('the element is identified in the page', { timeout: 60000 }, async function () {
    let isDisplayed = await this.driver.findElement(this.element).isDisplayed();
    expect(isDisplayed).toBeTruthy();
});
