const web_driver = require('selenium-webdriver');
const Promise = require('bluebird');
const chrome = require('selenium-webdriver/chrome');
const { By } = require('selenium-webdriver');
const reader = require('xlsx');
const selenium = require('selenium-webdriver');

/*  
After running the test.js file, the output will be an xlsx file. Which will contain all the titles, detailed descriptions, and links from the BBC home page. The test will run automatically after every five minutes. There are two ways (timeout interval and nested timeout) to solve this in javascript. Here I use the nested timeout method. For the first time, the program will generate an xlsx file. After that, in every run, a new sheet will generate under that xlsx file and store all the desired information in that sheet accordingly. 
*/

let count = 0;
let fileName = '';
let fileRead = '';
let refLink = [];

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

setTimeout(async function getBbcData() {

    const driver = new web_driver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless().windowSize({
            width: 400,
            height: 400
        }))
        .build();

    await driver.get("http://www.bbc.com");
    await Promise.delay(2000);

    const elements = await driver.findElements(By.xpath("//a[contains(@href, '/')]"));

    refLink = [];
    for (let i = 0; i < elements.length; i++) {
        const newsLink = await elements[i].getAttribute('href');
        refLink.push(newsLink);
    }

    let checkList = [];
    for (let i = 0; i < refLink.length; i++) {
        let description = null;
        let headline = null;
        await driver.get(refLink[i]);
        await Promise.delay(500);
        try {
            await driver.wait(selenium.until.elementLocated(By.xpath("//h1[contains(@class, '')]")), 40000);
            const link = await driver.findElement(By.xpath("//h1[contains(@class, '')]"));
            headline = await link.getText();
        } catch (error) {
            console.log(error);
        }
        try {
            const descriptionLocator = await driver.findElement(By.xpath("(//p[contains(@class, '')])[1]"));
            description = await descriptionLocator.getText();
        } catch (error) {
            console.log(error);
        }

        const value = {
            Headline: headline, Description: description, Link: refLink[i],
        };
        checkList.push(value);

    }

    await driver.quit();
    await Promise.delay(1000);

    if (count === 0) {
        try {
            const wsDefault = reader.utils.json_to_sheet(checkList);
            const wb = reader.utils.book_new();
            reader.utils.book_append_sheet(wb, wsDefault, "Sheet0");
            const randomValue1 = getRndInteger(9, 99999);
            const randomValue2 = getRndInteger(99999, 99999999);
            fileName = './File_' + randomValue1 + '_' + randomValue2 + '.xlsx';
            reader.writeFile(wb, fileName);
            fileRead = reader.readFile(fileName);
        } catch (error) {
            console.log(error);
        }
    } else {
        const ws = reader.utils.json_to_sheet(checkList);
        reader.utils.book_append_sheet(fileRead, ws, "Sheet" + count);
        reader.writeFile(fileRead, fileName);
    }
    count++;

    setTimeout(getBbcData, 6000);
}, 600);

