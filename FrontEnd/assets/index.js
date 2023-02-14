fetch("http://localhost:5678/api/works")
.then((response) => response.json())
.then((json) => {

	// Handling works
	let works = json;
	let categories = ["Tous"];
	works.forEach((work, index) => {

		//console.log('======================');
		//console.log(work);
		//console.log(work.category.id);
		//console.log(work.category.name);

		// Creating HTML for works
		let myFigure = document.createElement('figure');
		myFigure.classList.add(`work-item`);
		myFigure.classList.add(`category-0`);
		myFigure.classList.add(`category-${work.category.id}`);
		let myImage = document.createElement('img');
		myImage.setAttribute('src', work.imageUrl);
		myImage.setAttribute('alt', work.title);
		myImage.setAttribute('crossorigin', 'anonymous');
		let myFigureCaption = document.createElement('figcaption');
		myFigureCaption.textContent = work.title;
		myFigure.appendChild(myImage);
		myFigure.appendChild(myFigureCaption);
		document.querySelector("#portfolio .mesprojets .gallery").appendChild(myFigure);

		// Getting all categories from works
		if(categories.includes(work.category.name) === false) {
			categories.push(work.category.name);
		}
	});

	// Creating HTML for categories
	console.log(categories);
	categories.forEach((category, index) => {
		console.log(category);
		let myButton = document.createElement('button');
		myButton.setAttribute('class', 'filterBtn');
		myButton.setAttribute('data-filter', `category-${index}`);
		myButton.textContent = category;
		document.querySelector("#filterContainer").appendChild(myButton);
	});

	// Detecting click on filters
	document.querySelectorAll('.filterBtn').forEach(filterButton => {
		filterButton.addEventListener('click', function(event) {
			let filterValue = this.getAttribute('data-filter');
			document.querySelectorAll('.work-item').forEach(workItem => {
				if(!workItem.classList.contains(filterValue)) {
					workItem.style.display = 'none';
				} else {
					workItem.style.display = '';
				}
			});
		});
	});
})
.catch(err => {
	console.log(err);
});

document.addEventListener("DOMContentLoaded", function() {
	// Checking is user is connected
	let userId = sessionStorage.getItem("userId");
	let token = sessionStorage.getItem("token");
	if(userId !== null && token !== null) {
		document.querySelector('body').classList.add(`connected`);
	}
	else {
		document.querySelector('body').classList.remove(`connected`);
	}
	// Handling logout
	document.getElementById('nav-logout').addEventListener('click', function(event) {
		console.log('clicked logout')
		sessionStorage.removeItem("userId");
		sessionStorage.removeItem("token");
		location.href = "index.html";
	});
	// Handling modal opening
	document.getElementById('modal-open').addEventListener('click', function(event) {
		var modal = document.getElementById("myModal");
		modal.style.display = "block";
		//getworklist("-1", "mymodgallery", "withouttitle");
	});
	// Handling modal closing
document.getElementById('modal-close').addEventListener('click', function(event) {
	var modal = document.getElementById("myModal");
		modal.style.display = "none";
		//showuploader();
		//location.href = "index.html";
	});
});

  // If user logged in
document.addEventListener("DOMContentLoaded", function() {
  if (userIsLoggedIn()) {
    document.body.classList.add("connected");
  }
});

  // Detect click on delete
const deleteButton = document.querySelector('.delete-icon');
  deleteButton.addEventListener('click', function() {
  console.log('supprimer');
});

  // Detect click Photo

document.getElementById("add-photo-button").addEventListener("click", function() {
  document.querySelector(".modal-content-list").style.display = "none";
  document.querySelector(".modal-content-add").style.display = "block";
});

  // Select Btn photo
var addButton = $('#add-photo-button');

  // Select element to hide and show
var listContent = $('.modal-content-list');
var addContent = $('.modal-content-add');

  // Link function to event click
addButton.click(function() {
  // Hide list & display form
  listContent.hide();
  addContent.show();
});

  // Detect click on move
document.getElementById("move-icon").addEventListener("click", function() {
  alert("Fonctionnalité non implémentée");
});

function userIsLoggedIn() {
  // Check if the user is logged in
  return true;
  }
  










// Modale

document.addEventListener("DOMContentLoaded", function() {
	let userId = sessionStorage.getItem("userId");
	let token = sessionStorage.getItem("token");

	if (userId === null) {
		const elements = document.getElementsByClassName("modifier");
		while (elements.length > 0) {
			elements[0].parentNode.removeChild(elements[0]);
		}
		const elements1 = document.getElementsByClassName("modifier_desc");
		while (elements1.length > 0) {
			elements1[0].parentNode.removeChild(elements1[0]);
		}
	} else {
		document.getElementById("log").innerHTML = "logout";
		document.getElementById("log").href = "javascript:logout();";
	}

	preparecategory();
	getworklist("-1", "mygallery");
	var modal = document.getElementById("myModal");

	window.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
});
  


