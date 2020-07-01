const path = require('path');
const fs = require('fs');

module.exports = async(page) => {
    const filesPath = path.join(__dirname, '../', '../', 'public', 'images', 'QR')
    fs.readdir(path.join(__dirname, '../', '../', 'public', 'images', 'QR'), (err, files)=>{
        if(files.length > 0){
            for(let file of files){
                fs.unlinkSync(path.join(filesPath, file));
            };
        };
    });
    await page.screenshot({path:filesPath+'/qrcode.jpeg', type: 'jpeg'});
};