const url = require('url');

module.exports = (app) =>{
    app.get('/login', (req, res)=>{
        console.log('Login chamado!')
        res.render('login')
    });

    app.post('/login', (req, res)=>{
        let dados = req.body;
        res.redirect(url.format({
            pathname : "/chat",
            query : {
                nameUser : dados.nome_chat
            }
        }));
    });
};