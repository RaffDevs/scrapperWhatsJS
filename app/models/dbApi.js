const db = require('../../config/dbConnection.js')();

module.exports = () => {

    this.insertApiMessage = (contactName, message, target='puppeteer') => {
        return new Promise((resolve, reject) => {
            let timeNow = new Date().toLocaleTimeString();
            let query;

            // origin == 'puppeteer' : Mensagem capturada do whatsapp
            if (target !== 'puppeteer') {
                query =
                    `INSERT INTO mensagens
                (mensagem_recebida, mensagem, data_mensagem, hora_mensagem, mensagem_nova, id_contato)
                VALUES ('T', '${message}', CURRENT_DATE, '${timeNow}', 'T', '${contactName}')`;
            }

            // orgin == 'frontend' : Mensagem capturada do front
            else {
                query =
                    `INSERT INTO mensagens
                (mensagem_recebida, mensagem, data_mensagem, hora_mensagem, mensagem_nova, id_contato)
                VALUES ('F', '${message}', CURRENT_DATE, '${timeNow}', 'T', '${contactName}')`;
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
                            console.log('Um erro aconteceu no insert', err);
                            resolve({warning: 'Ocorreu um erro', erro: err});
                        };

                        resolve('Insert realizado com sucesso!');

                    });
                });

            } catch (err) {
                console.log('Um erro aconteceu em dbMessages', err)
            };
        });
    };

    return this;

};