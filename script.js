const puppeteer = require('puppeteer');
const fs = require('fs');
const { removeGoogleUrls } = require('./src/utils/utils.js');

const express = require('express');
const app = express();

const search = async (query) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${query}&source=lnms&tbm=nws`);
    await page.screenshot({ path: 'fullpage.png', fullPage: true });

    const results = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a'));
        let links = anchors.map(anchor => anchor.href);
        links = links.filter(link => link !== undefined);
        return links;
    });
    
    let filteredLinks = removeGoogleUrls(results);


    fs.writeFileSync('results.json', JSON.stringify(filteredLinks, null, 2));

    await browser.close();
}

search('Marvel');

// https://www.google.com/search?q=2012&source=lnms&tbm=nws


// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });
