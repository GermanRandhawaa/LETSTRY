
// this fuction loads the main.html page on clicking buy 
// and loads the upload.html on clicking sell goods otpion

document.getElementById("buy").addEventListener("click",() =>{
    console.log($("#buy").load("../main.html"))
})

document.getElementById("upload").addEventListener("click",() =>{
    console.log($("#buy").load("../upload.html"))
})