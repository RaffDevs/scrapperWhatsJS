const createSubscriber = require('pg-listen');


const dbConfig = {
    user: 'raffdevs',
    host: 'localhost',
    database: 'whats_forip',
    password: 'yma2578k',
    port: 5432
};


const subscriber = createSubscriber(dbConfig);


subscriber.events.on("error", (error) => {
    console.error("Fatal database connection error:", error)
    process.exit(1)
})

process.on("exit", () => {
    subscriber.close()
})

async function connectNotify() {

    await subscriber.connect();

    await subscriber.listenTo("teste");

}

connectNotify();

module.exports = subscriber;








