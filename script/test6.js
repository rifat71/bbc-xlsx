const web_driver = require('selenium-webdriver');
const Promise = require('bluebird');
const chrome = require('selenium-webdriver/chrome');
const { By } = require('selenium-webdriver');
const reader = require('xlsx');
const selenium = require('selenium-webdriver');
var map = web_driver.promise.map;

async function getBbcData() {

    const driver = new web_driver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless().windowSize({
            width: 400,
            height: 400
        }))
        .build();

    await driver.get("https://www.bbc.com/news/world-australia-60014059");
    await Promise.delay(2000);

    try {
        const descriptionLocator = await driver.findElements(By.xpath("//div[@data-component='text-block']/*/p"));
        map(descriptionLocator, e => e.getAttribute("innerText")).then(async function (values) {
            console.log(values);
        });
    } catch (error) {
        console.log(error);
    }

    await driver.quit();
    await Promise.delay(1000);
}

getBbcData();