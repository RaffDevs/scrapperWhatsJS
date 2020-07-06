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

    this.messageToPuppeteer = (nome=false) => {
        return new Promise((resolve, reject) => {
            let query;
            if(nome === false){
                query = "SELECT id, id_contato, mensagem FROM mensagens WHERE mensagem_recebida = 'false' AND mensagem_nova = 'true' ORDER BY id ASC ";
            }
            else{
                query = `SELECT id, mensagem FROM mensagens WHERE id_contato = '${nome}' AND mensagem_recebida = 'false' AND mensagem_nova = 'true' ORDER BY id ASC`;
            };

            try{
                db.connect((err, client, done) => {
                    if(err){
                        console.log("Um erro aconteceu ao conectar no banco", err);
                    };

                    client.query(query, (err,result) => {
                        done();
                        if(err){
                            console.log('Um erro aconteceu ao selecionar as mensagens', err);
                        }
                        else{
                            console.log('Mensagens para o puppeteer: OK');
                            resolve(result.rows);
                        };
                    });
                });
            }catch(err){
                console.log('Erro ao tentar conectar com o banco', err);
            };
        });
    };

    this.getLastMessage = (nome) => {
        return new Promise((resolve, reject) => {
            let query = 
            `SELECT mensagem FROM mensagens WHERE id_contato = '${nome}'
            AND mensagem_recebida = true AND mensagem != '-MIDIA-' 
            ORDER BY id DESC 
            LIMIT 1`;

            try{
                db.connect((err, client, done) => {
                    if(err){
                        console.log('Houve um erro ao conectar ao DB', err);
                    };
                    client.query(query, (err, result) => {

                        done();

                        if(err){
                            console.log('Houve um erro ao executar a query', err);
                        };

                        resolve(result.rows);
                    });
                });

            }catch(err){
                console.log('Um erro aconteceu ao tentar conectar ao banco!', err);
            };
        });
    };
    return this;
};