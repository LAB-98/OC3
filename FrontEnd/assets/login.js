document.addEventListener("DOMContentLoaded", function(event) {

	const form = document.getElementById('login-form');
	form.addEventListener('submit', function(event) {
		event.preventDefault();
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const data = { email, password };

		//https://dmitripavlutin.com/javascript-fetch-async-await/
		fetch('http://localhost:5678/api/users/login', {
			method: 'POST',																					// Send data to server, body type of request is specified by Content-type
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)															// Convert a JS object into a string
		})
		.then(function(response) {
			console.log();
			switch(response.status) {
				case 500:
				case 503:
					alert("Problème côté serveur");
				break;
				case 401:
				case 404:
					alert("Erreur dans l’identifiant ou le mot de passe");
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
		.then(function(json) {
			sessionStorage.setItem("userId", json.userId);				// https://developer.mozilla.org/fr/docs/Web/API/Window/sessionStorage
			sessionStorage.setItem("token", json.token);					// Limited = cleared when the page session ends.
			location.href = "index.html";
		})
		.catch((err) => {
			console.log(err);
		});
	});
});

//JSON JS Object Notation 