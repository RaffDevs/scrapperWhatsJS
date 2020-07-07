const MessageScrapper = require('./MessageScrapper')();
const scrollDivMessages = require('../../src/Helpers/renderAllConversation');
const readMore = require('../../src/Helpers/readMore');
const sleep = require('../../src/Helpers/sleep');
const logs = require('../../src/Helpers/logs');

module.exports = () => {

    this.newConversation = async (page, arrayContatos) => {
        try {
            
            // Busca por contatos que mandaram novas mensagens
            
            console.log('Novos contatos mandaram mensagem!')
            
                for(let contato of arrayContatos){

                    // Clica no contato e aguarda a div da conversa ser renderizada
                    console.log('Clicando em um novo contato!');
                    await contato.click();
                    await page.waitFor('#main', { visible: true, timeout: 50000 });
                    
                    // Função que faz o scroll da div de mensagens
                    // Sleep para aguardar o html renderizar
                    await scrollDivMessages(page);

                    //Função que verifica se tem algum link 'Leia Mais' nas mensagens
                    await readMore(page);
                    
                    await sleep(500);

                    // Captura o html da div de conversa
                    let divChat = await page.$("div[id='main']");
                    let html = await (await divChat.getProperty('innerHTML')).jsonValue();

                    // Função que faz um scrapper do html da conversa
                    await MessageScrapper.scrapNewMessages(page, html);

                };
                
            } catch (err) {
            logs(`Um erro aconteceu na função newConversation:  ${err}`);
        };

    };
    return this;
};