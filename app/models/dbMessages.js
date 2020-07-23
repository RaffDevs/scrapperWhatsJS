const db = require('../../config/dbConnection.js');
const logs = require("../src/Helpers/logs");
const { func } = require('../../config/dbConnection.js');



async function insertMessage(nameContact, message, origin = 'puppeteer') {

    let timeNow = new Date().toLocaleTimeString();
    let query;

    if (origin == 'puppeteer') {
        query =
            `INSERT INTO mensagens
            (mensagem_recebida, mensagem, data_mensagem, hora_mensagem, mensagem_nova, id_contato)
            VALUES ('T', '${message}', CURRENT_DATE, '${timeNow}', 'T', '${nameContact}')`;
    }

    
    else {
        query =
            `INSERT INTO mensagens
            (mensagem_recebida, mensagem, data_mensagem, hora_mensagem, mensagem_nova, id_contato)
            VALUES ('F', '${message}', CURRENT_DATE, '${timeNow}', 'T', '${nameContact}')`;
    };

    try {

        await db.none(query);

        console.log(`Mensagem de: ${nameContact} inserida com sucesso!`);
        
    }
    catch(error) {

        console.log(`Ocorreu um erro ao tentar inserir a mensagem de ${nameContact}`, error);

        logs(`Ocorreu um erro em dbMessages/insertMessageDB: ${error}`);

    };

};


async function getHistoryMessage(nameContact) {

    let query = `SELECT mensagem_recebida, mensagem, to_char(hora_mensagem, 'HH24:MI') 
    FROM mensagens WHERE id_contato = '${nameContact}' ORDER BY id;`;

    try {

        let history = await db.any(query);

        return history;

    }
    catch(error) {

        console.log("Ocooreu um erro ao pegar o historico de mensagem", error);
        
        logs(`Ocorreu um erro em dbMessage/getHistoryMessage: ${error}`);

    };


};


module.exports = {
    insert : insertMessage,
    history : getHistoryMessage
};