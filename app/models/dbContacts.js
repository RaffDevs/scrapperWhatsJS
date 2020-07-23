const db = require('../../config/dbConnection.js');
const logs = require("../src/Helpers/logs");


module.exports = async function getContacts() {

    let query = `with sql_mensagens as (
                SELECT max(id) AS id,id_contato FROM mensagens group by id_contato ORDER BY id DESC)
                SELECT sql_mensagens.id_contato,mensagens.mensagem from sql_mensagens inner join mensagens on (sql_mensagens.id = mensagens.id)
                ORDER BY sql_mensagens.id DESC`;


    try {

        let contacts = await db.any(query);

        return contacts;

    }
    catch(err) {

        console.log("Erro ao pegar os contatos", error);
        logs(`Ocorreu um erro em dbContacts/getContacts: ${error}`);

    }
    
};


