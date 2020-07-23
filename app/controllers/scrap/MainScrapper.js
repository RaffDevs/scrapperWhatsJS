const ContactListener = require('./ContactListener')();
const messageTraffic = require('../../models/dbMessageTrafic');
const MessageScrapper = require('./MessageScrapper')();
const msgWithContact = require('./msgWithContact');
const sleep = require('../../src/Helpers/sleep');
const logs = require('../../src/Helpers/logs');


module.exports = async (page) => {

    try {
        // Verifica se a div de contatos ja foi renderizada
        await page.waitFor('#side', { visible: true, timeout: 60000 });

        console.log('Iniciando o scrapp!');

        // Mantem o scrapp ativo
        while(true){

            // Verifica se há alguma conversa ativa tentando pegar o nome do contato.
            let contactSelector = await page.$("div[class='DP7CM'] > span[class*='_3ko75 _5h6Y_ _3Whw5']");

            if (contactSelector !== null) {

                let divNewMessageSelector = await page.$("div[class*='_9WQEN focusable-list-item']");

                if (divNewMessageSelector === null ) {

                    console.log('NULL');

                    // Captura o html da div de conversa
                    let divChat = await page.$("div[id='main']");
                    
                    let html = await (await divChat.getProperty('innerHTML')).jsonValue();

                    await MessageScrapper.stillScrapping(page, html);
                };
                
            };

            await sleep(500);

            let contactsNewMessage = await page.$x("//div[contains(@class, 'eJ0yJ _8Uqu5')]");

            if(contactsNewMessage.length > 0){
                
                await ContactListener.newConversation(page, contactsNewMessage);

            }
            else{

                console.log('Nenhum contato mandou mensagem!');
                
            };

            await sleep(500);

            let msgToWhats = await messageTraffic.msgToWhatsWeb();

            console.log('Verificando se há mensagens para seus contatos!');

            console.log('DEBUGANDO', msgToWhats);

            if (msgToWhats.length > 0) {

                await msgWithContact(page, msgToWhats)
                    
            }
            else{

                console.log('Nenhuma mensagem para seus contatos!');

            }

            // await messageTraffic.messageToPuppeteer()
            // .then(async(data) => {
                
            //     if(data.length > 0){
            //        await msgWithContact(page, data);
            //     }
            //     else{
            //         console.log('Nenhuma mensagem para seus contatos!');
            //     };
            // });

            await sleep(1000);

        }
        
    }catch(err){
        logs(`Um erro aconteceu em MainScrapper:  ${err}`);
    };
    

};
