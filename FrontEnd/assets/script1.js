let urlbackend = "http://localhost:5678/api/"; //variable is assigned a string value of a URL endpoint for the API, specifies the base path for the API

function prepareCategory(mode) { //takes in a parameter "mode"
    const myDiv = document.getElementById("mycategory"); //constant variable named "myDiv" which holds a reference to a DOM element with the id "mycategory"

fetch(urlbackend+'categories')
//fetch request to the API endpoint at urlbackend concatenated with "/categories"

//response from the fetch request :
    .then((res) => res.json())
    //first .then() method parses the response as JSON
    .then((out) => {
    //second .then() method receives the parsed JSON as "out"

    // Check if the value of the "mode" parameter is equal to "1"
    if (mode === "1") {

        // Get the element with the id "category" from the DOM
        const mySelect = document.getElementById("category");

        // Loop through each item in the "out" array
        for (let i = 0; i < out.length; i++) {

        // Create a new "option" element
        const myOption = document.createElement("option");

        // Set the value attribute of the "option" element to the "id" of the current item in the "out" array
        myOption.value = out[i].id;

         // Set the inner HTML of the "option" element to the "name" of the current item in the "out" array
        myOption.innerHTML = out[i].name;

        // Append the "option" element to the "select" element
        mySelect.appendChild(myOption);
        }
            } else{ //// If mode is not equal to 1, the code inside this else block will be executed
                        
                // Set the following attributes for the input element:
                let myinput = document.createElement("input");
                            
                            myinput.setAttribute('id','category-1'); // 1. id attribute with the value 'category-1'

                            myinput.setAttribute('type','submit'); // 2. type attribute with the value 'submit'

                            myinput.setAttribute('value','Tous'); // 3. value attribute with the value 'Tous'

                            myinput.setAttribute('onclick',"getworklist('-1','mygallery');"); // 4. onclick attribute with the value "getworklist('-1','mygallery');"

                            mydiv.appendChild(myinput);

        // Create a new input element for each category
        for(let i=0;i < out.length;i++){

                let myinput = document.createElement("input");

                // sets the ID attribute of the 'myinput' element to a string that includes the current iteration's category id
                // in the format of 'category[category id]' e.g. 'category5'
                            myinput.setAttribute('id','category'+out[i].id);

                            myinput.setAttribute('type','submit');

                            myinput.setAttribute('class','non_actif');

                            myinput.setAttribute('value',out[i].name);

                            myinput.setAttribute('onclick',"getworklist('"+out[i].id+"','mygallery');");

                            mydiv.appendChild(myinput); // the input element is appended to the myDiv element with 

                        }   
                    }     
                }
                )
// catch/throw error
.catch(err => { throw err });
};

// getWorkList ¯\_( ͡❛ ͜ʖ ͡❛)_/¯
function getworklist(idcategorie,divcible,forme){ //three parameters: idcategorie, divcible, and forme.
    const inputs = document.querySelectorAll("#mycategory input"); //search for all answers it can find in document for ("")
        for (const input of inputs) {
          input.className = "non_actif"; //For each input, the className property is set to "non_actif"
                                         //This effectively removes any existing class from the input elements and sets it to "non_actif".
    };

    const category = document.querySelector("#category" + idcategorie);
category.removeAttribute("class");

let devconstructor = "";
idcategorie = Number(idcategorie);

// fetch data from the API endpoint
fetch(urlbackend + "works")
  .then((res) => res.json())
  .then((out) => {
    // loop through the fetched data
    for (let i = 0; i < out.length; i++) {
      // check if idcategorie is -1
      if (idcategorie === -1) {
        // create a class name for the figure element
        let classFigure = "";
        if (forme === "withouttitle") {
          classFigure = "projet";
        }
        // add HTML content to devconstructor
        devconstructor +=
          '<figure class="' +
          classFigure +
          '">' +
          '<img crossorigin="anonymous" src="' +
          out[i].imageUrl +
          '" alt="' +
          out[i].title +
          '">';
        // check if forme is "withouttitle"
        if (forme !== "withouttitle") {
          // add title to devconstructor
          devconstructor += '<figcaption>' + out[i].title + '</figcaption>';
        } else {
          // add edit/delete icons to devconstructor
          devconstructor +=
            '<figcaption class="editer">éditer</figcaption>' +
            '<div class="delete" onclick="dropwork(\'' +
            out[i].id +
            '\');">' +
            '<i class="fa fa-trash" aria-hidden="true"></i>' +
            '</div>' +
            '<div class="drag-btn" id="drag-btn" onmousedown="drag();">' +
            '<i class="fa-solid fa-up-down-left-right"></i>' +
            '</div>';
        }
        devconstructor += "</figure>";
      } else {
        // check if the current item's categoryId matches idcategorie
        if (out[i].categoryId === idcategorie) {
          // add the figure element with title to devconstructor
          devconstructor +=
            '<figure class="projet">' +
            '<img crossorigin="anonymous"  src="' +
            out[i].imageUrl +
            '" alt="' +
            out[i].title +
            '">';
          if (forme !== "withouttitle") {
            devconstructor += '<figcaption>' + out[i].title + '</figcaption>';
          }
          devconstructor += "</figure>";
        }
      }
    }
    // set the inner HTML of the element with the divcible id to devconstructor
    document.getElementById(divcible).innerHTML = devconstructor;
  })
  .catch((err) => {
    // throw error if fetch fails
    throw err;
  });
};


