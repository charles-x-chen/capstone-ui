
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

function setCategoryList(categories) {

    var innerHtml = "<ul class='category-list'>"
    for (let i = 0; i < categories.length; i++) {
        innerHtml = innerHtml + '<li><input type="checkbox" id="cat-' + i + '" name="cat-' + i + '" value="cat-"' + i + '>' + categories[i] + "</input></li>";
    }
    innerHtml = innerHtml + "</ul>";

    var x = document.getElementById("categoriesList");
    x.innerHTML = innerHtml;
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

function showProductInfo(productJson) {
    var x = document.getElementById("infoProductTitle");
    x.innerText = productJson.title;

    x = document.getElementById("infoProductDescription");
    x.innerText = productJson.description;

}

function showProductDetails(productJson) {
    var x = document.getElementById("productTitle");
    x.innerText = productJson.title;

    x = document.getElementById("productPrice");
    x.innerText = "$" + productJson.price;

    x = document.getElementById("productDescription");
    x.innerText = productJson.description;

    var ratingContainer = document.getElementById("productRating");
    const rating = Math.round(productJson.rating.rate);
    var spanElem;
    for (let i=0; i<rating; i++) {
        spanElem = document.createElement("span");
        spanElem.classList.add("fa");
        spanElem.classList.add("fa-star");
        ratingContainer.append(spanElem);
    }
    for (let i=rating; i<5; i++) {
        spanElem = document.createElement("span");
        spanElem.classList.add("fa");
        spanElem.classList.add("fa-star-o");
        ratingContainer.append(spanElem);
    }
    spanElem = document.createElement("span");
    spanElem.innerText = '('+productJson.rating.count+')';
    ratingContainer.append(spanElem);
}

function showProductImageList(productJson) {
    var listContainer = document.getElementById("productImageList");
    for (let i=0;i<5;++i)  {
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        var img = document.createElement("img");
        img.setAttribute("src", productJson.image);
        img.setAttribute("width", "100px");
        img.setAttribute("height", "120px");
        img.setAttribute("alt", "");
        img.classList.add("list-image-bg");
        a.append(img)
        listContainer.prepend(a);
    }
}

function showProductGrid(category) {
    console.log(category);
    fetch('https://fakestoreapi.com/products/category/' + category)
        .then(res=>res.json())
        .then(json=>genProductGrid(json));
}

function loadProductDetails(productJson) {


    var x = document.getElementById("productImage");
    x.setAttribute("src", productJson.image);

    showProductImageList(productJson);

    showProductDetails(productJson);

    showProductInfo(productJson);


}


window.onload = function productDetailsPageLoad() {
    const currentUrl = window.location.href;
    console.log(currentUrl);

    const params = new URLSearchParams(currentUrl);
    console.log(params.keys());

    var productId = 1;
    if (params.has('productId')) {
        productId = params.get('productId');
    }
    console.log(productId);

    fetch('https://fakestoreapi.com/products/'+productId)
        .then(res=>res.json())
        .then(json=>loadProductDetails(json));
}


