// Função que gera um tempo de espera

module.exports = (ms) =>{
    return new Promise(resolve => setTimeout(resolve, ms));
};