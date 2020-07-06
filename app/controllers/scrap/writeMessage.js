const dbMessageTrafic = require("../../models/dbMessageTrafic")();
const contactFinder = require("../../src/Helpers/contactFinder");
const sleep = require('sleep');

module.exports = (dados, page) => {
    return new Promise(async(resolve, reject) => {
        if(dados.length > 0){
            for(let obj of dados){
                if(obj.hasOwnProperty('id_contato')){
                    try{
                        let contato = page.$(`span[title*='${obj.id_contato}']`)
                        if(contato !== null){
                            await contato.click();
                            await page.type("div[class*= '_2FVVk _2UL8j'] > div._2FbwG", obj.mensagem);
                            await page.keyboard.press('Enter');
                            await dbMessageTrafic.updateMessages(obj.id);
                        }
                        else{
                            console.log('AQUIIII')
                            // await page.type("div[class*='_2FVVk cBxw-']", 'TESTEEEEE');
                        };

                        resolve()
                    
                    }catch(erro){
                        reject()
                    };
                    
                }
                else{
                    await page.type("div[class*= '_2FVVk _2UL8j'] > div._2FbwG", obj.mensagem);
                    await page.keyboard.press('Enter');
                    await dbMessageTrafic.updateMessages(obj.id);
                };
            };
        }
        else{
            console.log('Sem mensagens para o puppeteer!')
        }
    })
};