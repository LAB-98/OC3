$(document).ready(function() {  //https://learn.jquery.com/using-jquery-core/document-ready/
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const endpoint = 'http://localhost:5678/api/users/login';
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const data = { email, password };

        const response = await fetch(endpoint, { //https://dmitripavlutin.com/javascript-fetch-async-await/
        method: 'POST', //send data to server, body type of request is specified by Content-type
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data) //convert a JS object into a string
        });

        const json = await response.json();

        if (json.error) {
            alert("Erreur dans l’identifiant ou le mot de passe");
        } else {
            sessionStorage.setItem("userId", json.userId); //https://developer.mozilla.org/fr/docs/Web/API/Window/sessionStorage
            sessionStorage.setItem("token", json.token);    //limited = cleared when the page session ends.
            location.href="index.html";
        }
    });
});

//JSON JS Object Notation 