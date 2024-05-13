import {loadNumProductsInCart, loadShoppingCartNumber} from "./common-functions.mjs";


// some globals
var subtotal;
const coupon = -5.00;
const gift = -10.00;
var tax; //15% of subtotal
const TAX_RATE = 0.15;

function searchClicked() {
  console.log("searClicked() called...")
  var x = document.getElementById("search");
  x.style.visibility = "hidden"

   x = document.getElementById("search-container");
  x.style.visibility = "visible"

   x = document.getElementById("category-menu");
  x.style.visibility = "hidden"

}

function closeClicked() {
  var x = document.getElementById("search");
  x.style.visibility = "visible"

   x = document.getElementById("search-container");
  x.style.visibility = "hidden"

   x = document.getElementById("category-menu");
  x.style.visibility = "visible"
}


function signInClicked() {
  var x = document.getElementById("signIn-container");
  const visibility = x.style.visibility
  x.style.visibility = !visibility
  if (x.style.visibility) {
    x.display = 'block'
  } else {
    x.display = 'none'
  }

}

function genHtmlForProduct(pJson) {
    var gridDiv = document.createElement('div');
    gridDiv.setAttribute("id", "prod-"+pJson.id);
    gridDiv.classList.add("aem-GridColumn");
    gridDiv.classList.add("aem-GridColumn--default--4");
    gridDiv.classList.add("product-teaser");

    // product image
    var imgDiv = document.createElement('div');
    imgDiv.classList.add("product-image");

    var img = document.createElement('img');
    img.setAttribute("src", pJson.image);
    img.setAttribute("alt", pJson.title);
    img.setAttribute("width", "100%");
    img.setAttribute("height", "384px");
    img.setAttribute("object-fit", "cover");
    imgDiv.append(img);
    gridDiv.append(imgDiv);

    var infoDiv = document.createElement('div');
    infoDiv.classList.add("product-info");

    // product title
    var title = document.createElement('p');
    title.innerText = pJson.title;
    infoDiv.append(title);

    // price
    var price = document.createElement('p');
    price.innerText = "$" + pJson.price;
    infoDiv.append(price);

    gridDiv.append(infoDiv);

    return gridDiv;
}

function showProductPricingSummary() {
    console.log("subtotal show pricing info:" + subtotal);

    var x = document.getElementById("cartSubtotal");
    x.innerText = "$"+subtotal.toFixed(2);

    tax = subtotal * TAX_RATE;
    x = document.getElementById("cartTax");
    x.innerText = "$"+tax.toFixed(2);

    x = document.getElementById("cartEstimatedTotal");
    x.innerText = "$"+(subtotal - coupon - gift + tax).toFixed(2);

}

