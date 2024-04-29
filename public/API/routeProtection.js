// proteccionRutas.js

// Verifica si el token de acceso está presente en el almacenamiento local
function isAccessTokenPresent() {
    return !!localStorage.getItem('accessToken');
}

// Función para redirigir al usuario a la página de inicio de sesión
function redirectToLogin() {
    window.location.href = '/login.html'; // Cambia '/login.html' por la ruta correcta de tu página de inicio de sesión
}

// Verifica si el token de acceso está presente al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    if (!isAccessTokenPresent()) {
        redirectToLogin();
    }
});