var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        insertName();
        populateCardsDynamically();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});


// function read_display_Quote(){
//     console.log("inside the function")

//     //get into the right collection
//     db.collection("quotes").doc("tuesday")
//     .onSnapshot(function(tuesdayDoc) {
//         console.log(tuesdayDoc.data());
//         document.getElementById("quote-goes-here").innerHTML=tuesdayDoc.data().quote;
//     })
// }
// read_display_Quote();

function insertName(){
// to check if the user is logged in:
 firebase.auth().onAuthStateChanged(user =>{
     if (user){
         console.log(user.uid); // let me to know who is the user that logged in to get the UID
        currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
        currentUser.get().then(userDoc=>{
            //get the user name
            var user_Name= userDoc.data().name;
            console.log(user_Name);
            $("#name-goes-here").text(user_Name); //jquery
            // document.getElementByID("name-goes-here").innetText=user_Name;
        })    
    }

 })
}
insertName();

function writeProducts() {
    //define a variable for the collection you want to create in Firestore to populate data
    var productRef = db.collection("buyProducts");

    productRef.add({
        productId: "A01",
        productName: "Olympic T-shirt", //replace with your own city?
        productPrice: "300$",
        city: "Burnaby",
        province: "BC",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    productRef.add({
        productId: "A02",
        productName: "Olympic T-shirt", //replace with your own city?
        productPrice: "300$",
        city: "Anmore",
        province: "BC",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    productRef.add({
        productId: "A03",
        productName: "Olympic T-shirt", //replace with your own city?
        productPrice: "300$",
        city: "North Vancouver",
        province: "BC",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2022"))
    });
}
writeProducts();


function populateCardsDynamically() {
    let productCardTemplate = document.getElementById("productCardTemplate");  //card template
    let productCardGroup = document.getElementById("productCardGroup");   //where to append card
    db.collection("buyProducts").get()
        .then(allproducts => {
            allproducts.forEach(doc => {
                var productName = doc.data().name; //gets the name field
                var productID = doc.data().id; //gets the unique ID field
                let testProductCard = productCardTemplate.content.cloneNode(true);
                testProductCard.querySelector('.card-title').innerHTML = productName;
                testProductCard.querySelector('a').onclick = () => setProductData(productID);

                //next 2 lines are new for demo#11
                //this line sets the id attribute for the <i> tag in the format of "save-hikdID" 
                //so later we know which hike to bookmark based on which hike was clicked
                testProductCard.querySelector('i').id = 'save-' + productID;
                // this line will call a function to save the hikes to the user's document             
                testProductCard.querySelector('i').onclick = () => saveBookmark(productID);

                testProductCard.querySelector('.read-more').href = "eachHike.html?hikeName="+productName +"&id=" + productID;
                
                testProductCard.querySelector('img').src = `./images/${productID}.jpg`;
                productCardGroup.appendChild(testHikeCard);
            })
        })
}
// populateCardsDynamically();

//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "bookmarks" array
// Then it will change the bookmark icon from the hollow to the solid version. 
//-----------------------------------------------------------------------------
function saveBookmark(productID) {
    currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(hikeID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + productID;
            //console.log(iconID);
            document.getElementById(iconID).innerText = 'bookmark';
        });
}

function setHikeData(id){
    localStorage.setItem('hikeID',id);
}

