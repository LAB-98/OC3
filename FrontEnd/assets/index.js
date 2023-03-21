fetch("http://localhost:5678/api/works")
.then(function(response) {
    switch(response.status) {
        case 500:
        case 503:
            alert("Problème côté serveur");
        break;
        case 200:
            console.log("Authentification réussie");
            return response.json();
        break;
        default:
            alert("Problème inconnu");
        break;
    }
})
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
        myFigure.setAttribute('id', `work-item-${work.id}`);
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

        if(category.id === 0) {
            myButton.setAttribute('class', 'filterBtn active');
        }
        else {
            myButton.setAttribute('class', 'filterBtn');
        }
        myButton.setAttribute('data-filter', `category-${category.id}`);
        myButton.textContent = category.name;
        document.querySelector("#filterContainer").appendChild(myButton);

        // Detecting click on filters
        myButton.addEventListener('click', function(event) {
            // Remove active class from all buttons
            document.querySelectorAll('.filterBtn').forEach(filterButton => {
                filterButton.classList.remove('active');
            });
            // Add active class to clicked button
            myButton.classList.add('active');

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
		// Opening popup
		let modal = document.getElementById("myModal");
		modal.style.display = "block";

		// Getting existing categories
		fetch("http://localhost:5678/api/categories")
		.then(function(response) {
			console.log();
			switch(response.status) {
				case 500:
					alert("Problème côté serveur");
				break;
				case 200:
					console.log("Authentification réussie");
					return response.json();
				break;
				default:
					alert("Problème inconnu");
				break;
			}})
		.then(data => {
			console.log(data);
			document.getElementById('modal-add-work-category').innerHTML = '';
			data.forEach(category => {
				const myOption = document.createElement('option');
				myOption.textContent = category.name;
				myOption.setAttribute('value', category.id);
				document.getElementById('modal-add-work-category').appendChild(myOption);
			});
		})
		.catch(error => console.error(error));

		// Getting existing works
		fetch("http://localhost:5678/api/works")
		.then(function(response) {
			switch(response.status) {
				case 500:
					alert("Problème côté serveur");
				break;
				case 200:
					return response.json();
				break;
				default:
					alert("Problème inconnu");
				break;
			}
		})
		.then(data => {

			// Select the list of existing images
			const imageList = document.getElementById("image-list");

			// Clear the list of existing images
			imageList.innerHTML = "";

			// For each image in the retrieved data
			data.forEach(item => {
				// Create a new <img> element with the image URL
				const newImage = document.createElement("img");
				newImage.setAttribute('src', item.imageUrl);
				newImage.setAttribute('crossorigin', 'anonymous');

				// Create a "move" button for the image
				const moveButton = document.createElement("button");
				moveButton.textContent = "";
				moveButton.setAttribute('class', 'move-icon fa fa-arrows');
				moveButton.addEventListener('click', (event) => {
					// Get element clicked
					const clickedElement = event.target.parentNode;
					// Do something with the clicked element, like move it to another position
					// or launch an animation to indicate that it is selected
					alert("Fonctionnalité non implémentée");
				});

				// Create a "delete" button for the image
				const deleteButton = document.createElement("button");
				deleteButton.textContent = "";
				deleteButton.setAttribute('class', 'delete-icon fa fa-trash');
				deleteButton.setAttribute('data-id', item.id);
				deleteButton.addEventListener('click', function(event) {
					// @todo2
					let result = confirm("Want to delete?");
					if(result) {
						// Delete the item
						// make a DELETE request to the API endpoint with the Authorization header
						fetch('http://localhost:5678/api/works/' + item.id, {
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': 'Bearer ' + sessionStorage.getItem('token')
							}
						})
						.then(function(response) {
							switch(response.status) {
								case 500:
									alert("Problème côté serveur");
								break;
								case 401:
									alert("Opération non permise");
								break;
								case 200:
								case 204:
									// if the API call is successful, remove the work element from the DOM
									document.getElementById(`work-item-thumbnail-${item.id}`).remove();
									document.getElementById(`work-item-${item.id}`).remove();
								break;
								default:
									alert("Problème inconnu");
								break;
							}
						})
						.catch(error => console.error(error));
					}
				});

				// Create an "edit" button for the image
				const editButton = document.createElement("button");
				editButton.textContent = "éditer";
				editButton.setAttribute('class', 'edit-icon');
				editButton.addEventListener('click', function(event) {
					alert("Fonctionnalité non implémentée");
				});

				// Create div actions
				const divActions = document.createElement("div");
				divActions.setAttribute('class', 'work-item-thumbnail-actions');

				// Add the created elements to the image list
				const imageItem = document.createElement("li");
				imageItem.setAttribute('class', 'work-item-thumbnail');
				imageItem.setAttribute('id', `work-item-thumbnail-${item.id}`);

				imageList.appendChild(imageItem);
				imageItem.appendChild(newImage);
				imageItem.appendChild(editButton);
				imageItem.appendChild(divActions);
				divActions.appendChild(deleteButton);
				divActions.appendChild(moveButton);

			});
		})
		.catch(error => console.error(error));
	});

	// Handling modal closing by modal click
	document.querySelector('.modal').addEventListener('click', function(event) {
		if(event.target.closest(".modal-content") === null) {
			let modal = document.getElementById("myModal");
			modal.style.display = "none";
			document.getElementById('modal-back').click();
		}
	});

	// Handling modal closing by button click
	document.querySelectorAll('.modal-close').forEach(closeBtn => {
		closeBtn.addEventListener('click', function(event) {
			let modal = document.getElementById("myModal");
			modal.style.display = "none";
			document.getElementById('modal-back').click();
		});
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

		document.getElementById('modal-add-work-title').value = ''
		document.getElementById('modal-add-work-category').selectedIndex = 0;
		document.getElementById('output').remove()
		document.querySelector('.uploader-ctn').style.display = 'flex';
	});

	// Detecting photo click on move
	document.querySelector('#modal-delete-gallery').addEventListener("click", function(event) {
		alert("Fonctionnalité non implémentée");
	});

	// Uploading photo
	document.querySelector('#modal-add-work-photo').addEventListener("change", function(event) {
		let myDiv = document.getElementsByClassName('uploader')[0];
		let image = document.createElement("img");
		image.setAttribute('id','output');
		image.setAttribute('style','width:35%;height:100%;');
		image.src = URL.createObjectURL(event.target.files[0]);

		document.querySelector('.uploader-ctn').style.display = 'none';
		/*
		let mySpan = document.getElementsByClassName('imageup')[0];
		mySpan.parentNode.removeChild(mySpan);
		mySpan = document.getElementsByClassName('consigne')[0];
		mySpan.parentNode.removeChild(mySpan);
		let myLabel = document.getElementsByClassName('inputlabel')[0];
		myLabel.parentNode.removeChild(myLabel);
		*/

		myDiv.appendChild(image);
	});

	// Submitting form
	document.querySelector('#modal-form').addEventListener("submit", function(event) {
		event.preventDefault();

		// Get values from form
		let formData = new FormData();
		formData.append('title', document.getElementById('modal-add-work-title').value);
		formData.append('category', Number(document.getElementById('modal-add-work-category').value));
		formData.append('image', document.getElementById('modal-add-work-photo').files[0]);

		// Make a POST request to the API endpoint
		fetch('http://localhost:5678/api/works', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
			},
			body: formData,
		})
		.then(function(response) {
			switch(response.status) {
				case 500:
					alert("Problème côté serveur");
				break;
				case 400:
					alert("Données incorrectes / incomplètes");
				break;
				case 401:
					alert("Opération non permise");
				break;
				case 201:
					return response.json();
				break;
				default:
					alert("Problème inconnu");
				break;
			}
		})
		.then(data => {

			console.log(data); // {id: 15, title: 'bbb', imageUrl: 'http://localhost:5678/images/blue-700x7001677611393138.jpg', categoryId: '3', userId: 1}

			const myNewFigure = document.createElement('figure');
			myNewFigure.setAttribute('id', `work-item-${data.id}`);
			myNewFigure.setAttribute('class', `work-item category-0 category-${data.categoryId}`);
			document.querySelector('.gallery').appendChild(myNewFigure);

			const myNewImage = document.createElement('img');
			myNewImage.setAttribute('src', data.imageUrl);
			myNewImage.setAttribute('alt', `work-item-${data.title}`);
			myNewImage.setAttribute('crossorigin', `anonymous`);
			myNewFigure.appendChild(myNewImage);

			const myNewFigCaption = document.createElement('figcaption');
			myNewFigCaption.textContent = data.title;
			myNewFigure.appendChild(myNewFigCaption);

			document.querySelector('.modal-close').click();
		})
		.catch(error => console.error(error));
	});
});

function checkNewProjectFields() {
    const imageInput = document.getElementById('modal-add-work-photo');
    const titleInput = document.getElementById('modal-add-work-title');
    const categoryInput = document.getElementById('modal-add-work-category');
    const submitButton = document.querySelector('#modal-form button[type="submit"]');

    if (imageInput.files.length === 0 || titleInput.value.trim() === '' || categoryInput.value.trim() === '') {
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add('disabled');
    } else {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('disabled');
    }
}
// Then add the event listeners to the relevant fields
document.getElementById('modal-add-work-photo').addEventListener('input', checkNewProjectFields);
document.getElementById('modal-add-work-photo').addEventListener('change', checkNewProjectFields);
document.getElementById('modal-add-work-title').addEventListener('input', checkNewProjectFields);
document.getElementById('modal-add-work-title').addEventListener('change', checkNewProjectFields);
document.getElementById('modal-add-work-category').addEventListener('input', checkNewProjectFields);
document.getElementById('modal-add-work-category').addEventListener('change', checkNewProjectFields);

checkNewProjectFields();
// ... Flûte, ça marche pas, je dois placer le reste du code ?