const { Given, Then, When } = require('cucumber')
const { expect } = require('expect');
const { By, Key } = require('selenium-webdriver');
const { sleep } = require('../lib/sleep')


Given('user is in {string} page', { timeout: 60000 }, async function (tab) {
    let arrTab = ['Home', 'Manage Student Details', 'Update Vaccination status', 'Generate Vaccination Reports', 'Manage Vaccination drive']
    let option = arrTab.includes(tab)
    expect(option).toBeTruthy();
    await this.driver.findElement(By.xpath(`//*[text()[contains(.,'${tab}')]]`)).click();
});


Then('user clicks on {string}', { timeout: 60000 }, async function (element) {
    let clicked = await this.driver.findElement(By.xpath(`//*[text()[contains(.,'${element}')]]`)).click();
    expect(clicked).toBeNull()
});

When('user enters data of new {string}', { timeout: 60000 }, async function (option) {
    this.option = option
    switch (this.option) {
        case 'student':
            this.id = Math.floor(1000 + (9999 - 1000) * Math.random());
            this.search = this.id
            await this.driver.findElement(By.name('id')).sendKeys(this.id)
            await this.driver.findElement(By.name('studentName')).sendKeys('cucumber test')
            await this.driver.findElement(By.id('dob')).sendKeys('12/03/2015', Key.RETURN)
            await this.driver.findElement(By.id('other')).click();
            await this.driver.findElement(By.name('bloodGroup')).sendKeys('A+')
            await this.driver.findElement(By.id('aadhar')).sendKeys(789987789987)
            break
        case 'vaccination drive':
            this.search = 'Covaxin'
            await this.driver.findElement(By.className('slots')).sendKeys(50)
            await this.driver.findElement(By.className('vaccine-date')).sendKeys('12/03/2025', Key.RETURN)
            await this.driver.findElement(By.className('doses-available')).sendKeys(50)
            break
        default:
            throw new Error('Unexpected option provided: ' + this.option)
    }
    let clicked = await this.driver.findElement(By.xpath(`//*[text()[contains(.,'Submit')]]`)).click();
    expect(clicked).toBeNull()
});

Then('the data is added', { timeout: 60000 }, async function () {
    let element
    if (this.option === 'student') {
        element = By.xpath('//input[@aria-label="filter data by Id"]');
    }
    else
        element = By.xpath('//input[@aria-label="filter data by Vaccine Name"]')
    await this.driver.findElement(element).sendKeys(this.search, Key.RETURN)
    await sleep(1000)
    expect(await this.driver.findElements(By.xpath(`//tbody/tr[@index]`)).then(found => !!found.length)).toBeTruthy();
});

