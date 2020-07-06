const dbApi = require('../models/dbApi')();


module.exports = (app) => {
    app.post('/msg', (req, res) => {
        let dados = req.body;
        
        console.log(dados);

        let contato = dados.contato;
        let mensagem = dados.mensagem;

        dbApi.insertApiMessage(contato, mensagem)
            .then((data) => {
                return data;
            });


    });
};