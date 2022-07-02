const { Before } = require("cucumber");
const { Builder, until, By } = require("selenium-webdriver");
const baseURL = require('../../../src/testEnvironment')

Before({ timeout: 60000 }, async function () {
    this.URL = `${baseURL()}/scowin-reactjs/`
    try {
        this.driver = await new Builder().forBrowser('chrome').build();
        await this.driver.get(this.URL);
        await this.driver.manage().window().maximize();
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(By.xpath('//div[@class="App"]'))))
    }
    catch (exception) {
        console.log("Unable to start driver ", exception);
    }

});

