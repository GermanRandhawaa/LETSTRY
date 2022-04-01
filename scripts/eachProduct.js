function showDetails() {
    // create a URL object
    let params = new URL(window.location.href);
    let id = params.searchParams.get("id");               //parse "id"
    let productName = params.searchParams.get("productName");   //parse "collection"

    let message = "Product Name is: " + productName;           //build message to display
    message += " &nbsp | Document id is:  " + id;    
    document.getElementById("HikeName").innerHTML = productName;  
    document.getElementById("details-go-here").innerHTML = message; 
}
showDetails();