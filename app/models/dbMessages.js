const db = require('../../config/dbConnection.js')();


module.exports = () => {
    this.insertMessageDB = (nameContact, message, origin = 'puppeteer') => {
        let timeNow = new Date().toLocaleTimeString();
        let query;

        // origin == 'puppeteer' : Mensagem capturada do whatsapp
        if (origin == 'puppeteer') {
            query =
                `INSERT INTO mensagens
                (mensagem_recebida, mensagem, data_mensagem, hora_mensagem, mensagem_nova, id_contato)
                VALUES ('T', '${message}', CURRENT_DATE, '${timeNow}', 'T', '${nameContact}')`;
        }

        // orgin == 'frontend' : Mensagem capturada do front
        else {
            query =
                `INSERT INTO mensagens
                (mensagem_recebida, mensagem, data_mensagem, hora_mensagem, mensagem_nova, id_contato)
                VALUES ('F', '${message}', CURRENT_DATE, '${timeNow}', 'T', '${nameContact}')`;
        };
        try {
            db.connect((err, client, done) => {
                console.log('DEBUEGUEI!')
                if (err) {
                    console.log('Um erro aconteceu no insert', err)
                };
                client.query(query, (err, result) => {
                    done();
                    if (err) {
                        console.log('Um erro aconteceu no insert', err)
                    }
                    else{
                        console.log('Insert realizado com sucesso!')
                    };
                    
                });
            });
               
        } catch (err) {
            console.log('Um erro aconteceu em dbMessages', err)
        };
    };

    return this;
};