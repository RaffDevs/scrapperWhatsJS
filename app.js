const app = require('./config/server');
const handleContact = require('./app/models/dbContacts')();


const server = app.listen(5000, ()=>{
    console.log('Server Online!');
});

let io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', (socket)=>{
    
    socket.on('handleContact', async() =>{
        handleContact.getContacts().then((dados)=>{
            console.log();
            socket.emit('scraperJS', {contactData: dados})
        });
    });

    socket.on('disconnect', ()=>{
        console.log('Usuario desconectou!')
    });
});
