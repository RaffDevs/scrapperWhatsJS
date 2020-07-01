// const { Client } = require('pg');

// module.exports = () => {
//     return client = new
//         Client({
//             user: 'raffdevs',
//             host: 'localhost',
//             database: 'whats_forip',
//             password: 'yma2578k',
//             port: 5432
//         });
// };


const pg = require('pg');

const config = {
    user: 'raffdevs',
    host: 'localhost',
    database: 'whats_forip',
    password: 'yma2578k',
    port: 5432
};
module.exports = () =>{
    return new pg.Pool(config);
};
