const fs = require("fs");
const path = require("path");

module.exports = (errorHandle) => {
    let nomeArquivo = new Date().getTime();
    let caminho = path.resolve(__dirname, '..', 'erros', `${nomeArquivo}.txt`);

    fs.writeFile(caminho, `${errorHandle} \n`, {flag: 'W', encoding: 'utf8'}, (err) => {
        if(err) throw err;
        console.log('Arquivo salvo!');
    });
};