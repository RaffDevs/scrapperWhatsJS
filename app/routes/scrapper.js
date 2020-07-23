const puppeteer = require('puppeteer');
const mainScrapper = require('../controllers/scrap/MainScrapper');
const screenShot = require('../src/Helpers/screenShot');
const cheerio = require('cheerio');


module.exports = (app)=>{
        app.get('/scrapper', async(req, res)=>{
            const browser = await puppeteer.launch({headless: false});
            // const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
            await page.setDefaultNavigationTimeout(0);
            await page.goto('https://web.whatsapp.com/');
            setTimeout(async() =>{
                await screenShot(page);
                await res.redirect('/login');
                await mainScrapper(page);
            }, 5000);
        });
    
};