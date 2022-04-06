document.getElementById("submit").addEventListener("click", () => {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var prodname = document.getElementById("prod-name").value;
    var desc = document.getElementById("desc").value;
    var price = document.getElementById("price").value;
    var img = document.getElementById("img").value;

    db
        .collection("items")
        .doc(`${name}`)
        .set({
            username: name,
            Email: email,
            Mobile: phone,
            Product: prodname,
            Description: desc,
            Price: price,
            Img: img
        }).then(()=>{
            window.location.href = "../uploadthanks.html"
        })
});










