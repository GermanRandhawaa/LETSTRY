fetch();
fillpost();
function fetch() {
    var arr = card();
    var id;
    var newid;
    db.collection("reviews").get().then(snap => {
        snap.forEach(doc => {
            id = doc.id;
            newid = id.slice(0, id.length - 2);
            db.collection("items").doc(newid).onSnapshot(doc => {
                var column = arr[0];
                var card = arr[1];
                var cardbody = arr[2];
                var head = arr[3];
                var cardtext = arr[4];
                var ul = arr[5];
                var price = arr[6];
                var rate = arr[7];
                var img = arr[8];
                var username = arr[9];
                var mobile = arr[10];
                var email = arr[11];
                price.innerHTML = doc.data().Price;
                ul.append(price);
                username.innerHTML = "Name of user : " + doc.data().username;
                mobile.innerHTML = "Mobile : " + doc.data().Mobile;
                email.innerHTML = "E-mail : " + doc.data().Email;
                ul.append(rate);
                ul.append(username);
                ul.append(mobile);
                ul.append(email);
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
                document.getElementById("row").append(column);
            })
        })
    })




}
function card() {
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
    for (var i = 1; i <= 5; i++) {
        var sp = document.createElement("span");
        sp.setAttribute("class", "fa fa-star checked");
        rate.append(sp);
    }
    var username = document.createElement("li");
    username.setAttribute("class", "list-group-item");
    var mobile = document.createElement("li");
    mobile.setAttribute("class", "list-group-item");
    var email = document.createElement("li");
    email.setAttribute("class", "list-group-item");

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
    arr.push(img);
    arr.push(username);
    arr.push(mobile);
    arr.push(email);
    return arr;

}

document.getElementById("btn").addEventListener("click", () => {
    var i = Math.floor(Math.random() * 100);
    var post = document.getElementById("textbox").value;
    db.collection("posts").doc(`post ${i}`)
        .set({
            comment: post
        })
    document.getElementById("form").style.display = "none";
})

function fillpost() {
    db.collection("posts").get().then(snap => {
        snap.forEach(doc => {
            var p = document.createElement("p");
            p.innerHTML = doc.data().comment;
            document.getElementById("comments").append(p);
        })
    })
}

document.getElementById("btn2").addEventListener("click", () => {
    var rating = document.getElementById("textbox2").value;

    if (rating == "5") {
        db.collection("reviews").get().then(doc => {
            if (doc.exists) {
                db.collection("reviews").get().then(snap => {
                    snap.forEach(doc => {
                        id = doc.id;
                        newid = id.slice(0, id.length - 2);
                        var r;
                        db.collection("ratings").doc(newid)
                            .set({
                                rate : (parseInt(doc.data().rate) + 5).toString()
                                
                            })

                    })
                })
            }
            else {
                db.collection("reviews").get().then(snap => {
                    snap.forEach(doc => {
                        id = doc.id;
                        newid = id.slice(0, id.length - 2);


                        db.collection("ratings").doc(newid)
                            .set({
                                rate: rating
                            })
                    })
                });
            }
        })
    }

    document.getElementById("form2").style.display = "none";
})
