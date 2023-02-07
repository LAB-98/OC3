fetch("http://localhost:5678/api/works")
.then((response) => response.json())
.then((json) => {

	// Handling works
	let works = json;
	let categories = ["Tous"];
	works.forEach((work, index) => {

		console.log('======================');
		console.log(work);
		console.log(work.category.id);
		console.log(work.category.name);

		// Creating HTML for works
		let myFigure = document.createElement('figure');

		// @todo : Ajouter une classe CSS `work-item` à chaque figure créée dans le fetch
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      data.forEach((work, index) => {
        let figure = document.createElement('figure');
        figure.classList.add(`work-item-${index}`);
        // rest of the code to create the figure element goes here
      });
    });
  
    // @todo : Ajouter une classe CSS `work-item-0` à chaque figure créée dans le fetch
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      data.forEach((work, index) => {
        let figure = document.createElement('figure');
        figure.classList.add(`work-item-${0}`);
        // rest of the code to create the figure element goes here
      });
    });

		// @todo : Ajouter une classe CSS "'work-item-'+work.category.id" à chaque figure créée dans le fetch
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      data.forEach(work => {
      let figure = document.createElement('figure');
      figure.classList.add(`work-item-${work.category.id}`);
      // rest of the code to create the figure element goes here
    });
  });


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
		myButton.setAttribute('data-filter', `work-item-${index}`);
		myButton.textContent = category;
		document.querySelector("#filterContainer").appendChild(myButton);
	});

	// Detecting click on filters
  document.querySelectorAll('.filterBtn').forEach(filterButton => {
    filterButton.addEventListener('click', function(event) {
      let filterValue = this.getAttribute('data-filter');

      console.log('clicked');
			console.log(this);
      
      document.querySelectorAll('.work-item').forEach(workItem => {
        if (!workItem.classList.contains(filterValue)) {
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

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});


function get_modale() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  getworklist("-1", "mymodgallery", "withouttitle");
};

function drag() {
  var dropIndex;
  var modgallery = document.getElementById("mymodgallery");
  modgallery.addEventListener("sortstart", function (event) {
      dropIndex = event.detail.item.index;
  });
  modgallery.addEventListener("sortstop", function (event) {
      setTimeout(function () {
          modgallery.setAttribute("draggable", "false");
      }, 200);
  });
  modgallery.setAttribute("draggable", "true");
};

function logout() {
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("token");
  location.href = "index.html";
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

let returnspans = '<span class="return" onclick="showuploader(\'2\');"><i class="fa fa-arrow-left" aria-hidden="true"></i></span>';
let content = mymodal.innerHTML;
mymodal.innerHTML = returnspans + content;
preparecategory('1');
} else {
  myform.innerHTML = `<div class="modgallery" id="mymodgallery"></div>
  <hr />
  <center><input type="button" class="submit" value="Ajouter une photo" onclick="showuploader(\'1\');"></center>
  <center><input type="button" class="button" value="Supprimer la galerie"></center>`;
  getworklist("-1", "mymodgallery", "withouttitle");
  mytitre.innerHTML = 'Galerie';

  if (document.querySelector(".return")) {
    document.querySelector(".return").remove();
  }
}


  function closemodal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    showuploader();
    location.href = "index.html";
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
}