//submit form ¯\_( ͡❛ ͜ʖ ͡❛)_/¯
function submitForm() {
    // get the form elements
    let image = document.getElementById('photo').files[0];
    let title = document.getElementById('title').value;
    let categoryId = document.getElementById('category').value;
    let userId = sessionStorage.getItem('userId');
    let token = sessionStorage.getItem('token');
  
    // create a FormData object to store the form elements
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('category', categoryId);
  
    // create an XMLHttpRequest object
    var oReq = new XMLHttpRequest();
  
    // send a POST request to the backend to create the project
    oReq.open('POST', urlbackend + 'works', true);
    oReq.setRequestHeader('Authorization', 'Bearer ' + token);
    oReq.onload = function(oEvent) {
      // check the status of the request
      if (oReq.status == 201) { //status code indicates that a request was successful and a resource was created as a result
        // if the project was created successfully, show an alert and close the uploader
        alert('Projet a été créé avec succès !');
        showuploader('2');
      } else {
        console.log(oReq);
      }
    };
    oReq.send(formData);
  }
  
//MODALE is coming here
// Function to open the "modal" ¯\_( ͡❛ ͜ʖ ͡❛)_/¯
function get_modale() {
    // Select the body element using jQuery
    var $body = $('body');
	
	// Call the getworklist function with parameters "-1" and "mymodgallery" and "withouttitle"
	getworklist("-1","mymodgallery","withouttitle");
	
	// Select the modal element
	var modal = document.getElementById("myModal");
	
	// Set the display style of the modal to "block"
	modal.style.display = "block";
};


//The code defines a JavaScript function "drag()" that sets up the behavior for the element with the ID "mymodgallery". It does the following:

//Makes the element with the ID "mymodgallery" sortable, meaning the child elements can be rearranged by dragging and dropping.
//Enables the sortable behavior for the element.
//Adds custom behavior to the sortable element, with two event handlers:
//"start" handler: stores the starting index of an element being dragged.
//"stop" handler: disables the sortable behavior after 200 milliseconds.
function drag(){ 
    // Declare a variable to store the starting index of an element being dragged
    var dropIndex;
    
    // Get the element with the ID "mymodgallery"
    var mymodgallery = document.getElementById("mymodgallery");

    // Enable sorting for the element by setting styles and event listeners
    mymodgallery.style.userSelect = "none"; // Prevent text selection while dragging
    mymodgallery.style.cursor = "pointer"; // Change the cursor style to indicate draggable elements
    mymodgallery.addEventListener("dragstart", function(event) {
        // Store the starting index of an element being dragged
        dropIndex = Array.from(mymodgallery.children).indexOf(event.target);
    });
    mymodgallery.addEventListener("dragover", function(event) {
        // Prevent the default behavior for the dragover event
        event.preventDefault();
    });
    mymodgallery.addEventListener("drop", function(event) {
        // Prevent the default behavior for the drop event and rearrange the elements
        event.preventDefault();
        var newIndex = Array.from(mymodgallery.children).indexOf(event.target);
        var movedItem = mymodgallery.removeChild(mymodgallery.children[dropIndex]);
        mymodgallery.insertBefore(movedItem, mymodgallery.children[newIndex]);
    });
    
    // Disable sorting after 300 milliseconds by removing styles and event listeners
    //setTimeout(function() {
    //    mymodgallery.style.userSelect = ""; // Revert to default text selection behavior
   //     mymodgallery.style.cursor = ""; // Revert to default cursor style
    //    mymodgallery.removeEventListener("dragstart", function(event) {});
   //     mymodgallery.removeEventListener("dragover", function(event) {});
   //     mymodgallery.removeEventListener("drop", function(event) {});
   // }, 300);
    //};
