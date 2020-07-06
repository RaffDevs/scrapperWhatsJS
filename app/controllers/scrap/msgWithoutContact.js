module.exports = async(page,dados) => {
    for(let obj of dados){
        await page.type("div[class*= '_2FVVk _2UL8j'] > div._2FbwG", obj.mensagem);
        await page.keyboard.press('Enter');
        await dbMessageTrafic.updateMessages(obj.id);
    };
};