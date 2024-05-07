function isAccessTokenPresent() {
    return document.cookie.includes('token=');
}

function redirectToLogin() {
    window.location.href = '/login.html'; //ruta  página de inicio de sesión
}

function redirectToIndex() {
    window.location.href = '/inicio.html'; //ruta  página de inicio de sesión
}

window.addEventListener('DOMContentLoaded', () => {
    if (!isAccessTokenPresent()) {
        redirectToLogin();
    } 
});



