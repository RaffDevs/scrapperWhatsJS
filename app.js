const app = require('./config/server');
const getContacts = require('./app/models/dbContacts');
const subscriber = require('./config/pgNotify');
const dbMessages = require('./app/models/dbMessages');
const messageTrafic = require('./app/models/dbMessageTrafic');
const sleep = require("./app/src/Helpers/sleep");
const events = require('events');
const dbMessageTrafic = require('./app/models/dbMessageTrafic');




const server = app.listen(5000, ()=>{
    console.log('Server Online!');
});


let io = require('socket.io').listen(server);


app.set('io', io);



subscriber.notifications.on('teste', (payload) => {

    if (payload.mensagem_recebida === true) {

        io.sockets.emit('scraperJS', {puppeteerMessages : [payload]})

        dbMessageTrafic.updateMsg(payload.id)
            .then(_ => {

                console.log('Mensagem Atualizada com sucesso!');

            })
            .catch(error => {
                console.log('Erro no update' ,error);
            });
            
    }

});


io.on('connection', (socket)=>{
    
    console.log('Cliente Conectou!');

    socket.on('handleContact', async() =>{

        let contacts = await getContacts();

        socket.emit('scraperJS', {contactData:contacts});
    });

    socket.on('getHistory', async(data)=>{

        let history = await dbMessages.history(data.contato);

        socket.emit('scraperJS', {historyMessages: history});

    });

    socket.on('messageUpdate', async(data) => {

        await messageTrafic.updateMsg(data.id_msg);
        
    });

    socket.on('clientMessage', async(data) => {

        await dbMessages.insert(data.contato, data.mensagem, origin='frontend');

        // dbMessages.insertMessageDB(data.contato, data.mensagem, origin='frontend');
    });



    socket.on('disconnect', ()=>{        

        console.log('Usuario desconectou!');

    });
});
