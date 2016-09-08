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
	discountDOM(productType, productId);

}



function discountDOM(type, id) {
	productsContainer.innerHTML = "";
	var currentDiscount;
	var productDiscount = "";
		for (var i =0; i < productList.products.length; i++){
			if (id == productList.products[i].category_id){
				currentDiscount = productList.products[i];
				productDiscount += `<div class='products-list' id='${currentDiscount.category_id}'><h1>${currentDiscount.name}</h1>`
		        productDiscount += currentDiscount.price;
		      	productDiscount += "</div>";
		      	//productDiscount += type;
		  console.log(currentDiscount);
		    }  
		    productsContainer.innerHTML = productDiscount;
		};
	
}	



// function parseList(list1, list2) {
// 	//Get lists from JSON objects
// 	var currentProduct = [];
// 	var currentSeason;
// 	var counter = 0;
	
// 	for (var i =0; i < list1.products.length; i++){
// 		currentProduct = list1.products[i];
// 		var categoryProductId = currentProduct.category_id;
// 		//console.log(categoryProductId);
// 		for (var j = 0; j < list2.categories.length; j++) {
// 		currentSeason = list2.categories[j];
// 		var currentSeasonId = currentSeason.id;
// 			//console.log(currentSeason)
// 			if (categoryProductId === currentSeasonId) {
// 				categoryProductId = currentSeason.season_discount;
// 				console.log(currentProduct);
// 			}
// 		}
// 		//console.log(currentProduct.id);
// 	}
	
	
// 	//Iterate through lists and add categories to project
// 	console.log(currentProduct);

	
//}