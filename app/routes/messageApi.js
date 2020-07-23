const dbApi = require('../models/dbApi');


module.exports = (app) => {
    app.post('/msg', (req, res) => {
        
        let dados = req.body;

        let contato = dados.contato.replace(' 55', '+55');
        
        let mensagem = dados.mensagem;

        dbApi.insertApi(contato, mensagem)
            .then((data) => {
                res.send(data)
            });


    });
};