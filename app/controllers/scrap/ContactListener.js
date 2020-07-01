const MessageScrapper = require('./MessageScrapper')();
const scrollDivMessages = require('../../src/Helpers/renderAllConversation');
const sleep = require('../../src/Helpers/sleep');
const readMore = require('../../src/Helpers/readMore');

module.exports = () => {

    this.newConversation = async (page) => {
        try {
            // Contato usado para estacionar o robo quando não houver mensagens
            const parkContact = await page.$x("//span[text()='+55 16 99305-4020']");
            await parkContact[0].click();
            // dbMessage.teste()

            // Busca por contatos que mandaram novas mensagens
            let contactsNewMessage = await page.$x("//div[contains(@class, 'eJ0yJ _8Uqu5')]");
            if (contactsNewMessage.length > 0) {
                console.log('Novos contatos mandaram mensagem!')
                
                    for(let contato of contactsNewMessage){

                        // Clica no contato e aguarda a div da conversa ser renderizada
                        console.log('Clicando em um novo contato!');
                        await contato.click();
                        await page.waitFor('#main', { visible: true, timeout: 50000 });
                        
                        // Função que faz o scroll da div de mensagens
                        // Sleep para aguardar o html renderizar
                        await scrollDivMessages(page);

                        //Função que verifica se tem algum link 'Leia Mais' nas mensagens
                        await readMore(page);

                        // Captura o html da div de conversa
                        let divChat = await page.$("div[id='main']");
                        let htmlChat = await (await divChat.getProperty('innerHTML')).jsonValue();
                        
                        // Função que faz um scrapper do html da conversa
                        await MessageScrapper.scrapNewMessages(htmlChat);
                    };
                
            }
            else {
                console.log('Nenhum contato mandou uma nova mensagem...');
            };
        } catch (err) {
            console.log('Um erro aconteceu em ContactListener.js', err);
        };

    };
    return this;
};