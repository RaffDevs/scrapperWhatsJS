const cheerio = require('cheerio');
const dbMessage = require('../../models/dbMessages')();
const dbMessageTrafic = require('../../models/dbMessageTrafic')()
const writeMessage = require('./msgWithoutContact')

module.exports = () => {

    // Função responsável por fazer o scrapp das mensagens do html passado por parametro
    this.scrapNewMessages = async(page, html) => {
        try{
            console.log('Fazendo scrap mensagens!');

            // Carrega o cheerio passando o html da conversa
            let $ = cheerio.load(html);

            let contactName = $("div[class='DP7CM']").text()
            console.log('Entrei no contato: ', contactName);

            // Pega todas as mensagens enviadas pelo o usuario
            $("div[class*='_9WQEN focusable-list-item']")
                .nextAll('div[class*="message-in"]')
                .each((i, element) => {
                    let rawMsg = $(element).find("span[class*='_3Whw5 selectable-text invisible-space copyable-text']").text();
                    let msg = rawMsg.length > 0 ? rawMsg : '-MIDIA-';
                    console.log('Inserindo mensagem...');
                    console.log(`Contato: ${contactName}  Mensagem: ${msg}`);
                    dbMessage.insertMessageDB(contactName, msg, origin='puppeteer');
                });

            dbMessageTrafic.messageToPuppeteer(nome=contactName)
                .then(async(data) => {
                    console.log('Verificando se há mensagens para o contato ', contactName)
                    if(data.length > 0){
                        await writeMessage(page, data)
                    }
                    else{
                        console.log('Sem mensagens para ', contactName)
                    };
                });
        }catch(err){
            console.log('Um erro aconteceu em MessageScrapper.js', err);
        };
    };

    // Função responsável por fazer o scrapp da conversa ativa
    this.stillScrapping = async(page, html) => {

        // Carrega o cheerio passando o html da conversa
        let $ = cheerio.load(html);

        let contactName = $("div[class='DP7CM']").text()
        console.log('Entrei no contato: ', contactName);

        dbMessageTrafic.getLastMessage(contactName)
            .then((data)=> {

                let lastMessage = data[0].mensagem;

                if(lastMessage !== undefined){

                    let divLastMessage = $(`span:contains('${lastMessage}')`);

                    if(divLastMessage.html() !== null){

                        divLastMessage
                        .last()
                        .closest("div[class*='message-in']")
                        .nextAll("div[class*='message-in']")
                        .each((i, element) => {
                            let msg = $(element).find("span[class*='_3Whw5 selectable-text invisible-space copyable-text']").text();
                            console.log('Inserindo mensagem...');
                            console.log(`Contato: ${contactName}  Mensagem: ${msg}`);
                            dbMessage.insertMessageDB(contactName, msg, origin='puppeteer');
                        });

                    }
                    else{
                        console.log('Sem mensagens de: ', contactName);
                    };
                        
                };
                
            });
        
        dbMessageTrafic.messageToPuppeteer(nome=contactName)
            .then(async(data) => {
                console.log('Verificando se há mensagens para o contato ', contactName)
                if(data.length > 0){
                    await writeMessage(page, data)
                }
                else{
                    console.log('Sem mensagens para ', contactName)
                };
            }); 


    };
    return this;
};