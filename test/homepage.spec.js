const puppeteer = require('puppeteer');
const { port } = require('../jest-puppeteer.config').server;

const siteRoot = `http://localhost:${port}`;

describe('Homepage', () => {
  let browser = '';
  let page = '';

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400,
      },
      userAgent: '',
    });

    await page.goto(`${siteRoot}/`);
  });

  afterAll(async () => {
    browser.close();
  });

  test('Site title is visible', async () => {
    await page.waitForSelector('h1');

    const html = await page.$eval('h1 a', e => e.innerHTML);
    expect(html).toBe('Kalin Chernev');
  });

  test('Older blog posts are accessible', async () => {
    await page.waitForSelector('#___gatsby');

    const html = await page.$eval('#___gatsby', e => e.innerHTML);
    expect(html).toContain('Older posts');
  });
});