// each productJson has a 'productId' and a 'quantity'
function genProductDetailsDiv(parentDiv, cartProductJson) {
    // first, we get the product details by its ID
    fetch('https://fakestoreapi.com/products/' + cartProductJson.productId)
        .then(res => res.json())
        .then(json => loadProductDetails(parentDiv, json, cartProductJson.quantity));
}

 function loadProductDetails(parentDiv, productJson, quantity) {
    subtotal += (quantity * productJson.price);
    console.log("subtotal prod details:" + subtotal);

    showProductPricingSummary();



    // now use the details to build the div structure
    var prodDiv = document.createElement("div");
    prodDiv.setAttribute("id", "inBagProductId-" + productJson.id);
    prodDiv.classList.add("aem-Grid");
    prodDiv.classList.add("aem-Grid--12");
    prodDiv.classList.add("in-bag-product-details");

    // image div

    var imgDiv = document.createElement("div");
    imgDiv.setAttribute("id", "inBagProductImage-" + productJson.id);
    imgDiv.classList.add("aem-GridColumn");
    imgDiv.classList.add("aem-GridColumn--default--3");
    imgDiv.classList.add("in-bag-product-image");

     var a = document.createElement("a");
     a.setAttribute("href", "/capstone-ui/product-details.html?x=1&productId="+productJson.id);
    var img = document.createElement("img");
    img.setAttribute("src", productJson.image);
    img.setAttribute("alt", "");
    img.setAttribute("width", "100%");
    img.setAttribute("height", "100%");
     a.append(img)

     imgDiv.append(a);
    prodDiv.append(imgDiv);

    // info
    var infoDiv = document.createElement("div");
    infoDiv.setAttribute("id", "inBagProductInfo-" + productJson.id);
    infoDiv.classList.add("aem-GridColumn");
    infoDiv.classList.add("aem-GridColumn--default--3");
    infoDiv.classList.add("in-bag-product-info");

    var heading = document.createElement("h3")
    heading.setAttribute("id", "productTitle-" + productJson.id);
    heading.innerText = productJson.title;
    infoDiv.append(heading);

    heading = document.createElement("h4")
    heading.setAttribute("id", "productSize-" + productJson.id);
    heading.innerText = "Size: medium";
    infoDiv.append(heading);

    heading = document.createElement("h4")
    heading.setAttribute("id", "productColor-" + productJson.id);
    heading.innerText = "Color: Storm";
    infoDiv.append(heading);

    heading = document.createElement("h4")
    heading.setAttribute("id", "productPrice-" + productJson.id);
    heading.innerText = "$" + productJson.price;
    infoDiv.append(heading);
    prodDiv.append(infoDiv);


    // quantity selector
    var quantityDiv = document.createElement("div");
    quantityDiv.setAttribute("id", "inBagSelector");
    quantityDiv.classList.add("aem-GridColumn");
    quantityDiv.classList.add("aem-GridColumn--default--3");
    quantityDiv.classList.add("in-bag-selector");
    quantityDiv.innerHTML = " <div id='productSelect' class='product-select'>\n" +
        "                            <i class='fa fa-minus-circle remove-bg' aria-hidden='true'></i>\n" +
        "                            <input id='numProducts' class='num-products' type='number' name='numOfProducts' value='" + quantity + "'/>\n" +
        "                            <i class='fa fa-plus-circle add-bg' aria-hidden='true'></i>\n" +
        "                        </div>";

    prodDiv.append(quantityDiv);

    // actions
    var actionDiv = document.createElement("div");
    actionDiv.setAttribute("id", "inBagAction");
    actionDiv.classList.add("aem-GridColumn");
    actionDiv.classList.add("aem-GridColumn--default--3");
    actionDiv.classList.add("in-bag-action");
    actionDiv.innerHTML = " <div class='action-container'>\n" +
        "                            <div>\n" +
        "                                <i class='fa fa-pencil remove-bg' aria-hidden='true'></i>\n" +
        "                                <span>Edit item</span>\n" +
        "                            </div>\n" +
        "                            <div>\n" +
        "                                <i class='fa fa-trash remove-bg' aria-hidden='true'></i>\n" +
        "                                <span>Remove</span>\n" +
        "\n" +
        "                            </div>\n" +
        "                            <div>\n" +
        "                                <i class='fa fa-heart-o remove-bg' aria-hidden='true'></i>\n" +
        "                                <span>Save for later</span>\n" +
        "                            </div>";


    prodDiv.append(actionDiv);

    // add this product div to parent div.
    parentDiv.append(prodDiv);

}

 function genShoppingBagPage(cartJson) {
    // cartJson is a list of JSON objects for products in the Cart.
    var listContainer = document.getElementById("inBagProductList");
    const productList = cartJson[0].products;

    for (let i = 0; i < productList.length; i++) {
        const prodJson = productList[i];
         genProductDetailsDiv(listContainer, prodJson);
        console.log(subtotal);
    }

}

window.onload = async function shoppingBagPageLoad() {
    subtotal = 0;
    tax = 0;
    console.log("subtotal initial:" + subtotal);


    const currentUrl = window.location.href;
    console.log(currentUrl);

    const params = new URLSearchParams(currentUrl);
    console.log(params.keys());

    // getting cart details for user (userID=1) -->
    let userId = 1;
    if (params.has('userId')) {
        userId = params.get("userId");
    }
    console.log("UserId=" + userId);

     fetch('https://fakestoreapi.com/carts/user/' + userId)
        .then(res=>res.json())
        .then(json=>genShoppingBagPage(json))
         .then(() => loadShoppingCartNumber());

}


