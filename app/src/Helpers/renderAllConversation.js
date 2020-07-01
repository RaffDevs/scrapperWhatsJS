/**
 * Quando o contato manda varias mensagens, a div da conversa se inicia no começo da primeira mensagem.
 * Então preciso fazer o scroll até a ultima mensagem para o html da mensagem ser renderizado.
 */

const sleep = require('../../src/Helpers/sleep');

module.exports = async(page) =>{
    try{
        await page.evaluateHandle(()=>{
            let div = document.querySelector('._2-aNW');
            div.scrollTo(0, div.scrollHeight + 1000);
        });
        console.log('Scroll finalizado!');
        await sleep(1000)
    }
    catch(err){
        console.log('Aconteceu um erro no scroll', err)
    }

};
