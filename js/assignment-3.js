

/* code from qodo.co.uk */
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
  visibility = x.style.visibility
  x.style.visibility = !visibility
  if (x.style.visibility) {
    x.display = 'block'
  } else {
    x.display = 'none'
  }

}
