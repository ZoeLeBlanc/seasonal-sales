var productsContainer = document.getElementById("products");
var products = document.getElementsByClassName("products-list");
var chooseSeason = document.getElementById("seasons");
var categoryList = {};
var productList = {};

var myRequest = new XMLHttpRequest();
myRequest.open("GET", "products.json");
myRequest.send();

myRequest.addEventListener("load", printProducts); //Callback
myRequest.addEventListener("error", executeThisCodeIfXHRFails);

function executeThisCodeIfXHRFails() {
	alert("Please refresh");
}


function printProducts() {
	productList = JSON.parse(this.responseText);
	checkCategories(productList);
}

function checkCategories(input) {
	var secondRequest = new XMLHttpRequest();
	secondRequest.open("GET", "categories.json");
	secondRequest.send();

	secondRequest.addEventListener("load", getCategories); //Callback
	secondRequest.addEventListener("error", executeThisCodeIfXHRFails);
	function getCategories() {
		categoryList = JSON.parse(this.responseText);
		printDOM();
		//checkSeason(departmentList);
	}

}
function printDOM() {
	var currentProduct;
	var productData = "";
	for (var i =0; i < productList.products.length; i++){
		currentProduct = productList.products[i];
		productData += `<div class='products-list' id='${currentProduct.category_id}'><h1>${currentProduct.name}</h1>`
        productData += currentProduct.price;
      	productData += "</div>";
	};
	productsContainer.innerHTML = productData;
	
}

chooseSeason.addEventListener("change", function() {
	var discountPrice;
	var discountSeason;
	var discountType;
	var selectedSeason = chooseSeason.options[chooseSeason.selectedIndex].value;
	//console.log(categoryList.categories[0].season_discount);
	if (selectedSeason === categoryList.categories[0].season_discount) {
		discountSeason = categoryList.categories[0].id;
		discountPrice = categoryList.categories[0].discount;
		discountType = categoryList.categories[0].name;
		console.log(selectedSeason);
	};
	if (selectedSeason === categoryList.categories[1].season_discount) {
		discountSeason = categoryList.categories[1].id;
		discountPrice = categoryList.categories[1].discount;
		console.log(selectedSeason);
	};
	if (selectedSeason === categoryList.categories[2].season_discount) {
		discountSeason = categoryList.categories[2].id;
		discountPrice = categoryList.categories[2].discount;
		console.log(selectedSeason);
	};
	getDiscount(discountSeason, discountPrice, discountType);
});

function getDiscount(id, numb, name) {
	for (var i = 0; i < productList.products.length; i++) {
		if (id === productList.products[i].category_id) {
			productList.products[i].price = (productList.products[i].price - numb).toFixed(2);
			console.log(productList.products[i].price);
		}
		var productType = `<div>'${name}'</div>`;
		var productId = id;

	}
	colorDOM(productType, productId);

}



function colorDOM(type, id) {
	//productsContainer.innerHTML = "";
	// 	for (var i =0; i < productsContainer.length; i++){
	// 		if (id == productsContainer[i].id){
	// 			products[i].classList.add("blue");
		 
	// 	  console.log(productsContainer[i]);
	// 	    }
	// 	};
	var currentDiscount;
	var productData = "";
	for (var i =0; i < productList.products.length; i++){
			if (id == productList.products[i].category_id){
				// currentProduct = productList.products[i];
				// productData += `<div class='blue' id='${currentProduct.category_id}'><h1>${currentProduct.name}</h1>`
		  //       productData += currentProduct.price;
		  //     	productData += "</div>";
			};
	}
	productsContainer.innerHTML += productData;

}


