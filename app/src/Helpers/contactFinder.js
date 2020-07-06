

module.exports = async(page, contact) =>{
    
    let y = 400
    let elemento = document.querySelector("span[title='Pai Black']")
    return new Promise((resolve, reject) => {
        page.evaluateHandle(() => {
            function seacrh(y, el){
                setTimeout(() => {
                    let div = document.querySelector("#pane-side");
                    div.scrollTo(0,y)
                    if(el === null){
                        y++
                        seacrh()
                    }
                }, 3000)
            }
           seacrh(y, elemento) 
        })
    })
};