const puppeteer = require('puppeteer');

describe('Homepage', () => {
  test('Site title is visible', async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400,
      },
      userAgent: '',
    });

    await page.goto('http://localhost:9000/');
    await page.waitForSelector('h1');

    const html = await page.$eval('h1 a', e => e.innerHTML);
    expect(html).toBe('Kalin Chernev');

    browser.close();
  });
});
