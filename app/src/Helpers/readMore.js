const sleep = require('./sleep');
const logs = require("./logs");

module.exports = async(page) =>{
    try{
        if(await page.$('._2spA0') !== null){
            console.log('Tratando mensagens resumidas...')
            let readLinks = await page.$$("span[class='_2spA0']");
            for(let link of readLinks){
                await link.click();
            };
            await sleep(1000);
        };
    }catch(err){
        logs(`Ocorreu um erro em readMore: ${err}`);
    };
};
    