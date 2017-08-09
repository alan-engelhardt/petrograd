let section = document.querySelector("section");
let productlist = "http://kea-alt-del.dk/t5/api/productlist";
let categories = "http://kea-alt-del.dk/t5/api/categories";

function loadJSON(link){
	fetch(link).then(e=>e.json()).then(data=>{
		data.forEach(showList);
	})
}

function showList(data){
	let clone = document.querySelector(".product").content.cloneNode(true);
	clone.querySelector(".name").textContent = data.name;
	clone.querySelector(".product-small-img").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + data.image + "-sm.jpg";
	clone.querySelector(".product-small-img").alt = data.name;
	clone.querySelector(".price").textContent = data.price;
	clone.querySelector(".discount").textContent = data.price*data.discount/100;
	clone.querySelector("a").href = "http://kea-alt-del.dk/t5/site/imgs/large/" + data.image + ".jpg";
	section.appendChild(clone);
}

loadJSON(productlist);
