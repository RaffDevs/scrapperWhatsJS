module.exports = (app) =>{
    app.get('/', async(req, res)=>{
        console.log('Raiz chamada!');
        res.redirect('/login');
    });
};