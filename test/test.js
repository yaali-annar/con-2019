const puppeteer = require('puppeteer-core');

const chromeOptions = {
    headless: false,
    defaultViewport: null,
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
};

const changePasswordTest = async (browser, oldPassword, newPassword) => {

    const page = await browser.newPage();
    await page.goto('http://localhost');
    await page.evaluate(() => {
        localStorage.setItem('magicWords', 'simsimsalabim');
    });
    await page.goto('http://localhost/index.html#/entry');

    await page.waitForSelector('#loading-overlay.hidden');
    await page.type('[data-name="email"]', 'pyurio@gmail.com');
    await page.type('[data-name="password"]', oldPassword);
    await page.click("#button-login");

    await page.waitForSelector('#loading-overlay.hidden');
    await page.click('[data-text-id="menu.editData"]');

    await page.waitForSelector('[data-name="oldPassword"]');
    await page.type('[data-name="oldPassword"]', oldPassword);
    await page.type('[data-name="newPassword"]', newPassword);

    await page.waitForSelector('#loading-overlay.hidden');
    await page.click('[data-text-id="menu.logOut"]');

    await page.waitForSelector('#loading-overlay.hidden');
    await page.goto('http://localhost/index.html#/entry');

    await page.waitForSelector('#loading-overlay.hidden');
    await page.type('[data-name="email"]', 'pyurio@gmail.com');
    await page.type('[data-name="password"]', newPassword);
    await page.click("#button-login");

    console.log("Succesfully Changed Password");
};

const registerTest = async (browser) => {
    const page = await browser.newPage();
    await page.goto('http://localhost');
    await page.evaluate(() => {
        localStorage.setItem('magicWords', 'simsimsalabim');
    });
    await page.goto('http://localhost/index.html#/entry');
    await page.waitForSelector('#loading-overlay.hidden');
    await page.click("#link-register");
    await page.type('[data-name="email"]', 'pyurio@gmail.com');
    await page.type('[data-name="password"]', 'katasandi');
    await page.type('[data-name="preferredName"]', 'Yaali Annar');
    await page.type('[data-name="legalName"]', 'Iskela Liban');
    await page.type('[data-name="birthDate"]', '1988-08-08');
    await page.click('[data-ticket-tier-id="3"]');
    await page.click('[data-name="dinner"]');
    //browser.close();
};

const main = async () => {
    const browser = await puppeteer.launch(chromeOptions);
    await changePasswordTest(browser, 'katasandi', 'katasandibaru');
};
main();