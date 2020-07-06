const ContactListener = require('./ContactListener')();
const messageTraffic = require('../../models/dbMessageTrafic')();
const MessageScrapper = require('./MessageScrapper')();
const writeMessage = require('./msgWithContact');
const sleep = require('../../src/Helpers/sleep');


module.exports = async (page) => {

    try {
        // Verifica se a div de contatos ja foi renderizada
        await page.waitFor('#side', { visible: true, timeout: 60000 });

        console.log('Iniciando o scrapp!');

        // Mantem o scrapp ativo
        while(true){

            // Verifica se há alguma conversa ativa tentando pegar o nome do contato.
            let contactSelector = await page.$("div[class='DP7CM'] > span[class*='_3ko75 _5h6Y_ _3Whw5']");

            if(contactSelector !== null){

                let contactOnListen = await(await contactSelector.getProperty("textContent")).jsonValue();

                // Captura o html da div de conversa
                let divChat = await page.$("div[id='main']");
                let html = await (await divChat.getProperty('innerHTML')).jsonValue();

                MessageScrapper.stillScrapping(page, html);
                
            }

            await sleep(500);

            let contactsNewMessage = await page.$x("//div[contains(@class, 'eJ0yJ _8Uqu5')]");

            if(contactsNewMessage.length > 0){
                await ContactListener.newConversation(page, contactsNewMessage);
            }
            else{
                console.log('Nenhum contato mandou mensagem!');
            };

            await sleep(500);

            await messageTraffic.messageToPuppeteer()
            .then(async(data) => {
                console.log('Verificando se há mensagens para seus contatos!');
                if(data.length > 0){
                   await writeMessage(page, data);
                }
                else{
                    console.log('Nenhuma mensagem para seus contatos!');
                };
            });

            await sleep(1000);

        }
        
    }catch(err){
        console.log('Um erro aconteceu em MainScrapper', err);
    };
    

};
