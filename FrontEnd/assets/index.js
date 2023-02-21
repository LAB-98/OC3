fetch("http://localhost:5678/api/works")
.then((response) => response.json())
.then((json) => {

	// Handling works
	let works = json;
	let categories = [];
	let alreadyAddedCategoriesIds = [];
	categories.push({id: 0, name: 'Tous'});
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
		if(alreadyAddedCategoriesIds.includes(work.category.id) === false) {
			categories.push(work.category);
			alreadyAddedCategoriesIds.push(work.category.id);
		}
	});

	// Creating HTML for categories
	console.log(categories);
	categories.forEach((category, index) => {
		console.log(category);
		let myButton = document.createElement('button');
		myButton.setAttribute('class', 'filterBtn');
		myButton.setAttribute('data-filter', `category-${category.id}`);
		myButton.textContent = category.name;
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

document.addEventListener("DOMContentLoaded", function(event) {

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
		// Getting existing works

		// @todo0
		// On refait le même fetch qu'en haut
		// On vide la liste des précédentes images de la popin
		// On créer les <img> et les boutons : éditer, delete, move
  fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    // Select the list of existing images
    const imageList = document.getElementById("image-list");

    // Clear the list of existing images
    imageList.innerHTML = "";

    // For each image in the retrieved data
    data.forEach(image => {
      // Create a new <img> element with the image URL
      const newImage = document.createElement("img");
      newImage.src = image.url;

      // Create an "edit" button for the image
      const editButton = document.createElement("button");
      editButton.textContent = "edit";

      // Create a "delete" button for the image
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "delete";

      // Create a "move" button for the image
      const moveButton = document.createElement("button");
      moveButton.textContent = "move";

      // Add the created elements to the image list
      const imageItem = document.createElement("li");
      imageItem.appendChild(newImage);
      imageItem.appendChild(editButton);
      imageItem.appendChild(deleteButton);
      imageItem.appendChild(moveButton);
      imageList.appendChild(imageItem);
    });
  })
  .catch(error => console.error(error));

	});

	// Handling modal closing by modal click
	document.querySelector('.modal').addEventListener('click', function(event) {
		if(event.target.closest(".modal-content") === null) {
			var modal = document.getElementById("myModal");
			modal.style.display = "none";
		}
	});

	// Handling modal closing by button click
	document.getElementById('modal-close').addEventListener('click', function(event) {
		var modal = document.getElementById("myModal");
		modal.style.display = "none";
	});

	// Detecting click "back" switching modal contents
	document.getElementById('modal-back').addEventListener("click", function() {
		document.querySelector(".modal-content-list").style.display = "block";
		document.querySelector(".modal-content-add").style.display = "none";
	});

	// Detecting click "Add photo" switching modal contents
	document.getElementById("modal-add-photo").addEventListener("click", function(event) {
		document.querySelector(".modal-content-list").style.display = "none";
		document.querySelector(".modal-content-add").style.display = "block";
	});

	// Detecting photo click on move
	document.querySelector('#modal-delete-gallery').addEventListener("click", function(event) {
		alert("Fonctionnalité non implémentée");
	});

	// Detecting photo click on move
	document.querySelectorAll('.move-icon').forEach(item => {
		item.addEventListener("click", function(event) {
			// @todo1
      // Select all move-icons
  const moveIcons = document.querySelectorAll('.move-icon');

  // Watch all move-icons and add click event to each
    moveIcons.forEach((icon) => {
      icon.addEventListener('click', (event) => {
    // Get element clicked
    const clickedElement = event.target.parentNode;

    // Do something with the clicked element, like move it to another position
    // or launch an animation to indicate that it is selected
      console.log('L\'élément a été déplacé ou sélectionné.');
    });
  });
			alert("Fonctionnalité non implémentée");
		});
	});

	// Detecting photo click on delete
	document.querySelectorAll('.delete-icon').forEach(item => {
		item.addEventListener('click', function(event) {
			// @todo2
      var result = confirm("Want to delete?");
      if (result) {
          //Logic to delete the item
      }
			console.log('Supprimer');
		});
	});

	// Uploading photo
	document.querySelector('.modal #photo').addEventListener("change", function(event) {
		var myDiv = document.getElementsByClassName('uploader')[0];
		let image = document.createElement("img");
		image.setAttribute('id','output');
		image.setAttribute('style','width:35%;height:100%;');
		image.src = URL.createObjectURL(event.target.files[0]);
		let mySpan = document.getElementsByClassName('imageup')[0];
		mySpan.parentNode.removeChild(mySpan);
		mySpan = document.getElementsByClassName('consigne')[0];
		mySpan.parentNode.removeChild(mySpan);
		let myLabel = document.getElementsByClassName('inputlabel')[0];
		myLabel.parentNode.removeChild(myLabel);
		myDiv.appendChild(image);
	});

	// Submitting form
	document.querySelector('#modal-form').addEventListener("submit", function(event) {
		event.preventDefault();
		// @todo3
    // Get values from form
  const form = document.getElementById('modal-form');
  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');

  // Add submit on form
  form.addEventListener('submit', function(event) {
  // Prevent form to send request
    event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const email = emailInput.value;

  // API Fetch
  fetch("http://localhost:5678/api/works", {
    method: 'POST',
    body: JSON.stringify({ name: name, email: email }),
    headers: {
      'Content-Type': 'application/json'
      }
    })
    .then(response => {
    // Server response
    console.log('Formulaire envoyé avec succès !');
    })
    .catch(error => {
    // Request errors
    console.error('Erreur lors de l\'envoi du formulaire : ', error);
    });
  });

		console.log('@todo : récupérer les champs du form et faire un fetch post qq chose');
	  });
  });

  // @todo 4
  // Select the close button of the pop-up
