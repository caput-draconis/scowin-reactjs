const { Before } = require("cucumber");
const {Builder} = require("selenium-webdriver");
const sleep = ms => new Promise(r => setTimeout(r, ms));

Before({timeout: 60000},async function(){
    this.URL = 'http://127.0.0.1:3000/scowin-reactjs/'
    try {
        this.driver = await new Builder().forBrowser('chrome').build();
        await this.driver.get(this.URL);
        await this.driver.manage().window().maximize();
    }
    catch (exception) {
        console.log("Unable to start driver ", exception);
    }

});