function get_modale() {
	var modal = document.getElementById("myModal");
	modal.style.display = "block";
	getworklist("-1", "mymodgallery", "withouttitle");
};

function drag() {
  var dropIndex;
  var modgallery = document.getElementById("mymodgallery");

  modgallery.addEventListener("sortstart", function(event) {
    dropIndex = event.detail.item.index;
});

  modgallery.addEventListener("sortstop", function(event) {
    setTimeout(function() {
      modgallery.setAttribute("draggable", "false");
    }, 200);
});

  modgallery.setAttribute("draggable", "true");
}


function showuploader(mode) {
	var myform = document.getElementById("modal-form");
	var mytitre = document.getElementById("modtitre");
	var returnspan = document.getElementsByClassName("return")[0];
	if (mode === '1') {
			var formconstractor = '<div class="uploader">' +
					'<span class="imageup"></span>' +
					'<input type="file" id="photo" name="photo" class="inputfile" onchange="loadFile(event)" accept=".jpg,.png">' +
					'<label for="photo" class="inputlabel"><span>+ Ajouter photo</span></label>' +
					'<span class="consigne">jpg, png : 4mo max</span>' +
					'</div>' +
					'<br>' +
					'<div class="work_info">' +
					'<label class="labelnormal">Titre</label>' +
					'<input type="text" id="title" name="title" class="inputnormal">' +
					'</div>' +
					'<br>' +
					'<div class="work_info">' +
					'<label class="labelnormal">Catégorie</label>' +
					'<select id="category" name="category">' +

					'</select>' +
					'</div>' +
					'<br>' +
					'<hr class/>' +
					'<input class="submit" type="button" value="Valider" id="submit-button" disabled="disabled" onclick="submitForm()">';

let mymodal = document.querySelector(".modal-content");
  myform.innerHTML = formconstractor;
  mytitre.innerHTML = 'Ajout photo';

let returnSpan = document.createElement("span");
  returnSpan.classList.add("return");
  returnSpan.innerHTML = '<i class="fa fa-arrow-left" aria-hidden="true"></i>';
  returnSpan.addEventListener("click", function() {
  showUploader('2');
});

let content = mymodal.innerHTML;
  mymodal.innerHTML = returnspans + content;
  preparecategory('1');
} else {
	myform.innerHTML = `<div class="modgallery" id="mymodgallery"></div>
	<hr />
	<center><input type="button" class="submit" value="Ajouter une photo"></center>
	<center><input type="button" class="button" value="Supprimer la galerie"></center>`;

let submitButton = myform.querySelector(".submit");
  submitButton.addEventListener("click", function() {
  showUploader('1');
});

getWorkList("-1", "mymodgallery", "withouttitle");
mytitre.innerHTML = 'Galerie';


	if (document.querySelector(".return")) {
		document.querySelector(".return").remove();
	}
}



function checkForm() {
	var form = document.getElementById("modal-form");
	var uploadField = document.getElementById("photo");

	// Check if the file size is larger than 4 Mo as mentioned
	if (uploadField.files[0].size > 4000000) {
		alert("File size exceeds 4Mo!");
		uploadField.value = "";
	}

	var monext = uploadField.files[0].name.split('.').pop();
	console.log(monext);

	// Check file extension
	if (monext != 'jpg' & monext != 'png') {
		alert("File must be in .jpg or .png format!");
		uploadField.value = "";
	}

	var filled = true;
		for (var i = 0; i < form.elements.length; i++) {
		  if (form.elements[i].value == "") {
				filled = false;
				break;
			}
		}
		document.getElementById("submit-button").disabled = !filled;
	}

	var loadFile = function(event) {
		var mydiv = document.getElementsByClassName('uploader')[0];
		let image = document.createElement("img");

		image.setAttribute('id','output');
		image.setAttribute('style','width:35%;height:100%;');
		image.src = URL.createObjectURL(event.target.files[0]);

		let myspan = document.getElementsByClassName('imageup')[0];
		myspan.parentNode.removeChild(myspan);
		myspan = document.getElementsByClassName('consigne')[0];
		myspan.parentNode.removeChild(myspan);
		let mylabel = document.getElementsByClassName('inputlabel')[0];
		mylabel.parentNode.removeChild(mylabel);

		mydiv.appendChild(image);
	};

	function dropwork(id) {
		let token = sessionStorage.getItem("token");

		fetch(urlbackend + 'works/' + id, {
				method: 'DELETE',
				headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token,
				}
		})
		.then(response => {
				alert("Projet a été supprimé avec succès !");
				get_modale();
		});
  }
