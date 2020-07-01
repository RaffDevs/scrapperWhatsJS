const cheerio = require('cheerio');
const dbMessage = require('../../models/dbMessages')();


module.exports = () => {

    // Função responsável por fazer o scrapp das mensagens do html passado por parametro
    this.scrapNewMessages = async(html) => {
        try{
            console.log('Fazendo scrap mensagens!')

            // Carrega o cheerio passando o html da conversa
            let $ = cheerio.load(html)

            let contactName = $("div[class='DP7CM']").text()
            console.log('Entrei no contato: ', contactName);

            // Pega todas as mensagens enviadas pelo o usuario
            $("div[class*='_9WQEN focusable-list-item']")
                .nextAll('div[class*="message-in"]')
                .each((i, element) => {
                    let msg = $(element).find("span[class*='_3Whw5 selectable-text invisible-space copyable-text']").text()
                    console.log('Inserindo mensagem...')
                    console.log(`Contato: ${contactName}  Mensagem: ${msg}`);
                    dbMessage.insertMessageDB(contactName, msg, origin='puppeteer')
                });
        }catch(err){
            console.log('Um erro aconteceu em MessageScrapper.js', err);
        };
    };
    return this;
};