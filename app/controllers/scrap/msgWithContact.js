const dbMessageTrafic = require('../../models/dbMessageTrafic')
const sleep = require('../../src/Helpers/sleep');
const logs = require('../../src/Helpers/logs');

module.exports = async (page, dados) => {

    for (let obj of dados) {

        let contato = await page.$(`span[title='${obj.id_contato}']`);

        try {

            if (contato === null) {

                await page.click("div[class*='_2FVVk cBxw-']");

                await page.keyboard.type(obj.id_contato);

                await sleep(1000);

                let matchContact = await page.$x(`//span[contains(@title,'${obj.id_contato}')]`);

                for (let el of matchContact) {

                    await el.click();
                    
                }

                if (obj.mensagem.includes('\n')) {

                    let arrayMsg = obj.mensagem.split('\n');

                    for (let msg of arrayMsg) {

                        await page.type("div[class*= '_2FVVk _2UL8j'] > div._2FbwG", msg);

                        await page.keyboard.down('ShiftLeft');

                        await page.keyboard.press('Enter');
                        
                        await page.keyboard.up('ShiftLeft');

                    };

                    await page.keyboard.press('Enter');

                }
                else {

                    await page.type("div[class*= '_2FVVk _2UL8j'] > div._2FbwG", obj.mensagem);

                    await page.keyboard.press('Enter');

                }

                
                await dbMessageTrafic.updateMsg(obj.id);

                await sleep(1000);

                await page.click("button[class='_3e4VU']");

            }
            else {

                await contato.click();

                await page.type("div[class*= '_2FVVk _2UL8j'] > div._2FbwG", obj.mensagem);

                await page.keyboard.press('Enter');

                await dbMessageTrafic.updateMsg(obj.id);

            }
        } catch (erro) {

            logs(`Um erro ocorreu em msgWithContact: ${erro}`);

        };
    };


}