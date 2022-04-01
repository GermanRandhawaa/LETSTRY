firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
    }
});

function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);

            let CardTemplate = document.getElementById("CardTemplate");
            bookmarks.forEach(productID => {
                console.log(productID);
                db.collection("buyProducts").where("id", "==", productID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;
                    
                    if (size == 1) {
                        var doc = queryData[0].data();
                        var productName = doc.name; //gets the name field
                        var productID = doc.id; //gets the unique ID field
                        
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = productName;
                        newCard.querySelector('a').onclick = () => setProductData(productID);
                        newCard.querySelector('img').src = `./images/${productID}.jpg`;
                        hikeCardGroup.appendChild(newCard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}