const puppeteer = require('puppeteer');
const { removeGoogleUrls } = require('../utils/utils.js');


const fetchNewsUrls = async (keyword) => {
    // Fetch news urls from google news
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${keyword}&source=lnms&tbm=nws`);
    await page.screenshot({ path: 'fullpage.png', fullPage: true });

    const results = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a'));
        let links = anchors.map(anchor => anchor.href);
        links = links.filter(link => link !== undefined);
        return links;
    });
    
    let filteredLinks = removeGoogleUrls(results);

    await browser.close();

    return filteredLinks;
}


const scrapKeywords = async (req, res) => {
    const { keyword } = req.body;
    const newsUrls = await fetchNewsUrls(keyword);
    res.status(200).json(newsUrls);
}

module.exports = {
    scrapKeywords
}