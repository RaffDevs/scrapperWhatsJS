const app = require('./config/server');
const handleContact = require('./app/models/dbContacts')();
const getMessageHistory = require('./app/models/dbMessages')();
const messageTrafic = require('./app/models/dbMessageTrafic')();


const server = app.listen(5000, ()=>{
    console.log('Server Online!');
});

let io = require('socket.io').listen(server);

app.set('io', io);


io.on('connection', (socket)=>{
    
    console.log('Cliente Conectou!');

    setInterval(() =>{
        io.clients((err, clients) => {
            if(err) throw err;
            if(clients.length > 0){
               messageTrafic.messagesToFront()
                .then((dados) => {
                    if(dados.length > 0){
                        socket.emit('scraperJS', {puppeteerMessages: dados});
                    }
                    else{
                        console.log('Sem mensagens para o javscript');
                    };
                });
            }
            else{
                console.log('Nenhum cliente conectado!');
            };
        });
    }, 2000);


    socket.on('handleContact', async() =>{
        handleContact.getContacts().then((dados)=>{
            socket.emit('scraperJS', {contactData: dados});
        });
    });

    socket.on('getHistory', (data)=>{
        getMessageHistory.getHistoryMessage(data.contato)
            .then((dados) =>{
                socket.emit('scraperJS', {historyMessages: dados});
            });
    });

    socket.on('messageUpdate', (data) => {
        messageTrafic.updateMessages(data.id_msg)
            .then(() => {
                console.log('Mensagem atualizada com sucesso!');
            });
    });

    socket.on('disconnect', ()=>{
        console.log('Usuario desconectou!');
    });
});
