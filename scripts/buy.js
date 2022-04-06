var currentUser;
decide();
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        insertName();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});


function insertName() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user name
                var user_Name = userDoc.data().name;
                $("#name-goes-here").text(user_Name); //jquery
                document.getElementByID("name-goes-here").innetText = user_Name;
            })
        }

    })
}


function decide() {
    var id;
    db.collection("items").get().then(snap => {
        snap.forEach(doc => {
            id = doc.id;
            var row = document.getElementById("row");
            var columns = row.children;
            var isthere = false;
            for (var x = 0; x < columns.length; x++) {
                var c = columns[x];
                if (c.id === id) {
                    isthere = true;
                    break;
                }
            }
            if (isthere === false) {
                fetch(id);
            }
        });

    })

}

function fetch(paper) {
    var arr = card();
    db.collection("items").doc(paper).onSnapshot(doc => {
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
        btn.setAttribute("id", `${doc.id}rm`);
        btn.setAttribute("onclick", "reply_click(this.id)")
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
        document.getElementById("row").append(column);


    });


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

function reply_click(id) {

    db.collection("reviews").get().then(snap => {
        snap.forEach(doc => {
            if (doc.id != id) {
                doc.ref.delete();
            }
        })
    });


    db.collection("reviews").doc(id).set({
        reviewID: id
    }).then(() => {
        window.location.href = "../readmore.html";
    });

}













