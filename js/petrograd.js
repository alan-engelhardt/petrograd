let main = document.querySelector("main");
let categories_link = "http://kea-alt-del.dk/t5/api/categories";

function loadJSON(link, process, daddy=null){
	fetch(link).then(e=>e.json()).then(data=>process(data, daddy));
}

function loopCategories(data){
	data.forEach(category => {
		let clone = document.querySelector(".category").content.cloneNode(true);
		let link = "http://kea-alt-del.dk/t5/api/productlist?category=" + category;
		let parent = document.createElement('section');
		clone.querySelector("h1").textContent = category;
		main.appendChild(clone);
		main.appendChild(parent);
		loadJSON(link, showList, parent);
	});
}

function showList(data, daddy){
	data.forEach(product => {
		let clone = document.querySelector(".product").content.cloneNode(true);
		clone.querySelector(".name").textContent = product.name;
		clone.querySelector(".product-small-img").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + product.image + "-sm.jpg";
		clone.querySelector(".product-small-img").alt = product.name;
		clone.querySelector(".price").textContent = product.price;
		clone.querySelector(".discount").textContent = product.price*product.discount/100;
		clone.querySelector("a").href = "http://kea-alt-del.dk/t5/site/imgs/large/" + product.image + ".jpg";
		daddy.appendChild(clone);
	});
}

loadJSON(categories_link, loopCategories);
