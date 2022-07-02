const { Before } = require("cucumber");
const {Builder} = require("selenium-webdriver");
const baseURL = require('../../../src/testEnvironment')

Before({timeout: 60000},async function(){
    this.URL = `${baseURL()}/scowin-reactjs/`
    try {
        this.driver = await new Builder().forBrowser('chrome').build();
        await this.driver.get(this.URL);
        await this.driver.manage().window().maximize();
    }
    catch (exception) {
        console.log("Unable to start driver ", exception);
    }

});

