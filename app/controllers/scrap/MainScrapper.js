const ContactListener = require('./ContactListener')();
const sleep = require('../../src/Helpers/sleep');

module.exports = async (page) => {

    try {
        // Verifica se a div de contatos ja foi renderizada
        await page.waitFor('#side', { visible: true, timeout: 60000 });

        console.log('Iniciando o scrapp!')

        // Mantem o scrapp ativo
        while(true){
            console.log('Ouvindos mensagens dos contatos!')
            await ContactListener.newConversation(page)
            await sleep(2000)
        }
        
    }catch(err){
        console.log('Um erro aconteceu em MainScrapper', err);
    };
    

};
