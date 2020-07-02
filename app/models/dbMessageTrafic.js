const db = require('../../config/dbConnection.js')();

module.exports = () =>{
    this.messagesToFront = () =>{
        return new Promise((resolve, reject) => {
            let query = "SELECT id, id_contato, mensagem, to_char(hora_mensagem, 'HH24:MI')  FROM mensagens WHERE mensagem_recebida = 'true' AND mensagem_nova = 'true' ORDER BY id ASC";

            try{
                db.connect((err, client, done) => {
                    if(err){
                        console.log('Erro ao conectar no banco', err);
                    };

                    client.query(query, (err, result) => {
                        done();
                        if(err){
                            console.log('Um erro aconteceu no select', err);
                        }
                        resolve(result.rows);
                    });
                });
            }catch(err){
                console.log('Erro ao tentar conectar', err);
            };
        });
    };

    this.updateMessages = (id) => {
        return new Promise((resolve, reject) => {
            let query = `UPDATE mensagens SET mensagem_nova = 'false' WHERE id = '${id}'`;

            try{
                db.connect((err, client, done) => {
                    if(err){
                        console.log('Um erro aconteceu na conexão', err);
                    };

                    client.query(query, (err, resul) => {
                        done();
                        if(err){
                            console.log('Ocorreu um erro no update', err);
                        };
                        resolve()
                    });
                });
            }catch(err){
                console.log('Erro ao tentar executar o update', err);
            };
        });
    };
    return this;
};