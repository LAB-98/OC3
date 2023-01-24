$(document).ready(function() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const endpoint = 'http://localhost:5678/api/users/login';
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const data = { email, password };

        const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        });

        const json = await response.json();

        if (json.error) {
            alert("Erreur dans l’identifiant ou le mot de passe");
        } else {
            sessionStorage.setItem("userId", json.userId);
            sessionStorage.setItem("token", json.token);
            location.href="index.html";
        }
    });
});