const closeButton = document.querySelector('.close-button');

// Add an event listener for the click on the close button
closeButton.addEventListener('click', function() {
  // Select the pop-up
  const popup = document.querySelector('.popup');

  // Hide the pop-up by modifying its CSS class
  popup.classList.add('hidden');
});


// 3.3
  // select the work element that will be removed
const workElement = document.getElementById('work-1');

// make a DELETE request to the API endpoint
fetch('http://localhost:5678/api/works', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: '1' // pass the ID of the work to be deleted
  })
})
.then(response => {
  if (response.ok) {
    // if the API call is successful, remove the work element from the DOM
    workElement.remove();
  } else {
    throw new Error('Erreur lors de la suppression');
  }
})
.catch(error => console.error(error));





//const workId = "123"; // ID du work à supprimer
//const authToken = "your-auth-token";

//fetch("http://localhost:5678/api/works", {
//  method: 'DELETE',
//  headers: {
//    'Authorization': `Bearer ${authToken}`,
//    'Content-Type': 'application/json'
//  }
//})
//.then(response => {
//  if (!response.ok) {
//    throw new Error(`Error in work deletion ${workId}`);
//  }
//  console.log(`Le work ${workId} a été supprimé avec succès`);
// Delete existing HTML content corresponding to the work
//  const workElement = document.getElementById(`work-${workId}`);
//  workElement.parentNode.removeChild(workElement);
//})
//.catch(error => console.error(error));

// 3.4
// create a new work object
const newWork = {
  title: 'New Work',
  description: 'This is a new work'
};

// make a POST request to the API endpoint
fetch('http://localhost:5678/api/works', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newWork)
})
.then(response => {
  if (response.ok) {
    // if the API call is successful, parse the response as JSON
    return response.json();
  } else {
    throw new Error('Error adding work');
  }
})
.then(data => {
  // create a new work element based on the response data
  const newWorkElement = document.createElement('div');
  newWorkElement.classList.add('work');
  newWorkElement.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.description}</p>
  `;
  
  // add the new work element to the DOM
  const workList = document.getElementById('work-list');
  workList.appendChild(newWorkElement);
})
.catch(error => console.error(error));
