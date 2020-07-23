const db = require('../../config/dbConnection.js');
const logs = require("../src/Helpers/logs");


async function messagesToFront() {

    let query = `SELECT id, id_contato, mensagem, to_char(hora_mensagem, 'HH24:MI') 
    FROM mensagens WHERE mensagem_recebida = 'true' AND mensagem_nova = 'true' ORDER BY id ASC`;

    try {

        let messages = await db.any(query);

        return messages;

    }
    catch(error) {

        console.log('Um erro ocorreu em dbMessageTrafic/messagesToFront', error);

        logs(`Um erro ocorreu em dbMessagesTrafic/messagesToFront: ${error}`);

    };


};

async function updateMessages(id) {

    let query = `UPDATE mensagens SET mensagem_nova = 'false' WHERE id = '${id}'`;

    try {

        await db.none(query);

        console.log(`Mensagem ${id} atualizada com sucesso!`);

    }
    catch(error) {

        console.log(`Ocorreu um erro em dbMessageTrafic/updateMessages`, error);

        logs(`Ocorreu um erro em dbMessageTrafic/updateMessages: ${error}`);

    };


};

async function messagesToPuppeteer(nome=false) {

    let query;

    if(nome === false){
        query = "SELECT id, id_contato, mensagem FROM mensagens WHERE mensagem_recebida = 'false' AND mensagem_nova = 'true' ORDER BY id ASC ";
    }

    else{
        query = `SELECT id, mensagem FROM mensagens WHERE id_contato = '${nome}' AND mensagem_recebida = 'false' AND mensagem_nova = 'true' ORDER BY id ASC`;
    };

    try {

        let messages = await db.any(query);

        return messages;

    }
    catch(error) {

        console.log(`Ocorreu um erro em dbMessageTrafic/messagesToPuppteer`, error);

        logs(`Ocorreu um erro em dbMessageTrafic/messagesToPuppteer: ${error}`);

    };


};

async function getLastMessage(nome) {

    let query = `SELECT mensagem FROM mensagens WHERE id_contato = '${nome}'
                    AND mensagem_recebida = true AND mensagem != '-MIDIA-' 
                    ORDER BY id DESC 
                    LIMIT 1`;

    try {

        let lastMsg = await db.one(query);

        return lastMsg;

    }
    catch(error) {

        console.log(`Ocorreu um erro em dbMessageTrafic/getLastMessage`, error);

        logs(`Ocorreu um erro em dbMessageTrafic/getLastMessage: ${error}`);

    };


};

module.exports = {
    msgToClient : messagesToFront,
    msgToWhatsWeb : messagesToPuppeteer,
    getLastMsg : getLastMessage,
    updateMsg : updateMessages
};