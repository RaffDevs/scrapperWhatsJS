const db = require('../../config/dbConnection.js')();

module.exports = () =>{
    this.getContacts = () =>{
        return new Promise((resolve, reject) =>{

            let query = `with sql_mensagens as (
                SELECT max(id) AS id,id_contato FROM mensagens group by id_contato ORDER BY id DESC
                )
                SELECT sql_mensagens.id_contato,mensagens.mensagem from sql_mensagens inner join mensagens on (sql_mensagens.id = mensagens.id)
                ORDER BY sql_mensagens.id DESC`;
            
            try{
                db.connect((err, client, done) =>{
                    if(err){
                        console.log('Erro', err);
                    };
                    client.query(query, (err, result)=>{
                        done();
                        if(err){
                            console.log('Erro no select', err);
                        }
                        else{
                            // console.log('Select executado com sucesso!', result.rows)
                            resolve(result.rows)
                            
                        };
                    });
                });
            }catch(err){
                console.log('Erro ao tentar conectar no banco', err);
            };
        });
    };

    return this;
};