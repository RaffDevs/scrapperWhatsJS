const db = require('../../config/dbConnection.js');
const logs = require("../src/Helpers/logs");


async function insertApiMessage(contactName, message, target='puppeteer') {


    let timeNow = new Date().toLocaleTimeString();
    let query;

    // Se target == 'puppeteer' : Mensagem capturada do whatsappweb
    if (target !== 'puppeteer') {
        query =
            `INSERT INTO mensagens
        (mensagem_recebida, mensagem, data_mensagem, hora_mensagem, mensagem_nova, id_contato)
        VALUES ('T', '${message}', CURRENT_DATE, '${timeNow}', 'T', '${contactName}')`;
    }

    // Se target == 'frontend' : Mensagem capturada do front
    else {
        query =
            `INSERT INTO mensagens
        (mensagem_recebida, mensagem, data_mensagem, hora_mensagem, mensagem_nova, id_contato)
        VALUES ('F', '${message}', CURRENT_DATE, '${timeNow}', 'T', '${contactName}')`;
    };

    try {

        await db.none(query);
        console.log('Mensagem inserida via api!');
    }
    catch(error) {

        console.log("Erro ao inserir mensagem via api!");

    }
    
};

module.exports = {
    insertApi: insertApiMessage
};