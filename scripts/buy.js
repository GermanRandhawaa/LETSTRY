function decide(){
    var id;

}

function fetch(paper) {
    var id;
    var arr = card();
    db.collection("items").doc("Pahul Sidhu").onSnapshot(doc => {
       var column = arr[0];
       var card = arr[1];
       var cardbody = arr[2];
       var head = arr[3];
       var cardtext = arr[4];
       var ul = arr[5];
       var price = arr[6];
       var rate = arr[7];
       var btn = arr[8];
       var img = arr[9];
       price.innerHTML = doc.data().Price;
       ul.append(price);
       ul.append(rate);
       ul.append(btn);
       cardtext.innerHTML = doc.data().Description;
       head.innerHTML = doc.data().Product;
       img.setAttribute("src", `${doc.data().Img}`);
       img.setAttribute("alt", "image not found");
       cardbody.append(head);
       cardbody.append(cardtext);
       cardbody.append(ul);
       card.append(img);
       card.append(cardbody);
       column.append(card);
       column.setAttribute("id", `${doc.id}`);
       document.getElementById("row1").append(column);
       
    });
    
    
}
function card(){
    var column = document.createElement("div");
    column.setAttribute("class", "col-12 col-md-6 col-lg-3");
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    var cardbody = document.createElement("div");
    cardbody.setAttribute("class", "card-body");
    var head = document.createElement("h5");
    head.setAttribute("class", "card-title");
    var cardtext = document.createElement("p");
    cardtext.setAttribute("class", "card-text");
    var ul = document.createElement("ul");
    ul.setAttribute("class", "list-group list-group-flush");
    var price = document.createElement("li");
    price.setAttribute("class", "list-group-item");
    var rate = document.createElement("li");
    rate.setAttribute("class", "list-group-item");
    for(var i = 1; i<=5; i++){
        var sp = document.createElement("span");
        sp.setAttribute("class", "fa fa-star checked");
        rate.append(sp);
    }
    var btn = document.createElement("li");
    btn.setAttribute("class", "list-group-item");
    var button = document.createElement("button");
    button.setAttribute("class", "btn btn-primary");
    button.setAttribute("type", "button");
    button.innerHTML = "Read More";
    btn.append(button);

    var img = document.createElement("img");
    img.setAttribute("class", "card-img-top");

    var arr = [];
    arr.push(column);
    arr.push(card);
    arr.push(cardbody);
    arr.push(head);
    arr.push(cardtext);
    arr.push(ul);
    arr.push(price);
    arr.push(rate);
    arr.push(btn);
    arr.push(img);
    return arr;
    
}
 

