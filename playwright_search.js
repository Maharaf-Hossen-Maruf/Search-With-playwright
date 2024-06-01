const { chromium } = require('playwright');

(async () => {

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Go to Google search engine
    await page.goto('https://www.google.com', { waitUntil: 'networkidle' });

    // Wait for the page to load completely
    await page.waitForTimeout(3000); // Wait for 5 seconds

    // Define the search term
    const searchWord = 'seikh Hasina vs Khaleda Jia';

    // Fill the search input box with the search term
    await page.fill('#APjFqb', searchWord);

    // Press Enter to perform the search
    await page.keyboard.press('Enter');

    // Wait for the search results to load
    await page.waitForSelector('#search');

    await page.waitForTimeout(5000);
    // Extract the titles of the search results
    const results = await page.$$eval('h3', headers => headers.map(header => header.innerText));

    // Log the search results to the console
    console.log(`Search results for "${searchWord}":`);
    results.forEach((result, index) => {
        console.log(`${index + 1}: ${result}`);
    });

    // Close the browser
    await browser.close();
})();
