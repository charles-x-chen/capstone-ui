
export function loadShoppingCartNumber() {
    const currentUrl = window.location.href;
    console.log(currentUrl);

    const params = new URLSearchParams(currentUrl);
    console.log(params.keys());

    let productId = 1;
    if (params.has('productId')) {
        productId = params.get('productId');
    }
    console.log(productId);

    // getting cart details for user (userID=1) -->
    let userId = 1;
    if (params.has('userId')) {
        userId = params.get("userId");
    }
    console.log("UserId=" + userId);

    fetch('https://fakestoreapi.com/carts/user/' + userId)
        .then(res=>res.json())
        .then(json=>loadNumProductsInCart(json));
}


export function loadNumProductsInCart(cartJson) {
    const numProducts = cartJson[0].products.length;
    console.log("numProdInCart:" + numProducts);

    var x = document.getElementById("numProductsInCart");
    x.innerText = numProducts;
}

