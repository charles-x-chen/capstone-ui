
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
        innerHtml = innerHtml + '<li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">' + categories[i] + "</input></li>";
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


function genProductGrid(productJsons) {
    const totalNum = productJsons.length;
    var x = document.getElementById("totalNumProducts");
    x.innerHTML = "<p>" + totalNum + " Results</p>";

    // loop over all products
    var container = document.getElementById("productGridContainer");
    var numRows = Math.ceil(totalNum / 3.0);
    for (let i = 0; i < numRows; i++) {
        // for each row, we generate a div container
        const rowContainer = document.createElement('div');
        rowContainer.classList.add("aem-Grid");
        rowContainer.classList.add("aem-Grid--12");
        rowContainer.classList.add("product-grid-row");

        for (let j = i*3; j < Math.min((i+1)*3, totalNum); j++) {
            const pJson = productJsons[j];
            const gridDiv = genHtmlForProduct(pJson);
            rowContainer.append(gridDiv);
        }
        container.append(rowContainer);
    }

}

function showProductGrid(category) {
    console.log(category);
    fetch('https://fakestoreapi.com/products/category/' + category)
        .then(res=>res.json())
        .then(json=>genProductGrid(json));
}

function loadCategoryProducts(categories) {
    // determine category ID from query parameters
    const currentUrl = window.location.href;
    const params = new URLSearchParams(currentUrl);
    var categoryId = params.get('category');
    if (categoryId === null) {
        categoryId = 0;
    }

    var x = document.getElementById("heroText");
    x.innerText = categories[categoryId];

    // setup the category list in filters
    setCategoryList(categories);

    // set up product grid
    showProductGrid(categories[categoryId]);

}


window.onload = function categoryPageLoad() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res=>res.json())
        .then(categories=>loadCategoryProducts(categories));
}


