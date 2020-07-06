const dbMessageTrafic = require('../../models/dbMessageTrafic')()
const sleep = require('../../src/Helpers/sleep');

module.exports = async(page, dados) => {
    for(let obj of dados){

        let contato = await page.$(`span[title='${obj.id_contato}']`);

        try{
            if(contato === null){
                await page.click("div[class*='_2FVVk cBxw-']");
                await page.keyboard.type(obj.id_contato);
                await sleep(1000);
                let matchContact = await page.$x(`//span[contains(@title,'${obj.id_contato}')]`);
                for(let el of matchContact){
                    await el.click();
                }
                await page.type("div[class*= '_2FVVk _2UL8j'] > div._2FbwG", obj.mensagem);
                await page.keyboard.press('Enter');
                await dbMessageTrafic.updateMessages(obj.id);
                await sleep(1000);
                await page.click("button[class='_3e4VU']");
               
            }
            else{
                await contato.click();
                await page.type("div[class*= '_2FVVk _2UL8j'] > div._2FbwG", obj.mensagem);
                await page.keyboard.press('Enter');
                await dbMessageTrafic.updateMessages(obj.id);
            }
        }catch(erro){
            console.log('ERR', erro);
        };
    };


}