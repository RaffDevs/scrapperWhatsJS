const cheerio = require('cheerio');
const dbMessage = require('../../models/dbMessages');
const dbMessageTrafic = require('../../models/dbMessageTrafic')
const writeMessage = require('./msgWithoutContact');
const logs = require('../../src/Helpers/logs');

module.exports = () => {

    // Função responsável por fazer o scrapp das mensagens do html passado por parametro
    this.scrapNewMessages = async(page, html) => {
        try{
            console.log('Fazendo scrap mensagens!');

            // Carrega o cheerio passando o html da conversa
            let $ = cheerio.load(html);

            let contactName = $("div[class='DP7CM']").text();
            
            console.log('Entrei no contato: ', contactName);

            // Pega todas as mensagens enviadas pelo o usuario
            $("div[class*='_9WQEN focusable-list-item']")
                .nextAll('div[class*="message-in"]')
                .each((i, element) => {

                    let rawMsg = $(element).find("span[class*='_3Whw5 selectable-text invisible-space copyable-text']").text();

                    let msg = rawMsg

                    if (msg !== undefined && msg.length > 0) {

                        console.log('Inserindo mensagem...');

                        console.log(`Contato: ${contactName}  Mensagem: ${msg}`);

                        dbMessage.insert(contactName, msg, origin='puppeteer')
                            .then(() => {
                                console.log('Insert realizado com sucesso!');
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }
                    else {

                        console.log('Envio de midia');

                    };
 
                });


            let mensagensToWhats = await dbMessageTrafic.msgToWhatsWeb(nome=contactName);

            console.log('Verificando se há mensagens para o contato ', contactName);

            if (mensagensToWhats.length > 0) {

                await writeMessage(page, mensagensToWhats);

            }
            else {

                console.log('Sem mensagens para ', contactName);

            };

            
        }catch(err){
            logs(`Um erro ocorreu em scrapNewMessages:  ${err}`);
        };
    };




    // Função responsável por fazer o scrapp da conversa ativa
    this.stillScrapping = async(page, html) => {

        try{
            // Carrega o cheerio passando o html da conversa
            let $ = cheerio.load(html);

            let contactName = $("div[class='DP7CM']").text();

            console.log('Entrei no contato: ', contactName);

            let lastMsg = await dbMessageTrafic.getLastMsg(contactName);


            if (lastMsg.mensagem !== undefined) {

                let divLastMessage = $(`span:contains('${lastMsg.mensagem}')`);

                if (divLastMessage.html() !== null) {

                    divLastMessage
                        .last()
                        .closest("div[class*='message-in']")
                        .nextAll("div[class*='message-in']")
                        .each((i, element) => {

                            let rawMsg = $(element).find("span[class*='_3Whw5 selectable-text invisible-space copyable-text']").text();

                            let msg = rawMsg;

                            if (msg !== undefined && msg.length > 0) {

                                console.log('Inserindo mensagem...');

                                console.log(`Contato: ${contactName}  Mensagem: ${msg}`);

                                dbMessage.insert(contactName, msg, origin='puppeteer')
                                    .then(() => {
                                        console.log('Insert realizado com sucesso!');
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }
                            else {

                                console.log('Envio de midia');

                            };

                        });

                }
                else {

                    console.log('Sem mensagens de: ', contactName);

                };

            }
            
            
            let msgToCurrentContact = await dbMessageTrafic.msgToWhatsWeb(nome=contactName);

            console.log('Verificando se há mensagens para o contato ', contactName);

            if (msgToCurrentContact.length > 0) {

                await writeMessage(page, msgToCurrentContact);

            }
            else {

                console.log('Sem mensagens para ', contactName)

            };
            
            
        }catch(err){
            
            logs(`Um erro ocorreu em stillScrapping:  ${err}`);
        }

    };
    return this;
};