let main = document.querySelector("main");
let categories_link = "http://kea-alt-del.dk/t5/api/categories";
let product_link = "http://kea-alt-del.dk/t5/api/product?id=";

function loadJSON(link, process, container=null){
	fetch(link).then(e=>e.json()).then(data=>process(data, container));
}

function loopCategories(data){
	data.forEach(category => {
		let clone = document.querySelector(".category").content.cloneNode(true);
		let link = "http://kea-alt-del.dk/t5/api/productlist?category=" + category;
		let productContainer = document.createElement('section');
		productContainer.classList.add("productContainer");
		clone.querySelector("h1").textContent = category;
		main.appendChild(clone);
		main.appendChild(productContainer);
		loadJSON(link, showList, productContainer);
	});
}

function showList(data, container){
	data.forEach(product => {
		let clone = document.querySelector(".product").content.cloneNode(true);
		let name = clone.querySelector(".name");
		let image = clone.querySelector(".product-small-img");
		let price = clone.querySelector(".price");
		let discount = clone.querySelector(".discount");
		let link = clone.querySelector("a");
		let button = clone.querySelector("button");
		button.addEventListener("click", function(){
			console.log(product.id);
			loadJSON(product_link + product.id, showDetails);
		})
		name.textContent = product.name;
		image.src = "http://kea-alt-del.dk/t5/site/imgs/small/" + product.image + "-sm.jpg";
		image.alt = product.name;
		price.textContent = "Price: " + product.price + ",-";
		if(product.discount > 0){
			discount.textContent = "Now: " + Math.floor(product.price*product.discount/100) + ",-";
			price.style.textDecoration="line-through";
		}else{
			discount.style.display="none";
		}
		link.href = "http://kea-alt-del.dk/t5/site/imgs/large/" + product.image + ".jpg";
		container.appendChild(clone);
	});
}

function showDetails(data){
	console.log(data);
}

loadJSON(categories_link, loopCategories);
