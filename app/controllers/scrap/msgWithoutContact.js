const dbMessageTrafic = require("../../models/dbMessageTrafic");
const logs = require('../../src/Helpers/logs');


module.exports = async(page,dados) => {

    try{
        
        for(let obj of dados){

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

            };
            
            await dbMessageTrafic.updateMsg(obj.id);

        };
    }catch(erro){

        logs(`Aconteceu um erro em msgWithoutContact: ${erro}`);

    };
    
};